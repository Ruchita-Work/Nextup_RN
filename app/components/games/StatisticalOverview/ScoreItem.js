import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const ScoreItem = ({ score, subTitle }) => {
  return (
    <View style={styles.scoreItemContainer}>
      <Text style={styles.scoreItemScoreText}>{score}</Text>
      <Text style={styles.scoreItemSubTitle}>{subTitle}</Text>
    </View>
  );
};

export default ScoreItem;
