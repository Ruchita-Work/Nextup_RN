import React from 'react';
import styles from './styles';
import { Text, View } from 'react-native';

const StatsItem = ({ title, value }) => {
  return (
    <View style={styles.statsItemContainer}>
      <Text style={styles.statsItemTitle}>{title}</Text>
      <Text style={styles.statsItemValue}>{value}</Text>
    </View>
  );
};

export default StatsItem;
