import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../views/common/account/EditProfile';
import PlayerComparison from '../views/players/PlayerComparison';
import TeamComparison from '../views/players/TeamComparison';

/**
 * October 17th, Anthony Lin's day💕
 *
 *
 *
 */

function HomeStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="PlayerCompare" component={PlayerComparison} />
      <Stack.Screen name="TeamCompare" component={TeamComparison} />
      {/* Rest Code section  */}
    </Stack.Navigator>
  );
}
export default HomeStack;
