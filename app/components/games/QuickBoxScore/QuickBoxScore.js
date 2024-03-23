import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';
import { times } from 'lodash';
import { Text } from 'react-native-ui-lib';

const renderLeftColumnItem = (item, rowIndex, originalArray) => {
  return (
    <View
      key={`leftColumn-${rowIndex}`}
      style={[
        styles.cell,
        styles.leftPanelItem(rowIndex, originalArray.length),
      ]}>
      <Text style={styles.headerItemText}>{item}</Text>
    </View>
  );
};

const renderBodyCustomItem = (
  item,
  rowIndex,
  totalItems,
  columnIndex,
  totalColumns,
) => {
  return (
    <View
      key={`tableCell-${columnIndex}-${rowIndex}`}
      style={[
        styles.cell,
        styles.bodyItem(
          columnIndex,
          totalItems.length,
          rowIndex,
          totalColumns.length,
        ),
      ]}>
      <Text style={styles.headerItemText}>{item}</Text>
    </View>
  );
};

const QuickBoxScore = ({ containerStyle = {}, tableData = [] }) => {
  const leftPanelData = times(tableData?.length - 1).map(
    (_, index) => `#${index}`,
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {tableData.length === 0 && (
        <View style={styles.noBoxScoreData}>
          <Text medium-xl-600>No Box score data found</Text>
        </View>
      )}
      <View style={styles.leftPanelContainer}>
        {leftPanelData.map(renderLeftColumnItem)}
      </View>
      <ScrollView horizontal bounces={false}>
        {tableData.map((item, columnIndex, totalColumns) => {
          return (
            <View key={`row-${columnIndex}`}>
              {item.map((cellItem, rowIndex, totalRows) =>
                renderBodyCustomItem(
                  cellItem,
                  rowIndex,
                  totalRows,
                  columnIndex,
                  totalColumns,
                ),
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default QuickBoxScore;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  cell: {
    width: wp(11),
    height: wp(8.5),
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp(0.3),
  },
  headerItem: (isFirstItem, isLastItem) => ({
    backgroundColor: customTheme.colors.lightGray,
    ...(isFirstItem && { borderTopLeftRadius: wp(2) }),
    ...(isLastItem && { borderTopRightRadius: wp(2) }),
  }),
  headerItemText: {
    color: customTheme.colors.light,
    fontFamily: customTheme.fontFamily.robotoRegular,
  },
  leftPanelItem: (index, totalRow) => ({
    backgroundColor: customTheme.colors.lightGray,
    borderTopLeftRadius: index === 0 ? wp(2) : 0,
    borderBottomLeftRadius: index === totalRow - 1 ? wp(2) : 0,
  }),
  bodyItem: (columnIndex, totalItemsLength, rowIndex, totalColumnsLength) => ({
    backgroundColor:
      rowIndex === 0
        ? customTheme.colors.lightGray
        : customTheme.colors.lightDark,
    borderTopLeftRadius: columnIndex === 0 && rowIndex === 0 ? wp(2) : 0,
    borderTopRightRadius:
      columnIndex === totalColumnsLength - 1 && rowIndex === 0 ? wp(2) : 0,
    borderBottomRightRadius:
      columnIndex === totalColumnsLength - 1 &&
      rowIndex === totalItemsLength - 1
        ? wp(2)
        : 0,
  }),
  leftPanelContainer: { justifyContent: 'flex-end' },
  noBoxScoreData: {
    height: hp(12),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
