import React, { createContext } from 'react';
import { StyleSheet } from 'react-native';
import Back from '../../../utils/HeaderButtons/Back';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../../utils/responsive';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Overview from './Overview';
import LineUp from './LineUp';
import { Colors } from '../../../constants';
import { FontSize } from '../../GlobalStyles';
import GameHeader from './GameHeader';
import { useRoute } from '@react-navigation/native';
import { useGetGameDetails } from '../../../api/myteam.api';
export const GAME = {
  BEFORE: 0,
  PLAYING: 1,
  FINISHED: 2,
};

export const LiveGameContext = createContext(null);
const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  headerShown: true,
  tabBarIndicatorStyle: {
    backgroundColor: 'white',
    height: 2,
  },
  tabBarActiveTintColor: '#e91e63',
  tabBarStyle: {
    elevation: 0,
    backgroundColor: Colors.base,
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontSize: FontSize.bodyMediumSemibold_size,
    fontWeight: '400',
    color: Colors.light,
  },
};

export default function LiveGame() {
  const { params } = useRoute();
  const gameId = params?.gameId;

  const { data: gameDetailsResponse } = useGetGameDetails(gameId);
  const gameDetails = gameDetailsResponse?.data;

  return (
    <LiveGameContext.Provider
      value={{
        data: gameDetails,
        isGameCompleted: !!gameDetails?.statsCalculated,
      }}>
      <SafeAreaView style={styles.container}>
        <Back
          containerStyle={styles.backButtonContainer}
          title={gameDetails?.statsCalculated ? 'Game Result' : 'Upcoming Game'}
        />
        <GameHeader />
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Overview" component={Overview} />
          <Tab.Screen name="LineUp" component={LineUp} />
        </Tab.Navigator>
      </SafeAreaView>
    </LiveGameContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  backButtonContainer: {
    marginHorizontal: wp(5),
    marginTop: hp(1),
    marginBottom: hp(3),
  },
});
