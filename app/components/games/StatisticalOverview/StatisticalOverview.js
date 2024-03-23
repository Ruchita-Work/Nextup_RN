import { Text, View } from 'react-native';
import React from 'react';
import { Dash } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
import styles from './styles';
import ScoreItem from './ScoreItem';
import StatsItem from './StatsItem';
import AgendaItem from './AgendaItem';
import { customTheme } from '../../../constants';
import { round } from 'lodash';

const StatisticalOverview = ({ data }) => {
  const homeRecordScore = data?.gameStatisticalView?.homeRecord || 0;

  const awayRecordScore = data?.gameStatisticalView?.awayRecord || 0;

  const leaderBoardTeamInfo = data?.leaderBoardTeamInfo;

  const streakValue = leaderBoardTeamInfo?.streak
    ? `${leaderBoardTeamInfo?.streak}`
    : '-';

  const last10Value = leaderBoardTeamInfo?.last10 || '-';

  const winCount = leaderBoardTeamInfo?.wins || 0;
  const lossCount = leaderBoardTeamInfo?.loss || 0;

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
    <View>
      <Text style={styles.title}>Statistical Overview</Text>
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
          <AgendaItem title={winCountValue} color={customTheme.colors.btnBg} />
          <AgendaItem
            title={losesCountValue}
            color={customTheme.colors.darkRed}
          />
        </View>
      </View>
    </View>
  );
};

export default StatisticalOverview;
