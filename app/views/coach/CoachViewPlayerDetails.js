/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React, { useContext, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Dash } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { CustomTabView } from '../../components/common/CustomTabView';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';
import { hp, isIOS, wp } from '../../utils/responsive';
import CoachViewPlayerDetailsStatsTab from '../../components/coach/CoachViewPlayerDetailsStatsTab';
import { appImages } from '../../constants/appImages';
import Back from '../../utils/HeaderButtons/Back';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useGetPlayerPublicProfile,
  useInvitePlayerToTeam,
} from '../../api/myteam.api';
import { MyTeamsContext } from '../../context/MyTeamsProvider';
import SelectPlayerPositionModal from '../../components/coach/SelectPlayerPositionModal';

const TopTab = createMaterialTopTabNavigator();

const ReadyToPro = () => {
  return (
    <View style={styles.containerView}>
      <Text style={styles.containerTitleText}>Coming Soon</Text>
    </View>
  );
};

const CoachViewPlayerDetails = () => {
  const routes = useRoute();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { selectedSeason, selectedTeam } = useContext(MyTeamsContext);

  const playerId = useMemo(() => routes?.params?.playerId, [routes.params]);

  const { mutateAsync: invitePlayerToTeamMutation } = useInvitePlayerToTeam();
  const { data: playerData } = useGetPlayerPublicProfile({
    playerId,
    enabled: !!playerId,
  });
  const profile = playerData?.data || null;

  const [visible, setVisible] = useState(false);

  const renderTabBar = props => <CustomTabView {...props} />;

  const dataPlayer = {
    homePlayer: {
      id: playerId,
      name: profile?.playerName,
      profileImg: { uri: profile?.playerProfilePicUrl },
      teamProfileImg: null,
      rank: profile?.rank,
    },
    secondPlayer: null,
  };

  const onComparePlayerHandler = () => {
    navigation.navigate('PlayerCompare', {
      homePlayer: dataPlayer.homePlayer,
      secondPlayer: dataPlayer.secondPlayer,
      isSingle: false,
    });
  };

  const sendInvitation = async item => {
    setVisible(false);
    const addedTime = Date.now();
    const payload = [
      {
        playerName: profile?.playerName,
        playerId: routes?.params?.playerId,
        playerProfilePictureUrl: profile?.playerProfilePicUrl,
        addedAt: addedTime,
      },
    ];
    const response = await invitePlayerToTeamMutation({
      teamId: selectedTeam?.teamId,
      season: selectedSeason,
      position: item?.id,
      payload,
    });
    if (response?.success) {
      navigation.goBack();
    }
  };

  return (
    <>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}>
        <Back
          containerStyle={styles.back(top)}
          backButtonStyle={{ borderColor: 'white' }}
        />
        <FastImage
          source={{
            uri: profile?.playerProfilePicUrl,
            priority: FastImage.priority.high,
          }}
          defaultSource={appImages.defaultAvatarImage}
          style={{ height: hp(50) }}
        />
        <View row centerV style={styles.playerProfileActionsContainer}>
          {routes?.params?.invitation && (
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Image
                source={appImages.playerRequestIcon}
                style={styles.playerProfileActionButton}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onComparePlayerHandler}>
            <Image
              source={appImages.playerCompareIcon}
              style={styles.playerProfileActionButton}
            />
          </TouchableOpacity>
        </View>
        <View row centerV style={styles.playerInfoRow}>
          <View>
            <Text style={styles.rankNumber}>{profile?.rank}</Text>
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
            {profile?.playerName && (
              <View row centerV>
                <Text numberOfLines={1} large-3xl-700>
                  {profile?.playerName}
                </Text>
                <Image
                  source={require('../../assets/images/playerIcon.png')}
                  style={styles.playerIcon}
                />
              </View>
            )}
            <Text regular-400 numberOfLines={1} style={styles.playerPosition}>
              {profile?.subtitle}
            </Text>
          </View>
        </View>
        <TopTab.Navigator
          tabBar={renderTabBar}
          sceneContainerStyle={styles.tabScreenContainer}>
          <TopTab.Screen
            options={{ tabBarLabel: 'Stats' }}
            name="CoachViewPlayerDetailsStatsTab">
            {() => <CoachViewPlayerDetailsStatsTab stats={profile?.stats} />}
          </TopTab.Screen>
          <TopTab.Screen
            options={{ tabBarLabel: 'Road to Pro' }}
            name="PlayerAccountReadyToPro">
            {() => <ReadyToPro />}
          </TopTab.Screen>
          <TopTab.Screen
            options={{ tabBarLabel: 'Content' }}
            name="PlayerAccountHighlights">
            {() => <ReadyToPro />}
          </TopTab.Screen>
        </TopTab.Navigator>
      </ScrollView>
      <SelectPlayerPositionModal
        visible={visible}
        onPressPositionHandler={sendInvitation}
      />
    </>
  );
};

export default CoachViewPlayerDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  playerInfoRow: { marginVertical: hp(1.5), paddingHorizontal: wp(4) },
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
  tabScreenContainer: {
    paddingTop: hp(2),
    paddingBottom: isIOS ? hp(5) : hp(3),
    paddingHorizontal: wp(4),
    backgroundColor: customTheme.colors.lightDark,
  },
  playerIcon: { height: wp(5), width: wp(5), marginLeft: wp(3) },
  playerProfileActionButton: { height: wp(12), width: wp(12) },
  playerProfileActionsContainer: {
    columnGap: wp(4),
    zIndex: 1,
    top: hp(50.8) - wp(12),
    position: 'absolute',
    right: wp(6),
  },
  back: top => ({
    position: 'absolute',
    top: top + hp(2),
    right: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: wp(5),
  }),
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
