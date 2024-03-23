import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Image, Text } from 'react-native-ui-lib';
import { hp, wp } from '../../../../utils/responsive';
import { customTheme } from '../../../../constants';
import { appImages } from '../../../../constants/appImages';

const ChatChallengeAccepted = ({
  containerStyle = {},
  bannerText = '',
  dateString = '',
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={appImages.fileEnvelope} />
      </View>
      <View style={styles.content}>
        <Text tiny style={styles.dateText}>
          {dateString}
        </Text>
        <Text small-x style={styles.acceptedText}>
          {bannerText}
        </Text>
      </View>
    </View>
  );
};

export default ChatChallengeAccepted;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  imageContainer: {
    height: wp(12),
    width: wp(12),
    backgroundColor: customTheme.colors.btnBg,
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { height: wp(5), width: wp(5) },
  content: { marginLeft: wp(2.5) },
  dateText: {
    color: customTheme.colors.titleLabelColor,
    lineHeight: 10,
  },
  acceptedText: { paddingRight: wp(15), marginTop: hp(0.2) },
});
