import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, hp } from '../../../utils/responsive';
import Back from '../../../utils/HeaderButtons/Back';
import SelectionHeader from './SelectionHeader';
import OverallStats from './OverallStats';
import StatsComparison from './StatsComparison';
import LastGames from './LastGames';
import UpcomingGames from './UpcomingGames';
import SearchModal from './SearchModal';
import { useRoute } from '@react-navigation/native';

const _seasonList = [
  '2020-21',
  '2020-22',
  '2020-21',
  '2020-22',
  '2020-21',
  '2020-22',
  '2020-21',
  '2020-22',
  '2020-21',
  '2020-22',
];

export default function PlayerComparison() {
  const route = useRoute();
  const [isSearchOpen, openSearch] = useState(false);
  const [season, setSeason] = useState(_seasonList[0]);

  return (
    <SafeAreaView style={styles.container}>
      <Back
        containerStyle={styles.backButtonContainer}
        title="Player Comparison"
      />
      <SelectionHeader
        season={season}
        selectPlayer={() => openSearch(true)}
        allSeason={_seasonList}
        selectSeason={e => setSeason(e)}
        homePlayerData={route.params?.homePlayer}
        awayPlayerData={route.params?.secondPlayer}
      />
      <ScrollView horizontal={false}>
        <OverallStats />
        <StatsComparison
          homePlayerData={route.params?.homePlayer}
          awayPlayerData={route.params?.secondPlayer}
        />
        <LastGames />
        <UpcomingGames />
        <SearchModal isOpen={isSearchOpen} close={() => openSearch(false)} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButtonContainer: {
    marginHorizontal: wp(5),
    marginTop: hp(1),
    marginBottom: hp(3),
  },
});
