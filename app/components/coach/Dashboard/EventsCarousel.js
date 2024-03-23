import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import EventItem from '../../common/EventItem';
import { SectionHeader } from '../../common/SectionHeader';
import { hp, wp } from '../../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { customTheme } from '../../../constants';
import { getSeasonString } from '../../../utils/helper';
import moment from 'moment';

export default function EventCarousel({
  title = 'Upcoming Games',
  data = [],
  teamId = null,
  season = getSeasonString(),
}) {
  const navigation = useNavigation();
  return (
    <View>
      <SectionHeader
        title={title}
        containerStyle={{ marginBottom: hp(1.5) }}
        hideSeeAll={data?.length <= 3}
        onPressSeeAll={() =>
          navigation.navigate('SeeAllUpcomingGames', {
            teamId,
            season,
            eventsList: data,
          })
        }
      />

      {!!(!data || !data?.length) && (
        <Text style={styles.noDataText}>No data available</Text>
      )}

      {!!data?.length && (
        <ScrollView
          style={styles.frameScrollview}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.frameScrollViewContent}>
          {data.slice(0, 3)?.map((event, index) => {
            return (
              <EventItem
                key={event?.id || `EventItem-${index}`}
                onPress={() =>
                  navigation.navigate('LiveGame', { gameId: event?.id })
                }
                title={moment(event?.scheduledAt || Date.now()).format(
                  'DD MMM YYYY, HH:MM',
                )}
                challengerLogo={event?.challengerTeamLogo}
                defenderLogo={event?.defenderTeamLogo}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frameScrollview: {
    alignSelf: 'stretch',
    width: '100%',
  },
  frameScrollViewContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    columnGap: wp(4),
  },
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
    textAlign: 'center',
    marginVertical: hp(2),
  },
});
