import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useContext } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { customTheme } from '../../../constants';
import TeamItem from '../../common/TeamItem';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import { hp, wp } from '../../../utils/responsive';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import SeasonSelectDropdown from '../../common/SeasonSelectDropdown';
import { useGetTeamInfo } from '../../../api/myteam.api';
import { appImages } from '../../../constants/appImages';
import { filterValidTeams } from '../../../utils/helper';
import EmptyView from '../../players/EmptyView';

const MyTeamsHeader = () => {
  const navigation = useNavigation();
  const { isCoach, user } = useAuth();

  const { selectedSeason, selectedTeam, setSelectedSeason, setSelectedTeam } =
    useContext(MyTeamsContext);

  const { data } = useGetTeamInfo({
    userId: user?.id,
    onSuccess: response => {
      if (response?.success) {
        const filteredTeams = filterValidTeams(
          response?.data?.teamTabInfoDtoList,
        );
        setSelectedTeam(filteredTeams[0] || null);
      }
    },
  });

  const teams = filterValidTeams(data?.data?.teamTabInfoDtoList);

  const listData =
    teams.length > 2 || !isCoach ? teams : [{ type: 'AddTeam' }, ...teams];

  const renderListItem = useCallback(
    ({ item }) => {
      if (item.type === 'AddTeam') {
        return (
          <View style={styles.addNewTeamContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('AddNewTeam')}>
              <Image
                resizeMode="contain"
                source={appImages.addteamrounded}
                style={styles.addTeamImage}
              />
            </TouchableOpacity>
            <Text medium style={styles.addTeamText}>
              Add
            </Text>
          </View>
        );
      } else {
        return (
          <TeamItem
            imageSource={{ uri: item?.teamLogoUrl }}
            name={item?.name}
            onPress={() => setSelectedTeam(item)}
            isActive={selectedTeam?.teamId === item?.teamId}
            containerStyle={styles.teamMainView}
            imageContainerStyle={{ height: wp(20), width: wp(20) }}
          />
        );
      }
    },
    [selectedTeam],
  );

  const renderEmptyComponent = () => (
    <View
      style={{
        paddingHorizontal: customTheme.spacings.spacing_16,
        paddingTop: hp(15)
      }}>
      <EmptyView />
    </View>
  );
  return (
    <View style={styles.container}>
      <View row centerV spread style={styles.header}>
        <Text large-xl-600>My Teams</Text>
        {!!data?.data?.seasonLists && (
          <SeasonSelectDropdown
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
            seasons={data?.data?.seasonLists}
          />
        )}
      </View>
      <FlatList
        bounces={false}
        horizontal={true}
        scrollEnabled={listData.length > 3}
        data={listData}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => item?.teamId?.toString()}
        renderItem={renderListItem}
        ListEmptyComponent={renderEmptyComponent}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(MyTeamsHeader);

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2.5),
  },
  header: {
    marginBottom: hp(1),
    marginLeft: wp(5),
  },
  teamMainView: {
    width: wp(28),
  },
  addTeamImage: {
    height: wp(20),
    width: wp(20),
  },
  addTeamText: {
    color: customTheme.colors.btnBg,
    paddingBottom: hp(1),
    paddingTop: hp(1.5),
    textAlign: 'center',
  },
  addNewTeamContainer: {
    width: wp(28),
    alignItems: 'center',
  },
  listContent: {
    justifyContent: 'flex-start',
    columnGap: wp(4),
    marginTop: hp(2),
    marginHorizontal: wp(4),
    paddingRight: wp(8),
  },
  teamEmptyView: {
    width: wp(90),
    height: wp(30),
  },
});
