import { useCallback, useContext, useState } from 'react';
import {
  useGetPlayersForInvite,
  useInvitePlayerToTeam,
} from '../api/myteam.api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from './useAuth';
import { errorToast } from '../utils/toast';
import { MyTeamsContext } from '../context/MyTeamsProvider';
import useInviteShare from './useInviteShare';

const positionValueEnum = {
  FORWARD: 0,
  CENTER: 1,
  GUARD: 2,
};

const useInvitePlayersFromSearch = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { mutateAsync: invitePlayerToTeamMutation } = useInvitePlayerToTeam();
  const { data: playersListData } = useGetPlayersForInvite({
    userId: user?.id,
    search: searchQuery,
  });
  const { openShareSheet } = useInviteShare();

  const { selectedSeason, selectedTeam } = useContext(MyTeamsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const position = route.params?.position;

  const onSearchPlayers = async (searchText = '') => {
    setSearchQuery(searchText);
  };

  const onPressCheckBoxHandler = useCallback(
    (isSelected, item) => {
      let newValues = [...selectedPlayers];
      if (isSelected) {
        newValues = newValues.filter(i => i?.id !== item?.id);
      } else {
        newValues.push(item);
      }
      setSelectedPlayers(newValues);
    },
    [selectedPlayers],
  );

  const invitePlayer = async () => {
    try {
      if (selectedPlayers.length) {
        setIsLoading(true);
        const addedTime = Date.now();

        const payload = selectedPlayers.map(item => ({
          playerName: item.name,
          playerId: item.id,
          playerProfilePictureUrl: item.profilePictureUrl,
          addedAt: addedTime,
        }));

        const response = await invitePlayerToTeamMutation({
          teamId: selectedTeam?.teamId,
          season: selectedSeason,
          position: positionValueEnum[position],
          payload,
        });

        if (!response.error && response.success) {
          navigation.goBack();
        } else {
          throw new Error('Fail');
        }
        setIsLoading(false);
      } else {
        navigation.navigate('InvitePlayers');
      }
    } catch (error) {
      setIsLoading(false);
      errorToast({
        title: 'Error',
        body: 'Failed to invite players! Please try again after some time',
      });
    }
  };

  const onPressInviteHandler = () => {
    if (selectedPlayers.length) {
      invitePlayer();
    } else {
      navigation.navigate('InvitePlayers');
    }
  };

  return {
    selectedPlayers,
    navigation,
    onSearchPlayers,
    playersListData,
    onPressShareHandler: openShareSheet,
    onPressInviteHandler,
    onPressCheckBoxHandler,
    isLoading,
  };
};

export default useInvitePlayersFromSearch;
