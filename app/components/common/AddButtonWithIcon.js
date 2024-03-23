import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { wp } from '../../utils/responsive';
import { customTheme } from '../../constants';

const AddButtonWithIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.addIconContainer}>
        <Image
          style={styles.plusIcon}
          source={require('../../assets/plus.png')}
          tintColor={customTheme.colors.btnBg}
        />
      </View>
      <Text style={styles.addText}>Add</Text>
    </TouchableOpacity>
  );
};

export default AddButtonWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(4),
  },
  addIconContainer: {
    borderWidth: 1.5,
    borderColor: customTheme.colors.btnBg,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(5.3),
    height: wp(5.3),
    borderRadius: wp(4),
    marginRight: wp(1.5),
  },
  addText: {
    color: customTheme.colors.btnBg,
    fontSize: customTheme.fontSizes.size_15,
    fontWeight: '600',
  },
  plusIcon: { width: wp(3.5), height: wp(3.5) },
});
