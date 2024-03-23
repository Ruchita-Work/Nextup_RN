import {View, Text} from 'react-native';
import React from 'react';
import {MyColors} from '../../../../constants/colors';
import styles from './styles';

const data = [
  {
    title: 'Team',
    quaterData: [
      {value: '1'},
      {value: '2'},
      {value: '3'},
      {value: '4'},
      {value: 'T', color: MyColors.btnBg},
    ],
  },
  {
    title: 'Copper Kings',
    titleColor: MyColors.lightBlue,
    quaterData: [
      {value: '18', color: MyColors.lightBlue},
      {value: '18', color: MyColors.lightBlue},
      {value: '19', color: MyColors.lightBlue},
      {value: '16', color: MyColors.lightBlue},
      {value: '71', color: MyColors.lightBlue},
    ],
  },
  {
    title: 'Falcons',
    quaterData: [
      {value: '14'},
      {value: '21'},
      {value: '14'},
      {value: '18'},
      {value: '67'},
    ],
  },
];

const LastGameScoreTable = () => {
  return (
    <View style={styles.lastGameScoreTable}>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.lastGameScoreTableRow}>
            <Text style={styles.lastGameScoreTableRowTitle(item.titleColor)}>
              {item.title}
            </Text>
            <View style={styles.lastGameScoreTableRowBody}>
              {item.quaterData.map((qItem, qIndex) => (
                <Text
                  key={qIndex}
                  style={styles.lastGameScoreTableRowValue(qItem.color)}>
                  {qItem.value}
                </Text>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LastGameScoreTable;
