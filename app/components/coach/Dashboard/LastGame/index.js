import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GameHeader from '../../../games/LastGame/GameHeader';
import LastGameScoreTable from '../../../games/LastGame/LastGameScoreTable';
import { hp, wp } from '../../../../utils/responsive';
import { Colors, customTheme } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { getQuaterData } from '../../../games/LastGame/LastGame';
import TeamSummary from './TeamSummary';

const CoachDashboardLastGame = ({ data }) => {
  const navigation = useNavigation();

  const recentGameInfo = data?.lastGameInfo?.recentGamesInfo;

  const teamSummaryInfo = data?.lastGameInfo?.teamSummary;

  const onPressGamesStatshandler = () => {
    navigation.navigate('GameStatistics', {
      gameId: recentGameInfo?.gameId || null,
    });
  };

  const gameHeaderdata = {
    right: {
      name: recentGameInfo?.challengerName || 'N/A',
      color: customTheme.colors.lightRed,
      image: { uri: recentGameInfo?.challengerTeamLogoUrl },
    },
    left: {
      name: recentGameInfo?.defenderName || 'N/A',
      color: customTheme.colors.lightBlue,
      image: { uri: recentGameInfo?.defenderTeamLogoUrl },
    },
  };

  const lastGameTableData = [
    {
      title: recentGameInfo?.defenderName,
      quaterData: getQuaterData(recentGameInfo?.defenderQuarterInfo),
    },
    {
      title: recentGameInfo?.challengerName,
      quaterData: getQuaterData(recentGameInfo?.challengerQuarterInfo),
    },
  ];

  return (
    <View>
      <Text style={styles.title}>Last Game</Text>
      <View style={styles.content}>
        <Text style={styles.summaryText}>Player Summary</Text>
        <TouchableOpacity
          onPress={onPressGamesStatshandler}
          activeOpacity={0.7}>
          <GameHeader
            containerStyle={styles.gameHeaderContainer}
            leftTeaminfo={gameHeaderdata.left}
            rightTeamInfo={gameHeaderdata.right}
          />
          <LastGameScoreTable tableData={lastGameTableData} />
          <TeamSummary data={teamSummaryInfo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoachDashboardLastGame;

const styles = StyleSheet.create({
  title: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_22,
    marginTop: hp(1),
    paddingHorizontal: customTheme.spacings.spacing_16,
  },
  content: {
    backgroundColor: Colors.lightDark,
    marginTop: hp(1.5),
    paddingBottom: hp(2),
  },
  summaryText: {
    fontFamily: customTheme.fontFamily.robotoBold,
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_18,
    marginTop: hp(2),
    paddingHorizontal: customTheme.spacings.spacing_16,
    fontWeight: 'bold',
  },
  gameHeaderContainer: {
    backgroundColor: Colors.base,
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    marginHorizontal: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
});
