import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useGetScheduleListForTeam } from '../../../api/myteam.api';
import { errorToast } from '../../../utils/toast';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import Back from '../../../utils/HeaderButtons/Back';
import EventItem from '../../../components/common/EventItem';
import { hp, wp } from '../../../utils/responsive';
import { useRoute } from '@react-navigation/native';
import { customTheme } from '../../../constants';
import moment from 'moment';

const SeeAllUpcomingGames = () => {
  const { params } = useRoute();
  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);

  const queryTeamId = params?.teamId || selectedTeam?.teamId;
  const querySeason = params?.season || selectedSeason;

  const { data } = useGetScheduleListForTeam({
    season: querySeason,
    teamId: queryTeamId,
    enabled: !!queryTeamId && !!querySeason && !params?.eventsList,
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
  });

  const upcomingGamesList =
    params?.eventsList || data?.data?.upcomingGames || [];

  return (
    <ViewContainer>
      <Back
        title={params?.headerTitle || 'Upcoming Games'}
        containerStyle={styles.backButton}
      />
      <FlatList
        data={upcomingGamesList}
        keyExtractor={item => `${item?.id}`}
        numColumns={2}
        columnWrapperStyle={styles.listColumnWrapper}
        bounces={upcomingGamesList.length}
        renderItem={({ item }) => {
          return (
            <EventItem
              challengerLogo={item?.challengerTeamLogo}
              defenderLogo={item?.defenderTeamLogo}
              title={moment(item?.scheduledAt || Date.now()).format(
                'DD MMM YYYY, HH:MM',
              )}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text style={styles.noDataText}>No data available</Text>
          </View>
        )}
      />
    </ViewContainer>
  );
};

export default SeeAllUpcomingGames;

const styles = StyleSheet.create({
  backButton: { marginHorizontal: wp(5), marginTop: hp(2) },
  listColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginBottom: hp(2),
  },
  listContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
    textAlign: 'center',
  },
});
