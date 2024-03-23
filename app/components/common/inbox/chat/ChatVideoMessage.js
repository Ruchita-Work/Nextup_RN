import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import commonChatStyles from './commonChatStyles';
import moment from 'moment';
import Video from 'react-native-video';
import { hp, wp } from '../../../../utils/responsive';
import { Colors } from '../../../../constants';

const ChatVideoMessage = props => {
  const userId = 1;

  const [paused, setPaused] = useState(true);
  const [timeoutId, setTimeoutId] = useState();

  const isSameUserMessage = props.currentMessage?.user?._id === userId;

  const isNextMessageFromSameUser =
    props.currentMessage?.user?._id === props.nextMessage?.user?._id;

  const isPreviousMessageFromSameUser =
    props.currentMessage?.user?._id === props.previousMessage?.user?._id;

  const [showPausePlayButton, setShowPausePlayButton] = useState(true);

  const videoRef = useRef(null);

  const onPressVideoOverlayHandler = () => {
    setShowPausePlayButton(prevValue => !prevValue);
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
    const _tId = setTimeout(() => {
      setShowPausePlayButton(false);
    }, 3000);
    setTimeoutId(_tId);
  };

  const onPressPlayPauseHandler = () => {
    setPaused(prevValue => !prevValue);
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
    const _tId = setTimeout(() => {
      setShowPausePlayButton(false);
    }, 3000);
    setTimeoutId(_tId);
  };

  // const onPressShowFullScreenHandler = () => {
  //   videoRef?.current?.presentFullscreenPlayer();
  // };
  //// console.log(
  //   '🚀 ~ file: ChatVideoMessage.js:56 ~ onPressShowFullScreenHandler ~ videoRef?.current:',
  //   videoRef?.current,
  // );

  return (
    <View style={commonChatStyles.container(isSameUserMessage)}>
      <Text style={commonChatStyles.dateTimeText}>
        {moment(props.currentMessage?.createdAt).format('hh:mm a')}
      </Text>
      <TouchableOpacity activeOpacity={1} onPress={onPressVideoOverlayHandler}>
        {!!showPausePlayButton && (
          <View style={styles.pausePlayButtonWrapper}>
            <TouchableOpacity
              style={styles.pausePlayButton}
              onPress={onPressPlayPauseHandler}>
              <Image
                source={
                  paused
                    ? require('../../../../utils/react-native-mo-video-player/MoVideoPlayer/images/play.png')
                    : require('../../../../utils/react-native-mo-video-player/MoVideoPlayer/images/pause.png')
                }
                style={styles.playPauseIcon(paused)}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* <View style={styles.fullScreenIconWrapper}>
          <TouchableOpacity
            style={styles.fullScreenButton}
            onPress={onPressShowFullScreenHandler}>
            <Image
              source={require('../../../utils/react-native-mo-video-player/MoVideoPlayer/images/fullScreen.png')}
              style={styles.fullScreenIcon}
            />
          </TouchableOpacity>
        </View> */}
        <Video
          ref={videoRef}
          source={{ uri: props.currentMessage?.video }}
          style={styles.messageVideo(
            isSameUserMessage,
            isNextMessageFromSameUser,
            isPreviousMessageFromSameUser,
          )}
          resizeMode="cover"
          paused={paused}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatVideoMessage;

const styles = StyleSheet.create({
  messageVideo: (
    isSameCurrentUser,
    isNextMessageSame,
    isPreviousMessageFromSameUser,
  ) => ({
    ...commonChatStyles.messageBorderRadius(
      isSameCurrentUser,
      isNextMessageSame,
    ),
    height: hp(14),
    width: wp(60),
    overflow: 'hidden',
    marginTop: isPreviousMessageFromSameUser ? 0 : hp(1),
    marginLeft: isSameCurrentUser ? wp(1.5) : 0,
    marginRight: isSameCurrentUser ? 0 : wp(1.5),
  }),
  pausePlayButton: {
    position: 'absolute',
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.light,
    padding: wp(2),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pausePlayButtonWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenIconWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    marginTop: hp(1),
  },
  fullScreenButton: {
    marginLeft: 'auto',
    marginRight: wp(5),
    marginTop: wp(3),
  },
  fullScreenIcon: { height: wp(5), width: wp(5) },
  playPauseIcon: paused => ({
    height: wp(4),
    width: wp(4),
    left: paused ? 1.5 : 0,
  }),
});
