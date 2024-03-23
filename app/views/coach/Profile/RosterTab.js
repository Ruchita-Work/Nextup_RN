import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import HeaderGreyComponent from '../../../components/common/HeaderGreyComponent';
import { Text, View } from 'react-native-ui-lib';
import AvatarItem from '../../../components/common/AvatarItem';
import { useAuth } from '../../../hooks/useAuth';
import { useGetTeamInfo, useGetTeamPlayerPage } from '../../../api/myteam.api';
import { errorToast } from '../../../utils/toast';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';
import { filterValidTeams, transformRoasterData } from '../../../utils/helper';
import TeamItem from '../../../components/common/TeamItem';

const RosterTab = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [selectedTeam, setSelectedTeam] = useState(null);

  const { data: teamInfoResponse } = useGetTeamInfo({ userId: user?.id });

  useEffect(() => {
    if (teamInfoResponse?.data?.teamTabInfoDtoList?.length) {
      const filteredTeams = filterValidTeams(
        teamInfoResponse?.data?.teamTabInfoDtoList,
      );
      setSelectedTeam(filteredTeams[0] || null);
    }
  }, [teamInfoResponse]);

  const season = teamInfoResponse?.data?.seasonLists[0];

  const { data: teamPageData, refetch } = useGetTeamPlayerPage({
    teamId: selectedTeam?.teamId,
    season: season,
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
    enabled: !!(season && selectedTeam?.teamId),
  });

  useRefreshOnFocus(refetch);

  const teamPlayerVarsityData = useMemo(
    () =>
      transformRoasterData(teamPageData?.data?.playerPositionInfoList || []),
    [teamPageData],
  );

  const renderVarsityItem = (item, index) => (
    <AvatarItem
      key={index}
      onPress={() =>
        navigation.navigate('CoachViewPlayerDetails', {
          playerId: item?.playerId,
          invitation: false,
        })
      }
      blurImage={!item?.invitationAccepted}
      title={item?.playerName}
      image={item?.playerProfilePictureUrl}
      containerStyle={styles.varsityAvatar}
      titleStyle={{ marginHorizontal: wp(1) }}
    />
  );

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentView}>
        <Text medium-700>No Data Found</Text>
      </View>
    );
  };

  const positionsList = Object.keys(teamPlayerVarsityData);

  const teams = filterValidTeams(teamInfoResponse?.data?.teamTabInfoDtoList);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ScrollView
        bounces={false}
        horizontal
        scrollEnabled={teams.length > 3}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.teamNamesRow}>
        {teams.map((el, index) => (
          <TeamItem
            key={`TeamsBar-${index}`}
            onPress={() => setSelectedTeam(el)}
            imageSource={{ uri: el.teamLogoUrl }}
            name={el.name}
            isActive={selectedTeam?.teamId === el.teamId}
            containerStyle={{ width: wp(28) }}
            imageContainerStyle={{ height: wp(18), width: wp(18) }}
          />
        ))}
      </ScrollView>
      {positionsList.map((positionItem, positionIndex) => {
        return (
          <React.Fragment key={`positionsList-${positionIndex}`}>
            <HeaderGreyComponent
              title={positionItem}
              containerStyle={styles.headerGrey}
            />
            <View row style={styles.varsityListContainer}>
              {teamPlayerVarsityData?.[positionItem]?.length ? (
                <>
                  {teamPlayerVarsityData?.[positionItem]?.map(
                    renderVarsityItem,
                  )}
                </>
              ) : (
                renderEmptyComponent()
              )}
            </View>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
};

export default RosterTab;

const styles = StyleSheet.create({
  headerGrey: {
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },
  varsityAvatar: {
    width: '20%',
  },
  varsityListContainer: {
    rowGap: hp(2.5),
    flexWrap: 'wrap',
  },
  scrollContent: {
    paddingBottom: hp(4),
    marginHorizontal: wp(4),
  },
  emptyComponentView: {
    width: '100%',
    marginTop: hp(1.5),
    alignItems: 'center',
  },
  teamNamesRow: {
    marginTop: hp(2.5),
    flexDirection: 'row',
    columnGap: wp(4),
  },
});
