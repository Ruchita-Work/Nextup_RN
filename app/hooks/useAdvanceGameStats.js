import { useRoute } from '@react-navigation/native';
import { useGetAdvanceGameStats } from '../api/myteam.api';
import { useMemo, useState } from 'react';
import { getQuaterData } from '../components/games/LastGame/LastGame';
import { customTheme } from '../constants';

const useAdvanceGameStats = () => {
  const route = useRoute();
  const { data } = useGetAdvanceGameStats({
    gameId: route?.params?.gameId,
    enabled: !!route?.params?.gameId,
  });
  const [isVisibleGameSelectSheet, setIsVisibleGameSelectSheet] =
    useState(false);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('defender');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const isChallengerSelected = useMemo(
    () => selectedTeamFilter === 'challenger',
    [selectedTeamFilter],
  );

  const gameStatsData = data?.data;

  const recentGamesInfo = gameStatsData?.recentGamesInfo;

  const defenderTeamQuarterInfo =
    gameStatsData?.recentGamesInfo?.defenderQuarterInfo;

  const challengerTeamQuarterInfo =
    gameStatsData?.recentGamesInfo?.challengerQuarterInfo;

  const defenderCourtData = gameStatsData?.defenderTurnOverChart;

  const challengerCourtData = gameStatsData?.challengerTurnOverChart;

  const lastGameScoreData = [
    {
      title: recentGamesInfo?.defenderName || 'N/A',
      quaterData: getQuaterData(defenderTeamQuarterInfo),
    },
    {
      title: recentGamesInfo?.challengerName || 'N/A',
      quaterData: getQuaterData(challengerTeamQuarterInfo),
    },
  ];

  const gameSelectSheetOptions = [
    {
      label: recentGamesInfo?.defenderName,
      onPress: () => {
        setSelectedTeamFilter('defender');
        setIsVisibleGameSelectSheet(false);
        setSelectedPlayer(null);
      },
      color: customTheme.colors.lightBlue,
    },
    {
      label: recentGamesInfo?.challengerName,
      onPress: () => {
        setSelectedTeamFilter('challenger');
        setIsVisibleGameSelectSheet(false);
        setSelectedPlayer(null);
      },
      color: customTheme.colors.lightRed,
    },
  ];

  const playerSelectSheetOptions =
    (isChallengerSelected
      ? gameStatsData?.challengerPlayerInfo
      : gameStatsData?.defenderPlayerInfo) || [];

  const boxScoreAndCourtData = useMemo(() => {
    if (!gameStatsData) {
      return {
        boxScore: [],
        court: {},
      };
    }

    const defenderBoxScoreData =
      gameStatsData?.defenderKpiWithEachQuarter || {};
    const challengerBoxScoreData =
      gameStatsData?.challengerKpiWithEachQuarter || {};

    const kpiMap = {
      challenger: challengerBoxScoreData,
      defender: defenderBoxScoreData,
    };

    const playersListData =
      (isChallengerSelected
        ? gameStatsData.challengerPlayerInfo
        : gameStatsData.defenderPlayerInfo) || [];

    const selectedPlayerInfo = selectedPlayer
      ? playersListData?.find(
          playerItem => playerItem?.playerId === selectedPlayer?.playerId,
        )
      : null;

    const dataObj = selectedPlayer
      ? selectedPlayerInfo?.kpiWithEachQuarter
      : kpiMap[selectedTeamFilter] || [];

    const courtChartData = selectedPlayer
      ? selectedPlayerInfo?.turnOverChartsValue
      : isChallengerSelected
      ? challengerCourtData
      : defenderCourtData;

    if (!dataObj) {
      return {
        boxScore: [],
        court: courtChartData || {},
      };
    }

    const kpiKeys = Object.keys(dataObj[0] || {});

    const boxScoreTableData = kpiKeys.map(kpiItem => {
      let tableItem = [kpiItem];
      dataObj?.forEach(item => {
        tableItem.push(item[kpiItem] ?? '-');
      });
      return tableItem;
    });

    return {
      boxScore: boxScoreTableData,
      court: courtChartData,
    };
  }, [
    isChallengerSelected,
    gameStatsData,
    selectedPlayer,
    selectedTeamFilter,
    challengerCourtData,
    defenderCourtData,
  ]);

  const gameHeaderData = {
    right: {
      name: recentGamesInfo?.challengerName,
      color: customTheme.colors.lightRed,
      image: { uri: recentGamesInfo?.challengerTeamLogoUrl },
    },
    left: {
      name: recentGamesInfo?.defenderName,
      color: customTheme.colors.lightBlue,
      image: { uri: recentGamesInfo?.defenderTeamLogoUrl },
    },
  };

  const filterButtonsData = {
    teamButton: {
      title: isChallengerSelected
        ? recentGamesInfo?.challengerName
        : recentGamesInfo?.defenderName,
      color: isChallengerSelected
        ? customTheme.colors.lightRed
        : customTheme.colors.lightBlue,
    },
    playerButton: {
      title: selectedPlayer ? selectedPlayer?.playerName : 'All Players',
    },
  };

  return {
    recentGamesInfo,
    lastGameScoreData,
    isChallengerSelected,
    setIsVisibleGameSelectSheet,
    boxScoreData: boxScoreAndCourtData.boxScore,
    gameSelectSheetOptions,
    isVisibleGameSelectSheet,
    gameHeaderData,
    courtData: boxScoreAndCourtData.court,
    filterButtonsData,
    playerSelectSheetOptions,
    setSelectedPlayer,
    selectedPlayer,
  };
};

export default useAdvanceGameStats;
