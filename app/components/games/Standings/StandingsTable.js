import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import { customTheme } from '../../../constants';

const headerData = ['#', 'Team', 'W', 'L', 'GB', 'GP', '+/-'];

const tableData = [
  {
    srNo: 1,
    image: null,
    title: 'O’Dea HS',
    data: ['9', '1', '0', '10', '38'],
    dataColor: customTheme.colors.darkYellow,
  },
  {
    srNo: 2,
    image: null,
    title: 'Garfield HS',
    data: ['9', '1', '0', '10', '38'],
  },
  {
    srNo: 3,
    image: null,
    title: 'Eastside Ca.',
    data: ['9', '1', '0', '10', '38'],
  },
  {
    srNo: 4,
    image: null,
    title: 'Nathan Hale',
    data: ['9', '1', '0', '10', '38'],
  },
  {
    srNo: 5,
    image: null,
    title: 'Rainier Beach',
    data: ['9', '1', '0', '10', '38'],
  },
  {
    srNo: 6,
    image: null,
    title: 'Seattle Prep',
    data: ['9', '1', '0', '10', '38'],
  },
  {
    srNo: 7,
    image: null,
    title: 'West Seattle',
    data: ['9', '1', '0', '10', '38'],
  },
];

const TableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      {headerData.map((item, index) => {
        return (
          <Text key={index} style={styles.headerText(index)}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};

const TableBody = () => {
  return (
    <View style={styles.tableBody}>
      {tableData.map((item, index) => {
        return (
          <View key={index} style={styles.tableBodyRow(index)}>
            <Text style={styles.tableBodyCellValue(item.dataColor, 0)}>
              {item.srNo}
            </Text>
            <View style={styles.tableBodyNameCell}>
              <Image
                source={require('../../../assets/Atletico.png')}
                style={styles.tableBodyCellFlag}
              />
              <Text
                numberOfLines={1}
                style={styles.tableBodyCellValue(item.dataColor)}>
                {item.title}
              </Text>
            </View>
            {item.data.map((dataItem, dataindex) => {
              return (
                <Text
                  key={dataindex}
                  style={styles.tableBodyCellValue(
                    item.dataColor,
                    dataindex + 2,
                  )}>
                  {dataItem}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const StandingsTable = () => {
  return (
    <View>
      <TableHeader />
      <TableBody />
    </View>
  );
};

export default StandingsTable;
