import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { customTheme } from '../../../constants';

const LastGameScoreTable = ({ tableData = [] }) => {
  const data = [
    {
      title: 'Team',
      quaterData: ['Q1', 'Q2', 'Q3', 'F'],
    },
    ...tableData,
  ];

  return (
    <View style={styles.lastGameScoreTable}>
      {data.map((item, index) => {
        const titleColor =
          index === 1 ? customTheme.colors.lightBlue : undefined;

        return (
          <View key={index} style={styles.lastGameScoreTableRow}>
            <Text
              numberOfLines={2}
              style={styles.lastGameScoreTableRowTitle(titleColor)}>
              {item.title || 'N/A'}
            </Text>
            <View style={styles.lastGameScoreTableRowBody}>
              {item.quaterData.map((qItem, qIndex) => {
                const color =
                  index === 0 && qIndex === 4
                    ? customTheme.colors.btnBg
                    : index === 1
                    ? customTheme.colors.lightBlue
                    : undefined;

                return (
                  <Text
                    key={qIndex}
                    style={styles.lastGameScoreTableRowValue(color)}>
                    {qItem}
                  </Text>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LastGameScoreTable;
