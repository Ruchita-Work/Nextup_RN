import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Picker, Text, View } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { appImages } from '../../constants/appImages';
import { wp } from '../../utils/responsive';

const CommonDropdown = ({
  value,
  containerStyle = {},
  items = [],
  onSelectItem = () => {},
}) => {
  return (
    <Picker
      value={value}
      topBarProps={{
        cancelButtonProps: {
          iconStyle: { tintColor: customTheme.colors.light },
        },
        title: 'Select season',
        titleStyle: {
          color: customTheme.colors.light,
          fontFamily: customTheme.fontFamily.robotoMedium,
        },
      }}
      renderPicker={() => (
        <View row centerV style={containerStyle}>
          <Text small-x>{value}</Text>
          <Image source={appImages.dropdown} style={styles.dropdownIcon} />
        </View>
      )}>
      {items.map((item, index) => {
        return (
          <Picker.Item
            onPress={() => onSelectItem(item)}
            value={item}
            label={item}
            key={index}
            selectedIconColor={customTheme.colors.light}
            labelStyle={{ color: customTheme.colors.light }}
          />
        );
      })}
    </Picker>
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  dropdownIcon: {
    height: wp(5),
    width: wp(5),
    marginLeft: wp(1),
  },
});
