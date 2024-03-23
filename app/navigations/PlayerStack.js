import React from 'react';
import { customTheme } from '../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlayerDashboard from '../views/players/DashBoard.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faHomeAlt,
  faUser,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import ScheduleCalendar from '../views/common/calendar/ScheduleCalendar';
import { Text } from 'react-native-ui-lib';
import MyAccountStack from './MyAccountStack';
import MyTeamsStack from '../views/players/MyTeams/MyTeamsStack';
import Inbox from '../views/common/inbox/Inbox';
import { wp } from '../utils/responsive';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Challenges from '../views/players/MyChallenges/Challenges';
import ChallengeVideo from '../views/players/MyChallenges/ChalangeVideo';
import RecorderScreen from '../views/players/MyChallenges/RecorderScreen';
import PlayerQuestions from '../views/players/MyChallenges/PlayerQuestion';
import VideoChallengeSubmit from '../views/players/MyChallenges/VideoChallengeSubmission';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlayerDashBoardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PlayerDashboard" component={PlayerDashboard} />
      <Stack.Screen name="MyChallenges" component={Challenges} />
      <Stack.Screen name="ChallengeVideo" component={ChallengeVideo} />
      <Stack.Screen name="StartRecording" component={RecorderScreen} />
      <Stack.Screen name="playerquestions" component={PlayerQuestions} />
      <Stack.Screen
        name="VideoChallengeSubmit"
        component={VideoChallengeSubmit}
      />
      {/* Rest Code section  */}
    </Stack.Navigator>
  );
};

export function PlayerStack() {
  const tabBarLabel = focused => ({
    color: customTheme.colors.light,
    opacity: focused ? 1 : 0.4,
    fontSize: focused
      ? customTheme.fontSizes.size_8
      : customTheme.fontSizes.size_12,
  });
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: customTheme.colors.background,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="DashBoard"
        component={PlayerDashBoardStack}
        options={{
          tabBarLabel: ({ focused }) => {
            return <Text style={tabBarLabel(focused)}>DashBoard</Text>;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesomeIcon
                icon={faHomeAlt}
                color={customTheme.colors.light}
                style={{ opacity: focused ? 1 : 0.8 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={ScheduleCalendar}
        options={{
          tabBarLabel: ({ focused }) => {
            return <Text style={tabBarLabel(focused)}>Calendar</Text>;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesomeIcon
                icon={faCalendar}
                color={customTheme.colors.light}
                style={{ opacity: focused ? 1 : 0.4 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyTeam"
        component={MyTeamsStack}
        options={{
          tabBarLabel: ({ focused }) => {
            return <Text style={tabBarLabel(focused)}>My Teams</Text>;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesomeIcon
                icon={faUserFriends}
                color={customTheme.colors.light}
                style={{ opacity: focused ? 1 : 0.4 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          // tabBarBadge: 2,
          // tabBarBadgeStyle: { fontSize: 10 },
          tabBarLabel: ({ focused }) => {
            return <Text style={tabBarLabel(focused)}>Inbox</Text>;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require('../assets/chatteardroptext.png')}
                style={{
                  height: wp(5.5),
                  width: wp(5.5),
                  tintColor: customTheme.colors.light,
                  opacity: focused ? 1 : 0.4,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyAccountStack"
        component={MyAccountStack}
        options={{
          tabBarLabel: ({ focused }) => {
            return <Text style={tabBarLabel(focused)}>My Account</Text>;
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesomeIcon
                icon={faUser}
                color={customTheme.colors.light}
                style={{ opacity: focused ? 1 : 0.4 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
