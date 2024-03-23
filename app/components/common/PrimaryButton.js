import { Image, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { hp, wp } from '../../utils/responsive';
import { customTheme } from '../../constants';

const PrimaryButton = ({
  title,
  titleStyle = {},
  iconSource,
  iconStyle = {},
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        props.style,
      ]}>
      {iconSource && (
        <Image source={iconSource} style={[styles.icon, iconStyle]} />
      )}
      <Text style={[styles.title, props.titleStyle]}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: hp(2),
    backgroundColor: customTheme.colors.btnBg,
    borderRadius: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_15,
    fontWeight: '700',
  },
  pressed: { opacity: 0.7 },
  icon: { height: wp(8), width: wp(8), marginRight: wp(2) },
});
