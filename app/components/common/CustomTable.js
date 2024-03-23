import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { customTheme } from '../../constants';
import { Text } from 'react-native-ui-lib';
import { hp, wp } from '../../utils/responsive';

export const CustomTable = ({
  title = '',
  data = [],
  headerData = [],
  titleStyle = {},
  tableContainerStyle = {},
  hideTitle = false,
  widthArr = [],
}) => {
  const renderHeader = () => {
    return (
      <View style={[styles.row, styles.header, styles.headerRow]}>
        <Text
          regular-700
          style={[
            styles.headerLeadingCellText,
            { width: widthArr[0] || wp(20) },
          ]}>
          {headerData[0]}
        </Text>
        {headerData.slice(1).map((headerTitle, index) => (
          <Text
            regular-400
            key={'header' + index}
            style={[
              styles.cellHeader,
              { width: widthArr[index + 1] || wp(10) },
            ]}>
            {headerTitle}
          </Text>
        ))}
      </View>
    );
  };

  const renderRowItem = ({ item, index }) => {
    const backgroundColor =
      index % 2 === 0
        ? customTheme.colors.primary
        : customTheme.colors.tertiary;

    const isLastRow = index === data.length - 1;
    return (
      <View
        key={index}
        style={[
          styles.row,
          { backgroundColor: backgroundColor },
          isLastRow && styles.lastRowRadius,
        ]}>
        <Text
          numberOfLines={1}
          small-400
          style={[styles.rowTitle, { width: widthArr[0] || wp(20) }]}>
          {item[0]}
        </Text>
        {item.slice(1).map((column, _index) => (
          <Text
            small-600
            key={'row' + index + _index}
            style={[styles.cell, { width: widthArr[index + 1] || wp(10) }]}>
            {column}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View>
      {!hideTitle && (
        <Text large-xl-600 style={[styles.title, titleStyle]}>
          {title ?? ''}
        </Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tableContainerStyle}>
        <View>
          {renderHeader()}
          {data.map((item, index) => renderRowItem({ item, index }))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  header: {
    backgroundColor: customTheme.colors.tertiary,
  },
  cellHeader: { textAlign: 'center' },
  cell: {
    textAlign: 'center',
    color: customTheme.colors.light,
  },
  rowTitle: { textAlign: 'left', paddingHorizontal: wp(1) },
  headerLeadingCellText: {
    color: customTheme.colors.btnBg,
    paddingHorizontal: wp(1),
    width: wp(20),
  },
  headerRow: {
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
  lastRowRadius: {
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
});
