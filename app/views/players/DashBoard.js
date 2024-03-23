/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Layout, customTheme } from '../../constants';
import { StyleSheet } from 'react-native';
import DashBoardHeader from '../../components/common/DashBoardHeader';
import { EventCarousel } from '../../components/players/Dashboard/EventsCarousel';
import StatsContainer from '../../components/players/Dashboard/StatsContainer.js';
import { MyChallenges } from '../../components/players/Dashboard/Challenges.js';
import { useAuth } from '../../hooks/useAuth';
import PrimaryButton from '../../components/common/PrimaryButton';
import { usePlayerDashboard } from '../../api/players.api';
import { View } from 'react-native-ui-lib';
import { hp, wp } from '../../utils/responsive';
import { SectionHeader } from '../../components/common/SectionHeader';
import {
  CirclePlaceholder,
  SectionPlaceholder,
} from '../../components/common/placeholder/Placeholder';
import { NoDataView } from '../../components/common/NoDataView';
import _ from 'lodash';
import { useGetTeamInfo } from '../../api/myteam.api';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import TeamItem from '../../components/common/TeamItem';
import { filterValidTeams } from '../../utils/helper';
import EmptyView from '../../components/players/EmptyView';

const PlayerDashboard = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [statsType, setStatsType] = useState('Season');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const playerId = useMemo(() => user?.id, [user?.id]);

  const { data: teamsInfoResponse, isLoading: isLoadingTeams } = useGetTeamInfo(
    { userId: playerId },
  );

  const { data, isLoading, isFetched } = usePlayerDashboard({
    playerId: playerId,
    teamId: selectedTeam?.teamId,
  });

  const upcomingGames = data?.data?.upcomingGames;
  const assignedChallenges = data?.data?.assignedChallenges;
  const typeOfGraphList = data?.data?.typeOfGraphList;

  useEffect(() => {
    if (teamsInfoResponse?.data?.teamTabInfoDtoList) {
      const filteredData = filterValidTeams(
        teamsInfoResponse?.data?.teamTabInfoDtoList,
      );
      if (filteredData?.length) {
        setSelectedTeam(filteredData[0]);
      }
    }
  }, [teamsInfoResponse]);

  const isNodataView =
    isFetched &&
    !assignedChallenges?.length &&
    !upcomingGames?.length &&
    !typeOfGraphList?.length;

  const statsFilterOptions = useMemo(() => {
    return _.map(typeOfGraphList, item => ({
      label: item?.name,
      value: item?.name,
    }));
  }, [typeOfGraphList]);

  const filteredGraphData = useMemo(() => {
    return _.filter(typeOfGraphList, item => {
      return item?.name === statsType;
    })[0];
  }, [typeOfGraphList, statsType]);

  const processGraphData = useMemo(() => {
    const resultArray = [];
    for (const categary in filteredGraphData?.withoutSelection) {
      const coloredValue = filteredGraphData?.withSelection[categary];
      const unColoredValue = filteredGraphData?.withoutSelection[categary];
      resultArray.push({
        name: categary,
        coloredValue,
        unColoredValue,
      });
    }
    return {
      data: resultArray,
      firstGraphName: filteredGraphData?.firstGraphName,
      secondGraphName: filteredGraphData?.secondGraphName,
    };
  }, [filteredGraphData]);

  const teams = useMemo(
    () => filterValidTeams(teamsInfoResponse?.data?.teamTabInfoDtoList),
    [teamsInfoResponse],
  );

  if (isLoadingTeams) {
    return (
      <CirclePlaceholder
        showContent={isLoadingTeams}
        height={wp(22)}
        width={wp(22)}
        times={Layout.width / wp(14)}
        row
        marginL-8
      />
    );
  }

  function renderLoadingView() {
    if (!isLoading) {
      return;
    }
    return <SectionPlaceholder times={3} />;
  }

  if (isNodataView) {
    return <NoDataView />;
  }

  return (
    <ScrollView>
      <SafeAreaView
        edges={['top']}
        style={{ marginTop: hp(1), paddingHorizontal: wp(4) }}>
        <DashBoardHeader
          headerLabel="Welcome 👋"
          name={
            user?.personalInfo?.firstName
              ? `${user?.personalInfo?.firstName} ${user?.personalInfo?.lastName}`
              : null
          }
          imgSrc={user?.personalInfo?.profilePictureURL}
          onClick={() => {
            navigation.navigate('MyAccountStack', {
              screen: 'AccountDetails',
            });
          }}
        />
        {!teams?.length &&
          !upcomingGames?.length &&
          !processGraphData?.length && (
            <View
              style={{
                paddingHorizontal: customTheme.spacings.spacing_16,
                paddingTop: hp(15)
              }}>
              <EmptyView />
            </View>
          )}
        {!!teams?.length && (
          <>
            <SectionHeader title={'My Teams'} />
            {!teams?.length && <NoDataView> No Team's Found</NoDataView>}
            <ScrollView
              bounces={false}
              horizontal
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
                />
              ))}
            </ScrollView>
          </>
        )}

        {renderLoadingView()}
        {!!upcomingGames?.length && <EventCarousel data={upcomingGames} />}
        {!!processGraphData?.length && (
          <StatsContainer
            statsType={statsType}
            onChangeStatsType={setStatsType}
            processGraphData={processGraphData ?? null}
            statsFilterOptions={statsFilterOptions}
          />
        )}

        {!!assignedChallenges?.length && (
          <MyChallenges
            onPressSeeAll={() => navigation.navigate('MyChallenges')}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default PlayerDashboard;

const styles = StyleSheet.create({
  teamNamesRow: {
    marginTop: hp(2),
    flexDirection: 'row',
    columnGap: wp(4),
  },
});
