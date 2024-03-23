import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { appImages } from '../../../constants/appImages';
import { useAuth } from '../../../hooks/useAuth';
import moment from 'moment';
import { CHAT_ENUMS } from '../../../utils/chatEnums';
import { Text } from 'react-native-ui-lib';

const InboxChatItem = ({ chatInfo }) => {
  const showMediaType =
    chatInfo?.recentMessageType === CHAT_ENUMS.MESSSAGE_TYPE.IMAGE;
  const showUnread = !chatInfo?.read;

  const navigation = useNavigation();

  const onPressChatHandler = () => {
    navigation.navigate('ChatScreen', { chatInfo: chatInfo });
  };
  const { user } = useAuth();
  const userId = user?.id?.toString();

  const isGroup = chatInfo?.type === 'GROUP';

  const chatProfileImage = isGroup
    ? chatInfo?.groupLogoUrl
    : chatInfo?.userProfilePicUrl;

  const chatName = isGroup ? chatInfo?.groupName : chatInfo?.otherUserName;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={onPressChatHandler}>
        <FastImage
          style={styles.profileImage}
          source={{ uri: chatProfileImage, priority: 'high' }}
          defaultSource={appImages.defaultAvatarImage}
        />
        <View style={styles.messagesContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {chatName}
          </Text>
          {showMediaType ? (
            <Text style={[styles.message, { color: customTheme.colors.btnBg }]}>
              {'Image'}
            </Text>
          ) : (
            <Text style={styles.message} numberOfLines={1}>
              {userId === chatInfo?.recentSenderId ? 'You: ' : ''}
              <Text
                style={[
                  styles.message,
                  { color: customTheme.colors.Gray98 + '50' },
                ]}>
                {chatInfo?.recentMessage || ''}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.timeBadgeContainer}>
          <Text style={styles.timeInfoText}>
            {chatInfo?.createdAt
              ? moment(chatInfo?.createdAt).format('dddd')
              : ''}
          </Text>
          {showUnread && (
            <View style={styles.unreadCountBadge}>
              <Text style={styles.unreadCount}>1</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.bottomDivider} />
    </>
  );
};

export default memo(InboxChatItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
  },
  profileImage: {
    height: wp(15),
    width: wp(15),
    borderRadius: wp(8),
    marginRight: wp(4),
  },
  messagesContainer: {
    flex: 1,
    paddingRight: wp(2),
  },
  name: {
    color: customTheme.colors.Gray98,
    lineHeight: 20,
    fontSize: customTheme.fontSizes.size_17,
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
  },
  message: {
    fontSize: customTheme.fontSizes.size_15,
    color: customTheme.colors.Gray98,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: hp(0.5),
    fontFamily: customTheme.fontFamily.robotoRegular,
  },
  timeBadgeContainer: {
    alignItems: 'center',
  },
  timeInfoText: {
    fontSize: customTheme.fontSizes.size_13,
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '500',
    color: customTheme.colors.Gray98 + '50',
    textAlign: 'center',
  },
  unreadCountBadge: {
    backgroundColor: customTheme.colors.btnBg,
    height: wp(6),
    width: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(6),
    marginTop: hp(0.5),
  },
  unreadCount: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  bottomDivider: {
    height: 1,
    backgroundColor: customTheme.colors.Gray98 + '15',
    width: wp(92),
    alignSelf: 'center',
  },
});
