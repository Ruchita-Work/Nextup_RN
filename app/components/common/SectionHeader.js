/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { hp } from '../../utils/responsive';
import { customTheme } from '../../constants';
import { FormActionPicker } from './FormInputs';
import { useNavigation } from '@react-navigation/native';

export const SectionHeader = ({
  title,
  filterProps = {
    options: [],
    label: '',
    value: '',
    onValueChange: () => {},
  },
  showFilter = false,
  onPressSeeAll = null,
  containerStyle = {},
  textStyle = {},
  hideSeeAll = false,
}) => {
  const navigation = useNavigation();

  const onPressSeeAllHandler = () => {
    if (onPressSeeAll) {
      onPressSeeAll();
    } else {
      navigation.navigate('MyChallenges');
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
      {showFilter && (
        <View style={{ marginLeft: 'auto' }}>
          <FormActionPicker
            filter={showFilter}
            label={filterProps.label}
            data={filterProps.options}
            value={filterProps.value}
            onValueChange={filterProps.onValueChange}
          />
        </View>
      )}
      {onPressSeeAll && !hideSeeAll && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.parentFlexBox}
          onPress={onPressSeeAllHandler}>
          <Text style={[styles.seeAll, styles.textTypo1]}>See All</Text>
          <Image
            style={[styles.chevronDownIcon, styles.chevronIconLayout]}
            resizeMode="cover"
            source={require('.../../../assets/chevrondown4.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2.5),
    alignItems: 'center',
  },
  title: {
    fontSize: customTheme.fontSizes.size_22,
    color: customTheme.colors.light,
    lineHeight: 22,
    textAlign: 'left',
    fontFamily: customTheme.fontFamily.robotoBold,
    fontWeight: '600',
  },
  seeAll: {
    color: customTheme.colors.royalblue,
    fontSize: customTheme.fontSizes.size_16,
  },
  chevronDownIcon: {
    marginLeft: 2,
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTypo1: {
    fontFamily: customTheme.fontFamily.robotoMedium,
    fontWeight: '500',
    fontSize: 18,
  },
  chevronIconLayout: {
    height: 14,
    width: 14,
    overflow: 'hidden',
  },
});
