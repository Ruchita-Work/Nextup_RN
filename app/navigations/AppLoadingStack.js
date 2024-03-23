/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingStack from './OnBoardingStack';
import { useAuth } from '../hooks/useAuth';
import WelcomeScreen from '../views/common/welcome/WelcomeScreen';
import CoachStack from './CoachStack';
import ChatScreen from '../views/common/inbox/ChatScreen';
import AddNewTeam from '../views/team/AddNewTeam';
import SearchPlayers from '../views/players/MyTeams/SearchPlayers';
import InvitePlayers from '../views/players/MyTeams/InvitePlayers';
import AllStandings from '../views/players/MyTeams/AllStandings';
import GameStatistics from '../views/players/MyTeams/GameStatistics';
import AdvanceStats from '../views/players/MyTeams/AdvanceStats';
import AddLineup from '../views/players/MyTeams/AddLineup';
import LineupDetails from '../views/players/MyTeams/LineupDetails';
import { CreatePractice } from '../views/players/MyTeams/CreatePractice';
import { PlayerStack } from './PlayerStack';
import CoachViewPlayerDetails from '../views/coach/CoachViewPlayerDetails';
import GoogleAutoCompleteScreen from '../views/coach/GoogleAutoCompleteScreen';
import PlayerComparison from '../views/players/PlayerComparison';
import TeamComparison from '../views/players/TeamComparison';
import LiveGame from '../views/games/LiveGame';
import MyChallenges from '../views/coach/MyChallenges';
import SeeAllPractices from '../views/common/schedule/SeeAllPractices';
import SeeAllUpcomingGames from '../views/common/schedule/SeeAllUpcomingGames';
import SearchTeams from '../views/players/TeamComparison/SearchTeams';

export default function AppLoadignStack() {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated, onBoardingDone, isCoach, isPlayer, isIdProvider } =
    useAuth();

  return (
    <>
      <Stack.Navigator
        initialRouteName="OnboadingStack"
        screenOptions={{ headerShown: false, cardStyle: { padding: 20 } }}>
        {!isAuthenticated && (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}
        {isAuthenticated && (!onBoardingDone || !isIdProvider) && (
          <Stack.Screen name="OnboadingStack" component={OnBoardingStack} />
        )}
        {isAuthenticated && onBoardingDone && isCoach && isIdProvider && (
          <Stack.Group>
            <Stack.Screen name="CoachStack" component={CoachStack} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="AddNewTeam" component={AddNewTeam} />
            <Stack.Screen name="SearchPlayers" component={SearchPlayers} />
            <Stack.Screen name="InvitePlayers" component={InvitePlayers} />
            <Stack.Screen name="AllStandings" component={AllStandings} />
            <Stack.Screen name="GameStatistics" component={GameStatistics} />
            <Stack.Screen name="AdvanceStats" component={AdvanceStats} />
            <Stack.Screen name="AddLineup" component={AddLineup} />
            <Stack.Screen name="LineupDetails" component={LineupDetails} />
            <Stack.Screen name="CreatePractice" component={CreatePractice} />
            <Stack.Screen name="PlayerCompare" component={PlayerComparison} />
            <Stack.Screen name="TeamCompare" component={TeamComparison} />
            <Stack.Screen
              name="CoachViewPlayerDetails"
              component={CoachViewPlayerDetails}
            />
            <Stack.Screen
              name="GoogleAutoCompleteScreen"
              component={GoogleAutoCompleteScreen}
            />
            <Stack.Screen name="MyChallenges" component={MyChallenges} />
            <Stack.Screen name="SeeAllPractices" component={SeeAllPractices} />
            <Stack.Screen
              name="SeeAllUpcomingGames"
              component={SeeAllUpcomingGames}
            />
          </Stack.Group>
        )}
        {isAuthenticated && onBoardingDone && isPlayer && (
          <Stack.Group>
            <Stack.Screen name="PlayerStack" component={PlayerStack} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="SearchPlayers" component={SearchPlayers} />
            <Stack.Screen name="InvitePlayers" component={InvitePlayers} />
            <Stack.Screen name="AllStandings" component={AllStandings} />
            <Stack.Screen name="GameStatistics" component={GameStatistics} />
            <Stack.Screen name="AdvanceStats" component={AdvanceStats} />
            <Stack.Screen name="AddLineup" component={AddLineup} />
            <Stack.Screen name="LineupDetails" component={LineupDetails} />
            <Stack.Screen name="CreatePractice" component={CreatePractice} />
            <Stack.Screen
              name="CoachViewPlayerDetails"
              component={CoachViewPlayerDetails}
            />
            <Stack.Screen name="SeeAllPractices" component={SeeAllPractices} />
            <Stack.Screen
              name="SeeAllUpcomingGames"
              component={SeeAllUpcomingGames}
            />
          </Stack.Group>
        )}
        <Stack.Screen name="SearchTeams" component={SearchTeams} />
        <Stack.Screen name="LiveGame" component={LiveGame} />
      </Stack.Navigator>
    </>
  );
}
