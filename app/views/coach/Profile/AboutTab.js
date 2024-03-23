import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants';
import { RecentGames } from './Games';
import { times } from 'lodash';
import { hp, wp } from '../../../utils/responsive';
import { AlternativeTable } from '../../../components/common/AlternativeTable';

export default function AboutTab({ data }) {
  const totalYearsInfo = data?.coachTotalCarrerStats;

  const careerRecordData = (data?.carrerStats || [])?.map(item => [
    item.year,
    item.teamName,
    item.totalGames,
    item.totalWins,
    item.totalLoss,
    'N/A',
  ]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {!!data?.recentGames?.length && (
        <View style={styles.recentGamesContainer}>
          <RecentGames data={data?.recentGames} />
        </View>
      )}
      <AlternativeTable
        title="Total Years"
        headerData={[
          totalYearsInfo?.type,
          totalYearsInfo?.years,
          totalYearsInfo?.totalGames,
          totalYearsInfo?.wins,
          totalYearsInfo?.loss,
          'N/A',
        ]}
        data={[]}
        headerWidthArray={['20%', '40%', ...times(3).fill('8%'), '16%']}
        titleStyle={styles.tableTitle}
        tableContainerStyle={styles.tableContainer}
      />
      <AlternativeTable
        title="Career Record"
        headerData={['Year', 'Team', 'G', 'W', 'L', 'PTS']}
        data={careerRecordData}
        headerWidthArray={['20%', '40%', ...times(3).fill('8%'), '16%']}
        titleStyle={styles.tableTitle}
        tableContainerStyle={styles.tableContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: hp(1.5),
  },
  recentGamesContainer: {
    paddingHorizontal: wp(4),
  },
  tableTitle: {
    paddingHorizontal: wp(4),
    color: Colors.white_08,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: { paddingHorizontal: wp(1) },
});
