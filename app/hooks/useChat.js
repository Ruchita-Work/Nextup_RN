import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from './useAuth';
import { useSendChatMessage } from '../api/chat.api';
import EventSource from 'react-native-sse';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { errorToast } from '../utils/toast';
import compact from 'lodash/compact';
import { isJsonString, uploadImageApi } from '../utils/helper';
import moment from 'moment';
import { CHAT_ENUMS } from '../utils/chatEnums';
import { baseUrl } from '../utils/api-client';
import { useIsFocused } from '@react-navigation/native';
import { useReadMessageOfChannel } from '../api/myteam.api';

export const useChat = ({ screenParams }) => {
  const { mutate: sendChatMessageMutation } = useSendChatMessage();
  const { mutate: readMessageOfChannelMutation } = useReadMessageOfChannel();

  const [messages, setMessages] = useState([]);
  const [isSendingImageMessage, setIsSendingImageMessage] = useState(false);
  const { user } = useAuth();
  const isFocus = useIsFocused();

  const chatInfo = useMemo(() => screenParams?.chatInfo || {}, [screenParams]);
  const isGroup = chatInfo?.type === 'GROUP';
  const chatName = isGroup ? chatInfo?.groupName : chatInfo?.otherUserName;
  const chatProfileImage = isGroup
    ? chatInfo?.groupLogoUrl
    : chatInfo?.userProfilePicUrl;
  const loginUserInfo = {
    _id: user?.id,
    name: chatName,
    avatar: chatProfileImage,
  };

  const commonSendMessageParam = useMemo(
    () => ({
      senderId: user?.id,
      channelId: chatInfo?.channelId,
      status: 'SENT',
      senderName: user?.personalInfo?.firstName || '',
      senderProfilePictureUrl: user?.personalInfo?.profilePictureURL || '',
    }),
    [chatInfo, user],
  );

  const chatEventSource = useMemo(
    () =>
      new EventSource(baseUrl + '/message/stream/' + chatInfo?.channelId, {
        pollingInterval: 3600000,
        debug: true,
        timeout: 30000,
      }),
    [chatInfo],
  );

  const onSend = newMessages => {
    const newChatMessageInfo = {
      ...commonSendMessageParam,
      messageType: CHAT_ENUMS.MESSSAGE_TYPE.TEXT,
      content: newMessages[0]?.text,
      id: uuidv4(),
      createdAt: moment().toISOString(),
    };

    sendChatMessageMutation(newChatMessageInfo);
  };

  const uploadChatImagesHandler = useCallback(
    async response => {
      try {
        if (response?.assets?.length) {
          const promiseArray = [];
          setIsSendingImageMessage(true);
          response?.assets?.map(imageFile => {
            promiseArray.push(uploadImageApi(imageFile));
          });
          const imagesUploadResponses = await Promise.all(promiseArray);
          const imageUrlsArray = compact(
            imagesUploadResponses?.map(
              imageResponse => imageResponse?.data?.data?.imageUrl,
            ),
          );
          const messageInfo = {
            ...commonSendMessageParam,
            messageType: CHAT_ENUMS.MESSSAGE_TYPE.IMAGE,
            content: JSON.stringify(imageUrlsArray),
            id: uuidv4(),
            createdAt: moment().toISOString(),
          };
          sendChatMessageMutation(messageInfo);
          setIsSendingImageMessage(false);
        }
      } catch (error) {
        setIsSendingImageMessage(false);
        errorToast({
          title: 'Error',
          body: 'Filed to send images! Please try again',
        });
      }
    },
    [commonSendMessageParam, sendChatMessageMutation],
  );

  const onNewMessageReceivedHandler = newMessage => {
    if (newMessage.content) {
      const newMessageInfo = {
        _id: newMessage?.id || uuidv4(),
        text: newMessage?.content,
        createdAt: newMessage?.createdAt || new Date(),
        user: { _id: newMessage.senderId || null },
        ...(newMessage?.messageType === CHAT_ENUMS.MESSSAGE_TYPE.IMAGE && {
          image: isJsonString(newMessage?.content)
            ? JSON.parse(newMessage?.content)
            : [],
        }),
        messageType: newMessage?.messageType || CHAT_ENUMS.MESSSAGE_TYPE.TEXT,
      };
      setMessages(prevMessages => [newMessageInfo, ...prevMessages]);
    }
  };

  useEffect(() => {
    if (isFocus) {
      chatEventSource.addEventListener('open', e => {
        console.log('Open SSE connection.', e);
      });
      chatEventSource.addEventListener('message', event => {
        console.log('New message event:', JSON.parse(event.data));
        onNewMessageReceivedHandler(JSON.parse(event.data || {}));
      });
      chatEventSource.addEventListener('error', event => {
        if (event.type === 'error') {
          console.error('Connection error:', event.message);
        } else if (event.type === 'exception') {
          console.error('Error:', event.message, event.error);
        }
      });
      chatEventSource.addEventListener('close', event => {
        console.log('Close SSE connection.', event);
      });
    }

    // Need to be called when screen is focused or blur
    readMessageOfChannelMutation({ channelId: chatInfo?.channelId });

    return () => {
      chatEventSource.close();
      chatEventSource.removeAllEventListeners();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);

  return {
    uploadChatImagesHandler,
    chatInfo,
    isSendingImageMessage,
    chatName,
    chatProfileImage,
    messages,
    onSend,
    loginUserInfo,
  };
};
