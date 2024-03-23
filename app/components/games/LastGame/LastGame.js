import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import GameHeader from './GameHeader';
import LastGameScoreTable from './LastGameScoreTable';
import { useNavigation } from '@react-navigation/native';
import { customTheme } from '../../../constants';

export const getQuaterData = quaterInfoData => {
  return [
    quaterInfoData?.QUARTER_1 || '-',
    quaterInfoData?.QUARTER_2 || '-',
    quaterInfoData?.QUARTER_3 || '-',
    quaterInfoData?.Final || '-',
  ];
};

const LastGame = ({ data }) => {
  const navigation = useNavigation();

  const recentGameInfo = data?.recentGamesInfoList[0];
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
      title: data?.leaderBoardTeamInfo?.name,
      quaterData: getQuaterData(recentGameInfo?.challengerQuarterInfo),
    },
  ];

  return (
    <View>
      <Text style={styles.title}>Last Game</Text>
      {recentGameInfo ? (
        <TouchableOpacity
          onPress={onPressGamesStatshandler}
          activeOpacity={0.7}>
          <GameHeader
            leftTeaminfo={gameHeaderdata.left}
            rightTeamInfo={gameHeaderdata.right}
          />
          <LastGameScoreTable tableData={lastGameTableData} />
        </TouchableOpacity>
      ) : (
        <Text style={styles.noDataText}>No Data Available</Text>
      )}
    </View>
  );
};

export default LastGame;
