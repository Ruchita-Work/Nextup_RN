import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { hp, wp } from '../../utils/responsive';

const StatsBoxItem = ({
  title,
  subtitle,
  style = {},
  titleStyle = {},
  subtitleStyle = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text large-3xl-400 style={titleStyle}>
        {title}
      </Text>
      <Text
        regular-400
        color={customTheme.colors.light + '60'}
        style={subtitleStyle}>
        {subtitle}
      </Text>
    </View>
  );
};

export default StatsBoxItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: customTheme.colors.primary,
    paddingVertical: hp(1),
    alignItems: 'center',
    gap: hp(0.5),
    borderRadius: wp(2),
  },
});
