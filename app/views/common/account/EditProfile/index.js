import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native-ui-lib';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountDetail from './AccountDetail';
import { ViewContainer } from '../../../../components/common/ViewConatiner';
import { CustomTabView } from '../../../../components/common/CustomTabView';
import { useAuth } from '../../../../hooks/useAuth';
import PlayerOtherDetails from './PlayerOtherDetails';
import PlayerAcoountEdit from './PlayerAcoountEdit';
import { customTheme } from '../../../../constants';
import { hp } from '../../../../utils/responsive';
import Verification from './Verification';
import AppLoader from '../../../../utils/Apploader';
import useEditProfile from '../../../../hooks/useEditProfile';

export const EditProfile = () => {
  const Tab = createMaterialTopTabNavigator();
  const { isPlayer, isCoach } = useAuth();
  const { loading, editCoachFormik, editPlayerFormik, basicUserInfoResponse,isLoadingBasicUserInfo,isLoadingUpdateProfile } =
    useEditProfile();

  const onPressSubmit = () => {
    if (isPlayer) {
      editPlayerFormik.handleSubmit();
    }
    if (isCoach) {
      editCoachFormik.handleSubmit();
    }
  };
    return (
    <ViewContainer headerTilte={'Edit Profile'}>
      {(isLoadingBasicUserInfo && isPlayer) && <AppLoader visible={isLoadingBasicUserInfo} />}
      <Tab.Navigator tabBar={props => <CustomTabView {...props} />}>
        {isCoach && (
          <Tab.Group>
            <Tab.Screen
              name="AccountDetails"
              options={{ tabBarLabel: 'Account Details' }}>
              {() => <AccountDetail formik={editCoachFormik} />}
            </Tab.Screen>
            <Tab.Screen
              name="Verification"
              options={{ tabBarLabel: 'Verification' }}>
              {() => (
                <Verification
                  formik={editCoachFormik}
                  coachInfo={basicUserInfoResponse?.data?.coachInfo}
                />
              )}
            </Tab.Screen>
          </Tab.Group>
        )}
        {isPlayer && (
          <Tab.Group>
            <Tab.Screen
              name="AccountDetails"
              options={{ tabBarLabel: 'Account Details' }}>
              {() => <PlayerAcoountEdit formik={editPlayerFormik} />}
            </Tab.Screen>
            <Tab.Screen
              name="OtherDetails"
              options={{ tabBarLabel: 'Other Details' }}>
              {() => <PlayerOtherDetails formik={editPlayerFormik} />}
            </Tab.Screen>
          </Tab.Group>
        )}
      </Tab.Navigator>
      <View style={{ marginBottom: hp(1.7) }}>
        <TouchableOpacity
          disabled={isLoadingUpdateProfile}
          onPress={onPressSubmit}
          style={{
            backgroundColor: isLoadingUpdateProfile
              ? customTheme.colors.tertiary
              : customTheme.colors.blue20,
            borderRadius: customTheme.spacings.spacing_24,
            paddingVertical: customTheme.spacings.spacing_20,
          }}>
          <View row center spread>
            {
              isLoadingUpdateProfile &&
              <ActivityIndicator
              animating={isLoadingUpdateProfile}
              color={customTheme.colors.white}
            />
            }
            <Text
              animated
              style={[styles.buttonText, { opacity: isLoadingUpdateProfile ? 0.4 : 1 }]}>
              {isLoadingUpdateProfile ? 'Updating...' : 'Save'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  buttonText: {
    color: customTheme.colors.white,
    fontSize: customTheme.fontSizes.size_16,
    fontWeight: '700',
    fontFamily: customTheme.fontFamily.robotoBold,
    textAlign: 'center',
    alignSelf:'center'
  },
});
