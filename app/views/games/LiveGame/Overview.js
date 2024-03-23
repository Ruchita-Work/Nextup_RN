import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import Prediction from './Prediction';
import { hp, wp } from '../../../utils/responsive';
import GameStats from './GameStat';
import { LiveGameContext } from '.';
import PlayerStats from './PlayerStats';
import { ScrollView } from 'react-native';

export default function Overview() {
  const { isGameCompleted } = useContext(LiveGameContext);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Prediction />
      <GameStats title={!isGameCompleted ? 'Game Stats' : 'Box Score'} />
      {!isGameCompleted ? (
        <View style={styles.buttonWrapper}>
          <Button label="Start Stat Collection" />
        </View>
      ) : (
        <PlayerStats />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: wp(3) },
  buttonWrapper: {
    paddingVertical: hp(2),
  },
});
