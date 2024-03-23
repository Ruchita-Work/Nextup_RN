import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Checkbox, Text } from 'react-native-ui-lib';
import { wp } from '../../utils/responsive';
import { customTheme } from '../../constants';

const CheckboxItem = ({
  checked = false,
  onPress = () => {},
  title,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Checkbox
        size={wp(5)}
        borderRadius={wp(1.2)}
        color={customTheme.colors.btnBg}
        value={checked}
        onValueChange={onPress}
        iconColor={'white'}
        containerStyle={{ borderColor: customTheme.colors.light }}
      />
      {!!title && <Text medium-500>{title}</Text>}
    </View>
  );
};

export default CheckboxItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(2),
  },
});
