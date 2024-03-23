import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { Colors } from '../../../constants';
import { FontSize } from '../../../views/GlobalStyles';
import tickIcon from '../../../assets/images/tick_selected.png';
export default function PracticeNotification({ isVisible, onClick }) {
  return (
    <View style={[styles.wrapper, { display: isVisible ? 'flex' : 'none' }]}>
      <View style={styles.card}>
        <View style={styles.body}>
          <Image source={tickIcon} style={styles.icon} />
          <Text style={styles.title}>Practice Complete</Text>
          <Text style={styles.content}>
            You've finished practice! What did you work on?
          </Text>
        </View>
        <Button
          label="Offense"
          color={Colors.light}
          onPress={onClick}
          backgroundColor={Colors.pendingInviteTxtColor}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    width: wp(100),
    position: 'absolute',
    zIndex: 900,
    marginTop: hp(20),
    paddingHorizontal: wp(4),
    // height: hp(100),
  },
  card: {
    backgroundColor: Colors.neutral,
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    flexDirection: 'column',
    gap: hp(2),
    paddingBottom: hp(5),
  },
  icon: {
    width: 30,
    height: 30,
  },
  body: {
    marginTop: hp(2),
    gap: hp(1),
    alignItems: 'center',
  },
  title: {
    color: Colors.light,
    fontSize: FontSize.size_3xl,
    fontWeight: '600',
  },
  content: {
    color: Colors.white_08,
  },
});
