import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ProfileHeader } from './ProfileHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontSize } from '../../GlobalStyles';
import { Colors } from '../../../constants';
import AboutTab from './AboutTab';
import RosterTab from './RosterTab';
import { hp, wp } from '../../../utils/responsive';
import { useGetCoachPublicProfile } from '../../../api/myteam.api';
import { useAuth } from '../../../hooks/useAuth';
import Back from '../../../utils/HeaderButtons/Back';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function CoachProfile() {
  const Tab = createMaterialTopTabNavigator();
  const { user } = useAuth();
  const { data } = useGetCoachPublicProfile({ coachId: user?.id });
  const { top } = useSafeAreaInsets();
  const coachProfileData = data?.data;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.container}>
      <Back
        containerStyle={{
          position: 'absolute',
          top: top + hp(0.5),
          left: wp(4),
          zIndex: 9999,
        }}
      />
      <ProfileHeader
        name={coachProfileData?.name}
        experience={coachProfileData?.experienceInYears}
        position={'Head Coach'}
        record={coachProfileData?.record}
        coachImg={{ uri: coachProfileData?.profilePictureUrl }}
      />
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="About">
          {() => <AboutTab data={coachProfileData} />}
        </Tab.Screen>
        <Tab.Screen name="Roster">{() => <RosterTab />}</Tab.Screen>
      </Tab.Navigator>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: hp(2.2),
  },
});
