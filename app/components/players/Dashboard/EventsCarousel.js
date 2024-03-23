/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SectionHeader } from '../../common/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { times } from 'lodash';
import EventItem from '../../common/EventItem';
import { wp } from '../../../utils/responsive';
import { CardPlaceholder } from '../../common/placeholder/Placeholder';
import { NoDataView } from '../../common/NoDataView';
import moment from 'moment';

export const EventCarousel = ({
  title = 'Upcoming Schedules',
  isLoading = false,
  data = null,
}) => {
  const navigation = useNavigation();
  function _renderLoading() {
    return <CardPlaceholder row width={188} height={98} times={2} />;
  }
  function _renderNodata() {
    return <NoDataView />;
  }
  function _renderLayout() {
    return (
      <ScrollView
        style={styles.frameScrollview}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}>
        {data.slice(0, 3).map((event, index) => {
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
    );
  }
  return (
    <>
      <SectionHeader
        title={title}
        hideSeeAll={data?.length <= 3}
        onPressSeeAll={() =>
          navigation.navigate('SeeAllUpcomingGames', {
            eventsList: data,
            headerTitle: title,
          })
        }
      />
      {isLoading && _renderLoading()}
      {!isLoading && !data?.length && _renderNodata()}
      {!isLoading && data?.length && _renderLayout()}
    </>
  );
};

const styles = StyleSheet.create({
  frameScrollview: { alignSelf: 'stretch', width: '100%' },
  frameScrollViewContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    columnGap: wp(4),
  },
});
