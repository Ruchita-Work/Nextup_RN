import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../utils/responsive';
import SelectionHeader from './SelectionHeader';
import GameStats from './GameStats';
import LastGames from './LastGames';
// import StatDuel from './StatDuel';
import { useGetTeamComparison } from '../../../api/compare.api';
import { getSeasonString } from '../../../utils/helper';

export default function TeamComparison() {
  const { params } = useRoute();

  const defaultHomeTeam = params?.home
    ? {
        name: params?.home?.name,
        pictureUrl: params?.home?.teamLogoUrl,
        id: +params?.home?.teamId,
        type: null,
        seasonLists: params?.home?.seasonType,
      }
    : null;

  const defaultAwayTeam = params?.away
    ? {
        name: params?.away?.name,
        pictureUrl: params?.away?.teamLogoUrl,
        id: +params?.away?.teamId,
        type: null,
        seasonLists: params?.away?.seasonType,
      }
    : null;

  const navigation = useNavigation();
  const [season, setSeason] = useState(getSeasonString());
  const [homeTeam, setHomeTeam] = useState(defaultHomeTeam);
  const [awayTeam, setAwayTeam] = useState(defaultAwayTeam);

  const { mutate: mutateGetTeamComparison, data: comparisonInfoResponse } =
    useGetTeamComparison();

  useEffect(() => {
    if (homeTeam?.id && awayTeam?.id) {
      mutateGetTeamComparison({
        challengerId: homeTeam?.id,
        defenderId: awayTeam?.id,
      });
    }
  }, [homeTeam, awayTeam, mutateGetTeamComparison]);

  const onSelectTeam = team => {
    setAwayTeam(team);
  };

  const onPressSelectAwayTeam = () => {
    navigation.navigate('SearchTeams', { onSelectTeam });
  };

  const sideBySideChartData =
    comparisonInfoResponse?.data?.homeTeam?.kpi?.map?.(i => ({
      name: i,
      value: [
        comparisonInfoResponse?.data?.homeTeam?.stats?.[i] || 0,
        comparisonInfoResponse?.data?.comparedTeam?.stats?.[i] || 0,
      ],
    }));

  return (
    <SafeAreaView style={styles.container}>
      <Back
        containerStyle={styles.backButtonContainer}
        title="Team Comparison"
      />
      <SelectionHeader
        allSeason={comparisonInfoResponse?.data?.seasonList}
        season={season}
        selectTeam={onPressSelectAwayTeam}
        selectSeason={e => setSeason(e)}
        homeTeamData={
          homeTeam
            ? {
                logoUrl: { uri: homeTeam?.pictureUrl },
                name: homeTeam?.name,
              }
            : null
        }
        awayTeamData={
          awayTeam
            ? {
                logoUrl: { uri: awayTeam?.pictureUrl },
                name: awayTeam?.name,
              }
            : null
        }
      />
      {!!comparisonInfoResponse?.data && (
        <ScrollView horizontal={false}>
          <GameStats sideBySideChartData={sideBySideChartData} />
          <LastGames
            awayGame={comparisonInfoResponse?.data?.comparedLastGame}
            homeGame={comparisonInfoResponse?.data?.homeLastGame}
          />
          {/* <StatDuel data={comparisonInfoResponse?.data} /> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(3),
    marginTop: hp(2),
  },
});
