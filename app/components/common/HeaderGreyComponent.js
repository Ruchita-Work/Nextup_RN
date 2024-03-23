import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import { Color } from '../../views/GlobalStyles';
import { Text } from 'react-native-ui-lib';

const HeaderGreyComponent = ({
  title = '',
  rightContent = () => {},
  containerStyle = {},
  titleStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text medium-600 style={[styles.title, titleStyle]}>
        {title}
      </Text>
      {rightContent?.()}
    </View>
  );
};

export default HeaderGreyComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.gray_500,
    borderRadius: wp(2),
  },
  title: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
  },
});
