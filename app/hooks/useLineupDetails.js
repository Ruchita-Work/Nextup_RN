import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from './useAuth';
import { MyTeamsContext } from '../context/MyTeamsProvider';
import { useCreateLineup, useGetTeamPlayerPage } from '../api/myteam.api';
import { useRefreshOnFocus } from './useRefreshOnFocus';
import { errorToast } from '../utils/toast';
import { Alert } from 'react-native';
import { transformRoasterData } from '../utils/helper';
import { flatten } from 'lodash';

const useLineupDetails = () => {
  const navigation = useNavigation();
  const { isCoach } = useAuth();
  const { params } = useRoute();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const [isDefault, setIsDefault] = useState(false);

  const { data: teamPageData, refetch } = useGetTeamPlayerPage({
    teamId: selectedTeam?.teamId,
    season: selectedSeason,
    enabled: !!(selectedSeason && selectedTeam?.teamId),
  });

  const allAvailablePlayers = useMemo(() => {
    const playersMap = transformRoasterData(
      teamPageData?.data?.playerPositionInfoList,
    );
    return flatten(Object.keys(playersMap).map(i => playersMap[i]));
  }, [teamPageData]);

  const benchPlayers = useMemo(() => {
    const seletedPlayerIds = selectedPlayers.map(i => i.playerId);

    return allAvailablePlayers.filter(
      i => seletedPlayerIds.includes(i.playerId) === false,
    );
  }, [allAvailablePlayers, selectedPlayers]);

  const {
    mutateAsync: updateLineupMutation,
    isLoading: isLoadingUpdateLineup,
  } = useCreateLineup();

  useRefreshOnFocus(refetch);

  const lineupData = params?.lineup;

  useEffect(() => {
    let tmpSelectedPlayers = [];

    setIsDefault(!!params?.lineup?.default);

    if (params?.lineup?.playerPositionsList?.length) {
      params?.lineup?.playerPositionsList?.forEach(positionItem => {
        positionItem.availablePlayersList?.forEach(playerItem => {
          if (tmpSelectedPlayers.length < 5) {
            tmpSelectedPlayers.push({
              ...playerItem,
              position: positionItem?.teamPosition,
            });
          }
        });
      });
    }
    setSelectedPlayers(tmpSelectedPlayers);
  }, [params]);

  const onSelectPlayer = playerItem => {
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
          return [...prevSelectedPlayers, playerItem];
        }
      }
    });
  };

  const handleLineupEdit = async () => {
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
        name: lineupData?.name,
        playerPositionsList: playerPositionsPayloadData,
        default: isDefault,
        id: lineupData?.id,
      };

      const response = await updateLineupMutation({
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
        body: 'Failed to edit lineup!',
      });
    }
  };

  const deleteLineup = () => {
    try {
      navigation.goBack();
    } catch (error) {
      errorToast({
        title: 'Error',
        body: 'Failed to delete lineup!',
      });
    }
  };

  const handleLineupDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this lineup ?', [
      {
        text: 'Cancel',
        isPreferred: true,
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: deleteLineup,
      },
    ]);
  };

  return {
    selectedPlayers,
    lineupData,
    isCoach,
    benchPlayers,
    onSelectPlayer,
    isLoadingUpdateLineup,
    isDefault,
    setIsDefault,
    handleLineupEdit,
    handleLineupDelete,
    isAILineup: !!params?.isAILineup,
  };
};

export default useLineupDetails;
