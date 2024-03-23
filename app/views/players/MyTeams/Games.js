import React, { useContext } from 'react';
import StatisticalOverview from '../../../components/games/StatisticalOverview/StatisticalOverview';
import { ScrollView, StyleSheet } from 'react-native';
import { customTheme } from '../../../constants';
import { hp } from '../../../utils/responsive';
import LastGame from '../../../components/games/LastGame/LastGame';
import Standings from '../../../components/games/Standings/Standings';
import { useAuth } from '../../../hooks/useAuth';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useGetGameTabForTeam } from '../../../api/myteam.api';
import { errorToast } from '../../../utils/toast';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';

export default function Games() {
  const { user } = useAuth();

  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const { data, refetch } = useGetGameTabForTeam({
    userId: user?.id,
    season: selectedSeason,
    teamId: selectedTeam?.teamId,
    enabled: !!(selectedSeason && selectedTeam && user?.id),
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
  });

  useRefreshOnFocus(refetch);

  const gameData = data?.data;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <StatisticalOverview data={gameData || null} />
      <LastGame data={gameData || null} />
      {/* <Standings /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: customTheme.spacings.spacing_16,
    marginTop: hp(4),
    paddingBottom: hp(6),
  },
});
