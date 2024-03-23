/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EventItemSubtractSVG from '../../assets/images/icons-svgs/EventItemSubtractSVG';
import FastImage from 'react-native-fast-image';
import { customTheme } from '../../constants';
import { wp } from '../../utils/responsive';
import { Text } from 'react-native-ui-lib';
import { appImages } from '../../constants/appImages';

const EventItem = ({
  containerStyle = {},
  title = '',
  onPress = () => {},
  defenderLogo,
  challengerLogo,
}) => {
  return (
    <TouchableOpacity
      style={[styles.eventItem, containerStyle]}
      activeOpacity={0.7}
      onPress={onPress}>
      <EventItemSubtractSVG />
      <Image
        style={styles.vsImage}
        resizeMode="cover"
        source={require('../../assets/mask-group.png')}
      />
      <View style={styles.eventItemTeamsRow}>
        <View style={styles.eventItemTeamContainer}>
          <View style={styles.eventItemTeamInnerContainer}>
            <FastImage
              source={{ uri: defenderLogo }}
              defaultSource={appImages.defaultAvatarImage}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.eventItemTeamContainer}>
          <View style={styles.eventItemTeamInnerContainer}>
            <FastImage
              source={{ uri: challengerLogo }}
              style={styles.image}
              defaultSource={appImages.defaultAvatarImage}
            />
          </View>
        </View>
      </View>
      <Text numberOfLines={1} small-500 style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  eventItem: {
    width: 180,
    height: 110,
    borderRadius: wp(2),
    backgroundColor: customTheme.colors.lightDark,
    overflow: 'hidden',
  },
  eventItemTeamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: '22%',
    position: 'absolute',
    right: 0,
    left: 0,
  },
  eventItemTeamContainer: {
    borderWidth: 2,
    borderColor: customTheme.colors.lightDark,
    borderRadius: wp(10),
    height: 50,
    width: 50,
  },
  eventItemTeamInnerContainer: {
    borderRadius: wp(10),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    position: 'absolute',
    top: '75%',
    alignSelf: 'center',
    paddingHorizontal: wp(2),
    marginTop: 4,
  },
  vsImage: {
    height: '58%',
    width: 31,
    left: 75,
    top: -4,
    position: 'absolute',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: wp(10),
  },
});
