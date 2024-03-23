import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Layout, CommonStyles, Fonts, customTheme} from '../../constants';
import {Image} from 'react-native-ui-lib';
import {wp} from '../../utils/responsive';
import debounce from 'lodash/debounce';

let wide = Layout.width;

export const SearchInput = ({
  filter,
  style = {},
  subIcon = null,
  preIcon = null,
  onChange = () => {},
  placeholder,
}) => {
  const debouncedOnChange = debounce(onChange, 500);
  return (
    <View style={[styles.searchInputContainer, {...style}]}>
      {preIcon}
      <TextInput
        style={[styles.searchInput]}
        autoCorrect={false}
        onChangeText={debouncedOnChange}
        placeholderTextColor={customTheme.colors.shade}
        placeholder={placeholder || 'Search'}
      />
      {subIcon}
    </View>
  );
};

const SearchBar = ({filter, onChange}) => (
  <View style={styles.container}>
    <SearchInput filter onChange={onChange} style={{flex: 1}} />
    <TouchableOpacity
      activeOpacity={1}
      onPress={filter}
      style={[
        CommonStyles.container,
        CommonStyles.center,
        {flex: 0.15, paddingHorizontal: 0, marginLeft: 10},
      ]}>
      <View style={[styles.filter, CommonStyles.center]}>
        {/* <Icon name={'filter'} color={customTheme.colors.light} size={20} /> */}
      </View>
      <Text numberOfLines={1} style={styles.filterlabel}>
        {'Filter'}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: wide * 0.2,
    flexDirection: 'row',
  },
  searchInputContainer: {
    borderWidth: 1,
    borderColor: customTheme.colors.light + '24',
    borderRadius: wp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    width: wp(92),
    aspectRatio: wp(2),
  },
  searchInput: {
    color: customTheme.colors.white,
    fontFamily: Fonts.Regular,
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingRight: wp(4),
    flex: 1,
  },
  filter: {
    height: wide * 0.1,
    width: wide * 0.1,
    backgroundColor: customTheme.colors.base,
    borderRadius: (wide * 0.1) / 2,
  },
  filterlabel: {
    fontSize: 12,
    color: customTheme.colors.darkshade,
    fontFamily: Fonts.Regular,
  },
});

export {SearchBar};
