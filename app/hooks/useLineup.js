import { useContext, useMemo, useState } from 'react';
import { errorToast } from '../utils/toast';
import { useRefreshOnFocus } from './useRefreshOnFocus';
import { MyTeamsContext } from '../context/MyTeamsProvider';
import { useCreateLineup, useGetTeamPlayerPage } from '../api/myteam.api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { transformRoasterData } from '../utils/helper';

const useLineup = () => {
  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const navigation = useNavigation();
  const { params } = useRoute();

  const { data: teamPageData, refetch } = useGetTeamPlayerPage({
    teamId: selectedTeam?.teamId,
    season: selectedSeason,
    enabled: !!(selectedSeason && selectedTeam?.teamId),
  });

  const {
    mutateAsync: createLineupMutation,
    isLoading: isLoadingCreateLineup,
  } = useCreateLineup();

  useRefreshOnFocus(refetch);

  const [lineupName, setLineupName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const onSelectPlayer = (playerItem, position) => {
    setSelectedPlayers(prevSelectedPlayers => {
      const isAlreadySelected = prevSelectedPlayers.find(
        item => item?.playerId === playerItem?.playerId,
      );
      if (isAlreadySelected) {
        return prevSelectedPlayers.filter(
          item => item.playerId !== playerItem?.playerId,
        );
      } else {
        if (prevSelectedPlayers.length >= 5) {
          return prevSelectedPlayers;
        } else {
          return [...prevSelectedPlayers, { ...playerItem, position }];
        }
      }
    });
  };

  const handleLineupSave = async () => {
    if (!lineupName.trim()) {
      errorToast({
        title: 'Required',
        body: 'Please enter lineup name',
      });
      return;
    }
    if (selectedPlayers.length < 5) {
      errorToast({
        title: 'Required',
        body: 'Please select at least 5 players',
      });
      return;
    }
    try {
      const selectedForwardPlayer = selectedPlayers.filter(
        item => item.position === 'FORWARD',
      );
      const selectedCenterPlayer = selectedPlayers.filter(
        item => item.position === 'CENTER',
      );
      const selectedGuardPlayer = selectedPlayers.filter(
        item => item.position === 'GUARD',
      );

      const playerPositionsPayloadData = [
        {
          availablePlayersList: selectedForwardPlayer,
          teamPosition: 'FORWARD',
        },
        {
          availablePlayersList: selectedCenterPlayer,
          teamPosition: 'CENTER',
        },
        {
          availablePlayersList: selectedGuardPlayer,
          teamPosition: 'GUARD',
        },
      ];

      const lineupPayload = {
        name: lineupName,
        playerPositionsList: playerPositionsPayloadData,
      };

      const response = await createLineupMutation({
        teamId: selectedTeam?.teamId,
        season: selectedSeason,
        payload: lineupPayload,
      });

      if (response.success && !response.error) {
        navigation.goBack();
      } else {
        throw new Error('Fail');
      }
    } catch (error) {
      errorToast({
        title: 'Error',
        body: 'Failed to create lineup!',
      });
    }
  };

  const showAiLineupButton = !!(
    params?.aiBasedLineUp && params?.aiBasedLineUp?.length
  );

  const handleOnPressAiLineup = () => {
    // TODO : Auto Select Players based on aiBasedLineUp data
  };

  const teamPlayerVarsityData = useMemo(
    () =>
      transformRoasterData(teamPageData?.data?.playerPositionInfoList || []),
    [teamPageData],
  );

  return {
    lineupName,
    setLineupName,
    forwardPlayers: teamPlayerVarsityData?.FORWARD || [],
    centerPlayers: teamPlayerVarsityData?.CENTER || [],
    guardPlayers: teamPlayerVarsityData?.GUARD || [],
    handleLineupSave,
    selectedPlayers,
    onSelectPlayer,
    isLoadingCreateLineup,
    showAiLineupButton,
    handleOnPressAiLineup,
  };
};

export default useLineup;
