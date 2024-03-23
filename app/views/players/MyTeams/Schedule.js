import { FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import EventItem from '../../../components/common/EventItem';
import { hp, isAndroid, wp } from '../../../utils/responsive';
import { SectionHeader } from '../../../components/common/SectionHeader';
import PrimaryButton from '../../../components/common/PrimaryButton';
import PracticeScheduleItem from '../../../components/common/PracticeScheduleItem';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useGetScheduleListForTeam } from '../../../api/myteam.api';
import { Text, View } from 'react-native-ui-lib';
import { errorToast } from '../../../utils/toast';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';
import { customTheme } from '../../../constants';
import EmptyView from '../../../components/players/EmptyView';

const ListEmptyComponent = ({ title }) => {
  return (
    <View center flex>
      <Text large-x-600 style={styles.listEmptyTitle}>
        {title}
      </Text>
    </View>
  );
};

const Schedule = () => {
  const navigation = useNavigation();
  const { isCoach } = useAuth();
  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const { data, refetch } = useGetScheduleListForTeam({
    season: selectedSeason,
    teamId: selectedTeam?.teamId,
    enabled: !!(selectedSeason && selectedTeam?.teamId),
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
  });

  useRefreshOnFocus(refetch);

  const scheduleData = data?.data;

  const onPressCreatePracticeHandler = () => {
    navigation.navigate('CreatePractice');
  };

  const practicesList = scheduleData?.practiceList?.length
    ? scheduleData?.practiceList?.length > 1
      ? scheduleData?.practiceList?.slice(0, 1)
      : scheduleData?.practiceList
    : [];

  const upcomingGames = scheduleData?.upcomingGames?.length
    ? scheduleData?.upcomingGames?.length > 1
      ? scheduleData?.upcomingGames?.slice(0, 5)
      : scheduleData?.upcomingGames
    : [];

  const renderEmptyComponent = title => {
    return <ListEmptyComponent title={title} />;
  };

  const handleSeeAllPractice = () => {
    navigation.navigate('SeeAllPractices');
  };

  const handleSeeAllUpcomingGames = () => {
    navigation.navigate('SeeAllUpcomingGames');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
        {
          (!upcomingGames.length && !practicesList.length) && (
            <View
            style={{
              paddingHorizontal: customTheme.spacings.spacing_16,
              paddingTop: hp(2)
            }}>
            <EmptyView />
          </View>
          )
        }
        {
          !!upcomingGames.length && <>
           <SectionHeader
        hideSeeAll={scheduleData?.upcomingGames?.length <= 5}
        title={'Upcoming Games'}
        onPressSeeAll={handleSeeAllUpcomingGames}
      />
      <FlatList
        horizontal
        data={upcomingGames}
        bounces={upcomingGames.length}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const date = new Date(item.scheduledAt);
          const title = `${date.getHours()}:${date.getMinutes()}`;
          return (
            <EventItem
              title={title}
              challengerLogo={item?.challengerTeamLogo}
              defenderLogo={item?.defenderTeamLogo}
            />
          );
        }}
        contentContainerStyle={styles.upcomingGamesContentContainer}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent.bind(
          null,
          'No upcoming games found',
        )}
      />
        </>
        }
        {
        !!practicesList.length &&
        <>
         <SectionHeader
        title={'Practice Schedule'}
        containerStyle={{ marginTop: hp(3.5) }}
        hideSeeAll={scheduleData?.practicesList?.length < 2}
        onPressSeeAll={handleSeeAllPractice}
      />
      <FlatList
        data={practicesList}
        keyExtractor={item => `${item?.practiceId}`}
        bounces={practicesList.length}
        renderItem={({ item }) => (
          <PracticeScheduleItem data={item} disabled={!!isCoach} />
        )}
        ListEmptyComponent={renderEmptyComponent.bind(
          null,
          'No practices are scheduled',
        )}
      />
        </>
      }
      {isCoach && (
        <PrimaryButton
          onPress={onPressCreatePracticeHandler}
          title={'Create Practice'}
          style={{ marginTop: 'auto' }}
        />
      )}
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: wp(4.5),
    paddingBottom: hp(isAndroid ? 3 : 5),
    paddingTop: hp(1),
    flexGrow: 1,
  },
  upcomingGamesContentContainer: { columnGap: wp(2), flexGrow: 1 },
  listEmptyTitle: { alignSelf: 'center', marginVertical: hp(2) },
});
