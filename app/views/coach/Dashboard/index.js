import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DashBoardHeader from '../../../components/common/DashBoardHeader';
import { TeamsBar } from '../../../components/coach/Dashboard/MyTeams';
import UpcomingGames from '../../../components/coach/Dashboard/EventsCarousel';
import MyChallenges from '../../../components/coach/Dashboard/Challenges';
import { Button } from 'react-native-ui-lib';
import { customTheme } from '../../../constants';
import CoachDashboardStatisticalOverview from '../../../components/coach/Dashboard/CoachDashboardStatisticalOverview';
import CoachDashboardLastGame from '../../../components/coach/Dashboard/LastGame';
import MatchUp from '../../../components/coach/Dashboard/MatchUp';
import { Padding } from '../../GlobalStyles';
import Notification from '../../../components/coach/Dashboard/Notification';
import { useAuth } from '../../../hooks/useAuth';
import useCoachDash from '../../../hooks/useCoachDash';
import Empty from '../../../components/coach/Dashboard/Empty';
import PracticeNotification from '../../../components/coach/Dashboard/PracticeNotification';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import { hp, wp } from '../../../utils/responsive';
import { getSeasonString } from '../../../utils/helper';

export default function CoachDashboard() {
  const navigation = useNavigation();
  const [isNotify, setNotify] = useState(false);
  const [isPracticeNotify, setPracticeNotify] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(getSeasonString());

  const { user } = useAuth();
  const { teamIndex, selectTeam, teams, coachDashboardResponse, seasonLists } =
    useCoachDash({ userId: user?.id, season: selectedSeason });

  useEffect(() => {
    setTimeout(() => setNotify(true), 4000);
  }, []);

  function addTeam() {
    navigation.navigate('AddNewTeam');
  }

  const selectedTeamId = teams?.[teamIndex]?.teamId;

  return (
    <ViewContainer>
      <Notification
        containerStyle={{ display: isNotify ? 'flex' : 'none' }}
        close={() => setNotify(false)}
      />
      <PracticeNotification
        isVisible={isPracticeNotify}
        onClick={() => setPracticeNotify(false)}
      />
      <ScrollView
        style={styles.playerDash}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.playerDashScrollViewContent}>
        <View style={[styles.frameParent, styles.frameParentSpaceBlock1]}>
          <DashBoardHeader
            containerStyle={{
              paddingHorizontal: customTheme.spacings.spacing_16,
            }}
            headerLabel="Welcome 👋"
            imgSrc={user?.personalInfo?.profilePictureURL}
            name={
              user?.personalInfo?.firstName
                ? `${user?.personalInfo?.firstName} ${user?.personalInfo?.lastName}`
                : null
            }
            onClick={() =>
              navigation.navigate('MyAccountStack', {
                screen: 'AccountDetails',
              })
            }
          />
          {teams.length === 0 ? (
            <View
              style={{
                paddingHorizontal: customTheme.spacings.spacing_16,
              }}>
              <Empty onAddTeam={addTeam} />
            </View>
          ) : (
            <>
              <View
                style={{ paddingHorizontal: customTheme.spacings.spacing_16 }}>
                <TeamsBar
                  current={teamIndex}
                  onSelect={selectTeam}
                  teams={teams}
                  handleAddTeam={addTeam}
                />
                <UpcomingGames
                  data={coachDashboardResponse?.data?.gamesBasicCardInfoList}
                  teamId={selectedTeamId}
                  season={selectedSeason}
                />
                <CoachDashboardStatisticalOverview
                  selectedSeason={selectedSeason}
                  setSelectedSeason={setSelectedSeason}
                  data={coachDashboardResponse?.data}
                  seasonsList={seasonLists}
                />
              </View>
              <CoachDashboardLastGame data={coachDashboardResponse?.data} />
              <Button
                label={'Compare Teams'}
                onPress={() => {
                  navigation.navigate('TeamCompare', {
                    home: teams?.[teamIndex],
                  });
                }}
                backgroundColor={customTheme.colors.darkYellow}
                style={styles.compareTeam}
              />
              <MatchUp data={coachDashboardResponse?.data?.playerMatchUpList} />
              <MyChallenges />
            </>
          )}
        </View>
      </ScrollView>
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  playerDash: {
    overflow: 'hidden',
    width: wp(100),
    flex: 1,
    backgroundColor: customTheme.colors.base,
    alignSelf: 'center',
  },
  playerDashScrollViewContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp(2),
  },
  frameParent: {
    position: 'relative',
    paddingVertical: 0,
    alignSelf: 'stretch',
  },
  frameParentSpaceBlock1: {
    paddingVertical: 0,
  },
  compareButtonContainer: {
    marginVertical: Padding.p_base,
  },
  compareTeam: {
    marginTop: hp(2),
    marginHorizontal: wp(4),
    paddingVertical: hp(2),
  },
});
