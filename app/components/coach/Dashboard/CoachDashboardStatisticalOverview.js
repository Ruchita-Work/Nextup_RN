import React from 'react';
import { Text, View } from 'react-native';
import { Dash } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
import ScoreItem from '../../games/StatisticalOverview/ScoreItem';
import StatsItem from '../../games/StatisticalOverview/StatsItem';
import AgendaItem from '../../games/StatisticalOverview/AgendaItem';
import { customTheme } from '../../../constants';
import { StyleSheet } from 'react-native';
import SeasonSelectDropdown from '../../common/SeasonSelectDropdown';
import { round } from 'lodash';

const CoachDashboardStatisticalOverview = ({
  data,
  selectedSeason,
  setSelectedSeason,
  seasonsList,
}) => {
  const homeRecordScore = data?.gameStatisticalView?.homeRecord || 0;
  const awayRecordScore = data?.gameStatisticalView?.awayRecord || 0;

  const winCount = data?.lifeTimeStats?.wins || 0;
  const lossCount = data?.lifeTimeStats?.loss || 0;

  const streakValue = winCount - lossCount;

  const last10Value = data?.lifeTimeStats?.last10 || '-';
  const winCountValue = `${winCount} Wins`;
  const losesCountValue = `${lossCount} Losses`;
  const totalgamesCount = winCount + lossCount;

  const winPercent = isNaN(round(winCount / totalgamesCount, 2))
    ? 0
    : round(winCount / totalgamesCount, 2) * 100;

  const lossPercent = isNaN(round(lossCount / totalgamesCount, 2))
    ? 0
    : round(lossCount / totalgamesCount, 2) * 100;

  return (
    <View style={{ marginTop: hp(3) }}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistical Overview</Text>
        <SeasonSelectDropdown
          selectedSeason={selectedSeason}
          onSelectSeason={setSelectedSeason}
          seasons={seasonsList}
        />
      </View>
      {!data && (
        <Text style={styles.noDataText}>
          No statistical overview data available
        </Text>
      )}
      {!!data && (
        <>
          <View style={styles.scoreCardContainer}>
            <ScoreItem score={homeRecordScore} subTitle={'Home Record'} />
            <Dash
              vertical
              color={customTheme.colors.light + '10'}
              length={wp(15)}
            />
            <ScoreItem score={awayRecordScore} subTitle={'Away Record'} />
          </View>
          <Svg width={180} height={180} style={styles.chartSvg}>
            <View style={styles.totalGamesContainer}>
              <Text style={styles.totalGamesCount}>{totalgamesCount}</Text>
              <Text style={styles.totalGamesText}>Total Games</Text>
            </View>
            <VictoryPie
              standalone={false}
              colorScale={[
                customTheme.colors.darkRed,
                customTheme.colors.btnBg,
                customTheme.colors.lightDark,
              ]}
              data={[
                { x: 'Loss', y: lossPercent },
                { x: 'Win', y: winPercent },
                { x: 'None', y: 100 - (winPercent + lossPercent) },
              ]}
              height={180}
              width={180}
              innerRadius={64}
              labelComponent={<></>}
            />
          </Svg>
          <View style={styles.extraStatsContainer}>
            <StatsItem title={'W/L Streak'} value={streakValue} />
            <StatsItem title={'Last 10'} value={last10Value} />
            <View style={{ gap: hp(0.4) }}>
              <AgendaItem
                title={winCountValue}
                color={customTheme.colors.btnBg}
              />
              <AgendaItem
                title={losesCountValue}
                color={customTheme.colors.darkRed}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CoachDashboardStatisticalOverview;

const styles = StyleSheet.create({
  title: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_22,
  },
  scoreCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customTheme.colors.lightDark,
    borderRadius: wp(2),
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.2),
    justifyContent: 'space-around',
    marginTop: hp(2),
  },
  scoreItemContainer: { alignItems: 'center' },
  scoreItemScoreText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '700',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_24,
    lineHeight: 28,
  },
  scoreItemSubTitle: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '700',
    color: customTheme.colors.light + '50',
    marginTop: hp(0.5),
  },
  totalGamesContainer: {
    position: 'absolute',
    top: 58,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  totalGamesCount: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '300',
    fontSize: customTheme.fontSizes.size_20,
    color: customTheme.colors.light,
    marginTop: 3,
  },
  totalGamesText: {
    width: wp(10),
    fontSize: customTheme.fontSizes.size_11,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
    fontWeight: '700',
    textAlign: 'center',
  },
  chartSvg: { alignSelf: 'center' },
  extraStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(8),
  },
  statsItemContainer: { alignItems: 'center' },
  statsItemTitle: {
    color: customTheme.colors.compareRankColor,
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_12,
    fontFamily: customTheme.fontFamily.robotoRegular,
  },
  statsItemValue: {
    fontSize: customTheme.fontSizes.size_16,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
    fontWeight: '300',
    marginTop: hp(0.5),
  },
  agendaItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agedaItemIndicator: color => ({
    width: wp(7),
    height: 2,
    backgroundColor: color,
    marginRight: wp(2),
  }),
  agendaItemTitle: color => ({
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_16,
    color: color,
  }),
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_18,
    textAlign: 'center',
    marginVertical: hp(4),
  },
});
