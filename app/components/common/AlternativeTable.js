import React from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Colors, customTheme } from '../../constants';
import { Text } from 'react-native-ui-lib';
import { hp, wp } from '../../utils/responsive';

export const AlternativeTable = ({
  title,
  headerWidthArray = [],
  data = [],
  containerStyle = {},
  headerData = [],
  titleStyle = {},
  tableContainerStyle = {},
}) => {
  const renderHeader = (noData = false) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rowScrollView}
        bounces={false}>
        <View
          style={[
            styles.row,
            styles.header,
            styles.headerRow,
            noData && styles.lastRowRadius,
          ]}>
          <Text
            regular-700
            style={[
              styles.headerLeadingCellText,
              { width: headerWidthArray[0] },
              headerData[0]?.style,
            ]}>
            {headerData[0]?.value ? headerData[0]?.value : headerData[0]}
          </Text>
          {headerData.slice(1).map((headerTitle, index) => (
            <Text
              regular-400
              key={index}
              style={[
                styles.cellHeader,
                { width: headerWidthArray[index + 1] },
              ]}>
              {headerTitle}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderRowItem = ({ item, index }) => {
    const backgroundColor =
      index % 2 === 0
        ? customTheme.colors.primary
        : customTheme.colors.tertiary;

    const isLastRow = index === data.length - 1;
    return (
      <ScrollView
        horizontal
        key={index}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rowScrollView}
        bounces={false}>
        <View
          style={[
            styles.row,
            styles.rowScrollView,
            { backgroundColor: backgroundColor },
            isLastRow && styles.lastRowRadius,
          ]}>
          <Text
            numberOfLines={1}
            small-400
            style={[styles.rowTitle, { width: headerWidthArray[0] }]}>
            {item[0]}
          </Text>
          {item.slice(1).map((column, _index) => (
            <Text
              small-600
              key={_index}
              style={[styles.cell, { width: headerWidthArray[_index + 1] }]}>
              {column}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[containerStyle]}>
      {title && (
        <Text large-xl-600 style={[styles.title, titleStyle]}>
          {title}
        </Text>
      )}

      <FlatList
        bounces={false}
        data={data}
        ListHeaderComponent={() => renderHeader(data.length === 0)}
        renderItem={renderRowItem}
        keyExtractor={item => item.id}
        contentContainerStyle={tableContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { marginTop: hp(3), marginBottom: hp(1) },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  header: {
    backgroundColor: customTheme.colors.tertiary,
  },
  cellHeader: { textAlign: 'center', color: Colors.white_08 },
  cell: {
    textAlign: 'center',
    color: customTheme.colors.light,
  },
  rowTitle: {
    textAlign: 'left',
    paddingHorizontal: wp(1),
    color: Colors.white_08,
    fontSize: 12,
  },
  blueTitle: {
    color: customTheme.colors.blue20,
    textAlign: 'left',
  },
  headerLeadingCellText: {
    // color: customTheme.colors.btnBg,
    color: Colors.white_08,
    paddingHorizontal: wp(1),
  },
  headerRow: {
    width: '100%',
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
  rowScrollView: { width: '100%' },
  lastRowRadius: {
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
});
