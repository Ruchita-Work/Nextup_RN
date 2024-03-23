import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const AgendaItem = ({ color, title }) => {
  return (
    <View style={styles.agendaItemContainer}>
      <View style={styles.agedaItemIndicator(color)} />
      <Text style={styles.agendaItemTitle(color)}>{title}</Text>
    </View>
  );
};

export default AgendaItem;
