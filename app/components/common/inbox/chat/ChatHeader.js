import { StyleSheet } from 'react-native';
import React from 'react';
import Back from '../../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../../utils/responsive';
import { Text, View } from 'react-native-ui-lib';
import { customTheme } from '../../../../constants';
import FastImage from 'react-native-fast-image';
import { appImages } from '../../../../constants/appImages';

const ChatHeader = ({ name, image }) => {
  return (
    <View style={styles.root}>
      <View row centerV style={styles.headerBody}>
        <Back />
        <View row centerV style={styles.userInfoContainer}>
          <FastImage
            source={{ uri: image, priority: 'high' }}
            style={styles.profileImage}
            defaultSource={appImages.defaultAvatarImage}
          />
          <View style={styles.usernameInfoContainer}>
            <Text numberOfLines={1} large-x-600>
              {name}
            </Text>
            <Text regular-500 style={styles.onlineText}>
              online
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  root: {
    borderBottomColor: customTheme.colors.titleLineColor,
    borderBottomWidth: 1,
    paddingVertical: hp(3),
  },
  headerBody: { paddingHorizontal: wp(5) },
  userInfoContainer: { marginLeft: wp(4) },
  profileImage: { height: wp(12), width: wp(12), borderRadius: wp(12) },
  usernameInfoContainer: { marginHorizontal: wp(3), flex: 1 },
  onlineText: { marginTop: hp(0.2), color: customTheme.colors.btnBg },
});
