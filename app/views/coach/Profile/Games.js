import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SectionHeader } from '../../../components/common/SectionHeader';
import EventItem from '../../../components/common/EventItem';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';

export const RecentGames = ({ title = 'Recent Games', data = [] }) => {
  const navigation = useNavigation();
  return (
    <View style={{ width: '100%' }}>
      <SectionHeader
        title={title}
        onPressSeeAll={() =>
          navigation.navigate('SeeAllUpcomingGames', {
            eventsList: data,
            headerTitle: 'Recent Games',
          })
        }
        hideSeeAll={data?.length <= 3}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}>
        {(!data || !data?.length) && (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.noDataText}>No Recent Games Found</Text>
          </View>
        )}
        {!!(data && data.length) &&
          data.slice(0, 3).map((item, index) => {
            return (
              <EventItem
                key={item?.id || `EventItem-${index}`}
                onPress={() =>
                  navigation.navigate('LiveGame', { gameId: item?.id })
                }
                title={item.score || 'N/A'}
                challengerLogo={item?.challengerTeamLogo}
                defenderLogo={item?.defenderTeamLogo}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(4),
    flexGrow: 1,
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
