import React from 'react';
import FastImage from 'react-native-fast-image';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, View, Text, Dash } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { customTheme } from '../../../constants';
import { CustomTabView } from '../../../components/common/CustomTabView';
import { useAuth } from '../../../hooks/useAuth';
import Back from '../../../utils/HeaderButtons/Back';
import { appImages } from '../../../constants/appImages';
import { hp, wp } from '../../../utils/responsive';
import { useGetPlayerPublicProfile } from '../../../api/myteam.api';
import CoachViewPlayerDetailsStatsTab from '../../../components/coach/CoachViewPlayerDetailsStatsTab';

const TopTab = createMaterialTopTabNavigator();

const renderTabBar = props => <CustomTabView {...props} />;

const ReadyToPro = () => {
  return (
    <View style={styles.containerView}>
      <Text style={styles.containerTitleText}>Coming Soon</Text>
    </View>
  );
};

const PlayerAccountDetails = () => {
  const { user } = useAuth();
  const { top } = useSafeAreaInsets();
  const { data: playerProfileResponse } = useGetPlayerPublicProfile({
    playerId: user?.id,
    enabled: !!user?.id,
  });

  const profileData = playerProfileResponse?.data;

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.playerDash}>
      <Back
        containerStyle={styles.back(top)}
        backButtonStyle={{ borderColor: 'white' }}
      />
      <FastImage
        source={{
          uri: profileData?.playerProfilePicUrl,
          priority: FastImage.priority.high,
        }}
        defaultSource={appImages.defaultAvatarImage}
        style={{ height: hp(50) }}
      />
      <View row centerV style={styles.playerInfoRow}>
        <View>
          <Text style={styles.rankNumber}>{profileData?.rank}</Text>
          <Text small-x-500>RANK</Text>
        </View>
        <Dash
          vertical
          length={wp(6.5)}
          color={customTheme.colors.light + '30'}
          thickness={1}
          containerStyle={styles.dash}
        />
        <View flex>
          <View row centerV>
            <Text numberOfLines={1} large-3xl-700>
              {profileData?.playerName}
            </Text>
            <Image
              source={require('../../../assets/images/playerIcon.png')}
              style={styles.playerIcon}
            />
          </View>
          <Text regular-400 numberOfLines={1} style={styles.playerPosition}>
            {profileData?.subtitle}
          </Text>
        </View>
      </View>

      <TopTab.Navigator
        tabBar={renderTabBar}
        sceneContainerStyle={styles.tabScreenContainer}>
        <TopTab.Screen
          options={{ tabBarLabel: 'Stats' }}
          name="PlayerAccountStats">
          {() => (
            <CoachViewPlayerDetailsStatsTab
              stats={profileData?.stats}
              scrollContentContainerStyle={{ paddingBottom: hp(3) }}
            />
          )}
        </TopTab.Screen>
        <TopTab.Screen
          options={{ tabBarLabel: 'Road to Pro' }}
          name="PlayerAccountReadyToPro">
          {() => <ReadyToPro />}
        </TopTab.Screen>
        <TopTab.Screen
          options={{ tabBarLabel: 'Highlights' }}
          name="PlayerAccountHighlights">
          {() => <ReadyToPro />}
        </TopTab.Screen>
      </TopTab.Navigator>
    </ScrollView>
  );
};
export default PlayerAccountDetails;

const styles = StyleSheet.create({
  playerDash: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  frameParentSpaceBlock1: {
    paddingHorizontal: customTheme.spacings.spacing_16,
    backgroundColor: customTheme.colors.background,
  },
  playerInfoRow: {
    marginVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  rankNumber: {
    textAlign: 'center',
    color: customTheme.colors.yellow20,
    fontFamily: customTheme.fontFamily.robotoBold,
    fontSize: customTheme.fontSizes.size_36,
    fontWeight: 'bold',
  },
  playerPosition: {
    color: customTheme.colors.light + '80',
    marginTop: hp(0.3),
  },
  dash: {
    marginLeft: wp(3),
    marginRight: wp(4),
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  playerIcon: {
    height: wp(5),
    width: wp(5),
    marginLeft: wp(3),
  },
  back: top => ({
    position: 'absolute',
    top: top + hp(2),
    right: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: wp(5),
  }),
  tabScreenContainer: {
    paddingTop: hp(1),
    paddingHorizontal: wp(4),
    backgroundColor: customTheme.colors.lightDark,
  },
  containerTitleText: {
    color: 'white',
    fontSize: customTheme.fontSizes.size_40,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  containerView: {
    marginVertical: hp(10),
  },
});
