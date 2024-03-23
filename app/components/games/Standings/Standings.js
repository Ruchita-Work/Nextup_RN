import { View } from 'react-native';
import React from 'react';
import StandingsTable from './StandingsTable';
import StandingsHeader from './StandingsHeader';

const Standings = () => {
  return (
    <View>
      <StandingsHeader />
      <StandingsTable />
    </View>
  );
};

export default Standings;
