import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../../constants';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-ui-lib';
import bgImg from '../../../assets/images/coachPublicProfileTop.png';

const wide = Layout.width;

export function ProfileHeader({
  name,
  position,
  experience,
  record,
  coachImg,
}) {
  return (
    <View style={styles.container}>
      <Image source={bgImg} style={styles.bgImg} />
      <View style={styles.box}>
        <FastImage source={coachImg} style={styles.coachImg} />
        <View style={{ marginLeft: wide * 0.05 }}>
          <Text style={styles.nameSection}>{name}</Text>
          <Text style={styles.position}>{position}</Text>
          <View style={styles.subDetail}>
            <Text style={styles.subDetailLabel}>Experience :</Text>
            <Text style={styles.subDetailText}>{experience}</Text>
          </View>
          <View style={styles.subDetail}>
            <Text style={styles.subDetailLabel}>Record :</Text>
            <Text style={styles.subDetailText}>{record}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 50 },
  bgImg: { height: wide * 0.6, width: '100%' },
  subDetail: { flexDirection: 'row', marginTop: 6 },
  subDetailText: {
    color: Colors.light,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: Fonts.Medium,
  },
  subDetailLabel: {
    color: Colors.light,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: Fonts.Regular,
    opacity: 0.7,
  },
  box: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    position: 'absolute',
    top: wide * 0.28,
    backgroundColor: Colors.btnBg,
    alignItems: 'center',
    zIndex: 1,
    overflow: 'hidden',
  },
  coachImg: {
    height: 177,
    width: '45%',
  },
  nameSection: {
    color: Colors.light,
    fontWeight: '700',
    fontSize: 20,
    fontFamily: Fonts.SemiBold,
  },
  position: {
    color: Colors.light,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: Fonts.Medium,
    marginTop: 6,
  },
});
