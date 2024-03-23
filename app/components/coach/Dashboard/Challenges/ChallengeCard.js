/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, ImageBackground, Platform } from 'react-native';
import { Avatar, Image, Text, View } from 'react-native-ui-lib';
import { GroupAvatar } from '../../../common/GroupAvatar_test';
import { Colors } from '../../../../constants';
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../../../views/GlobalStyles';
import _ from 'lodash';

export default function Challenge({
  backgroundImage,
  dueTime = '',
  avatarImgs,
}) {
  return (
    <View style={styles.cardWrapper}>
      <ImageBackground
        source={backgroundImage}
        imageStyle={{ borderRadius: 10 }}
        style={[{ height: 120 }]}>
        <View style={[styles.cardBody]}>
          <View style={[styles.cardContentWrapper]}>
            <Text style={[styles.textWhite, styles.bodyContentHeader]}>
              Dribble Challenge{' '}
              <Image
                source={require('../../../../assets/images/Vector.png')}
                style={{ width: 20, height: 20 }}
              />
            </Text>
            <Text style={[styles.textGold, styles.bodyContentTitle]}>
              {dueTime}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 30,
            }}>
            <GroupAvatar avatarUrls={avatarImgs} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  cardWrapper: {
    paddingVertical: 5,
  },
  cardHeader: {
    backgroundColor: Colors.yellow30,
    height: 50,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  cardBody: {
    paddingHorizontal: Padding.p_8xs,
    backgroundColor: Colors.$backgroundDark,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  cardIcon: {
    position: 'absolute',
    top: -28,
    left: 20,
    backgroundColor: Colors.blue10,
  },
  cardActiveStatus: {
    marginTop: 16,
    alignSelf: 'flex-end',
    backgroundColor: Colors.blue30,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: 8,
  },
  cardCompletedStatus: {
    backgroundColor: Color.limegreen,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: 8,
  },
  cardContentWrapper: {
    marginTop: 16,
  },
  cardFooter: {
    marginTop: 'auto',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWhite: {
    color: Colors.white_08,
  },
  textGold: {
    color: Color.goldenrod_100,
  },
  bodyContentHeader: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 20,
    fontWeight: '700',
  },
  bodyContentTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: Padding.p_8xs,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 for 50% opacity) for the blur effect
  },
  shadowView: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 16,
    // Shadow styles for Android
    ...Platform.select({
      android: {
        elevation: 5,
      },
      // Shadow styles for iOS
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
    }),
  },
});
