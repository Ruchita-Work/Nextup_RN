/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatHeader from '../../../components/common/inbox/chat/ChatHeader';
import ChatChallengeAccepted from '../../../components/common/inbox/chat/ChatChallengeAccepted';
import { hp, wp } from '../../../utils/responsive';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatInput from '../../../components/common/inbox/chat/ChatInput';
import ChatMessage from '../../../components/common/inbox/chat/ChatMessage';
import ChatVideoMessage from '../../../components/common/inbox/chat/ChatVideoMessage';
import ChatImageMessage from '../../../components/common/inbox/chat/ChatImageMessage';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import AppLoader from '../../../utils/Apploader';
import { CHAT_ENUMS } from '../../../utils/chatEnums';
import { useChat } from '../../../hooks/useChat';
import { ViewContainer } from '../../../components/common/ViewConatiner';

const ChatScreen = () => {
  const screenParams = useRoute().params;

  const {
    uploadChatImagesHandler,
    chatInfo,
    isSendingImageMessage,
    chatName,
    chatProfileImage,
    loginUserInfo,
    messages,
    onSend,
  } = useChat({ screenParams });

  const { bottom } = useSafeAreaInsets();

  const extraContainerStyle = {
    paddingBottom: bottom ? bottom + hp(0.8) : 0,
  };

  const renderInputToolbar = useCallback(
    props => <ChatInput {...props} onSelectImage={uploadChatImagesHandler} />,
    [uploadChatImagesHandler],
  );

  const renderBubble = useCallback(props => {
    if (props.currentMessage?.messageType === CHAT_ENUMS.MESSSAGE_TYPE.BANNER) {
      return (
        <ChatChallengeAccepted
          bannerText={chatInfo?.recentMessage}
          containerStyle={styles.chatChallengeContainer}
          dateString={moment(chatInfo?.createdAt).format('LL')}
        />
      );
    }

    if (props.currentMessage?.video) {
      return <ChatVideoMessage {...props} />;
    }
    if (props.currentMessage?.image) {
      return <ChatImageMessage {...props} />;
    }
    return <ChatMessage {...props} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewContainer style={[styles.container, extraContainerStyle]}>
      {isSendingImageMessage && <AppLoader />}
      <ChatHeader name={chatName} image={chatProfileImage} />
      <GiftedChat
        listViewProps={{
          showsVerticalScrollIndicator: false,
          horizontal: false,
          contentContainerStyle: { marginRight: wp(3) },
        }}
        messagesContainerStyle={{ paddingBottom: hp(2) }}
        messages={messages}
        renderBubble={renderBubble}
        showAvatarForEveryMessage={true}
        showUserAvatar={false}
        renderAvatar={() => null}
        renderInputToolbar={renderInputToolbar}
        onSend={_messages => onSend(_messages)}
        alwaysShowSend
        user={loginUserInfo}
        maxComposerHeight={hp(4)}
        bottomOffset={bottom}
        placeholder="Type a message"
      />
    </ViewContainer>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: -hp(8) },
  chatChallengeContainer: { marginVertical: hp(2), width: '100%' },
});
