import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';

export const Challenges = () => {
  return (
    <View style={styles.containerView}>
      <Text style={styles.containerTitleText}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitleText: {
    color: 'white',
    fontSize: customTheme.fontSizes.size_48,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    width: wp(51),
  },
  containerView: { marginVertical: hp(20) },
});
