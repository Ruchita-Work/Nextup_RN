import React from 'react';
import { StyleSheet } from 'react-native';
import { wp } from '../../utils/responsive';
import CommonDropdown from './CommonDropdown';
import { getSeasonString } from '../../utils/helper';

const seasonsItems = [getSeasonString()];

const SeasonSelectDropdown = ({
  selectedSeason,
  onSelectSeason,
  seasons,
  containerStyle = {},
}) => {
  return (
    <CommonDropdown
      value={selectedSeason}
      containerStyle={{ ...styles.selectSeasonContainer, ...containerStyle }}
      items={seasons || seasonsItems}
      onSelectItem={onSelectSeason}
    />
  );
};

export default SeasonSelectDropdown;

const styles = StyleSheet.create({
  selectSeasonContainer: {
    marginRight: wp(4),
  },
});
