import React, { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import HeaderGreyComponent from '../../common/HeaderGreyComponent';
import AddButtonWithIcon from '../../common/AddButtonWithIcon';
import { Text, View } from 'react-native-ui-lib';
import AvatarItem from '../../common/AvatarItem';
import { useAuth } from '../../../hooks/useAuth';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useGetTeamPlayerPage } from '../../../api/myteam.api';
import { errorToast } from '../../../utils/toast';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';
import { transformRoasterData } from '../../../utils/helper';

export const RoasterComponent = () => {
  const navigation = useNavigation();
  const { isCoach } = useAuth();
  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);

  const { data: teamPageData, refetch } = useGetTeamPlayerPage({
    teamId: selectedTeam?.teamId,
    season: selectedSeason,
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
    enabled: !!(selectedSeason && selectedTeam?.teamId),
  });

  useRefreshOnFocus(refetch);

  const teamPlayerVarsityData = useMemo(
    () =>
      transformRoasterData(teamPageData?.data?.playerPositionInfoList || []),
    [teamPageData],
  );

  const renderRightAddButton = position => {
    return (
      <AddButtonWithIcon
        onPress={() => navigation.navigate('SearchPlayers', { position })}
      />
    );
  };

  const renderVarsityItem = (item, index) => (
    <AvatarItem
      key={index}
      onPress={() =>
        navigation.navigate('CoachViewPlayerDetails', {
          playerId: item?.playerId,
          invitation: false,
        })
      }
      blurImage={!item?.invitationAccepted}
      title={item?.playerName}
      image={item?.playerProfilePictureUrl}
      containerStyle={styles.varsityAvatar}
      titleStyle={{ marginHorizontal: wp(1) }}
    />
  );

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentView}>
        <Text medium-700>No Data Found</Text>
      </View>
    );
  };

  const positionsList = Object.keys(teamPlayerVarsityData);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {positionsList.map((positionItem, positionIndex) => {
        return (
          <React.Fragment key={`positionsList-${positionIndex}`}>
            <HeaderGreyComponent
              title={positionItem}
              containerStyle={styles.headerGrey}
              rightContent={
                isCoach
                  ? renderRightAddButton.bind(null, positionItem)
                  : undefined
              }
            />
            <View row style={styles.varsityListContainer}>
              {teamPlayerVarsityData?.[positionItem]?.length ? (
                <>
                  {teamPlayerVarsityData?.[positionItem]?.map(
                    renderVarsityItem,
                  )}
                </>
              ) : (
                renderEmptyComponent()
              )}
            </View>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerGrey: {
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },
  varsityAvatar: {
    width: '20%',
  },
  varsityListContainer: {
    rowGap: hp(2.5),
    flexWrap: 'wrap',
  },
  scrollContent: {
    paddingBottom: hp(4),
    marginHorizontal: wp(7),
  },
  emptyComponentView: {
    width: '100%',
    marginTop: hp(1.5),
    alignItems: 'center',
  },
});
