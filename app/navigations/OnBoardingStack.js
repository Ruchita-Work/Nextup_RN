import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TellUsMore from '../views/common/on-boarding/TellUsMore';
import PlayerDetails from '../views/common/on-boarding/PlayerDetails';
import PlayerStyle from '../views/common/on-boarding/PlayerStyle';
import PhotoUpload from '../views/common/on-boarding/PhotoUpload';
import OnBoardingProvider from '../context/OnBoardingProviider';
import CoachDetails from '../views/common/on-boarding/CoachDetails';
import DocumentVerification from '../views/common/on-boarding/DocumentVerification';
import { useAuth } from '../hooks/useAuth';

export default function OnBoardingStack() {
  const Stack = createNativeStackNavigator();
  const { onBoardingDone } = useAuth();

  return (
    <OnBoardingProvider>
      <Stack.Navigator
        initialRouteName={
          onBoardingDone ? 'DocumentVerification' : 'TellUsMore'
        }
        screenOptions={{ headerShown: false, cardStyle: { padding: 20 } }}>
        <Stack.Screen name="TellUsMore" component={TellUsMore} />
        <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
        <Stack.Screen name="CoachDetails" component={CoachDetails} />
        <Stack.Screen name="PlayerStyle" component={PlayerStyle} />
        <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
        <Stack.Screen
          name="DocumentVerification"
          component={DocumentVerification}
        />
      </Stack.Navigator>
    </OnBoardingProvider>
  );
}
