import { useNavigation } from '@react-navigation/native';
import React from 'react';
const { View, Text, TouchableOpacity, Image } = require('react-native');
const { default: styles } = require('./styles');

const StandingsHeader = () => {
  const navigation = useNavigation();

  const onPressSeeAllStandingHandler = () => {
    navigation.navigate('AllStandings');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Standings</Text>
      <TouchableOpacity
        onPress={onPressSeeAllStandingHandler}
        activeOpacity={0.5}
        style={styles.headerSeeAllButton}>
        <Text style={styles.headerSeeAllText}>See All</Text>
        <Image
          source={require('../../../assets/chevrondown5.png')}
          style={styles.dropdownImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StandingsHeader;
