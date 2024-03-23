import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Image, ProgressBar, Text, View } from 'react-native-ui-lib';
import { Colors, Fonts } from '../../../constants';
import { FontSize } from '../../GlobalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hp, wp } from '../../../utils/responsive';
import PieChart from '../../../components/games/LiveGame/PieChart';
import { LiveGameContext } from '.';

function GameTable() {
  const { data } = useContext(LiveGameContext);

  const defenderImageUri = data?.defenderTeamInfo?.logoUrl;
  const challengerImageUri = data?.challengerTeamInfo?.logoUrl;

  const defenderScoreData = data?.defenderQuarterWiseBoxScore;
  const challengerScoreData = data?.challengerQuarterWiseBoxScore;

  return (
    <View style={styles.gameTableContainer}>
      <View style={{ width: '20%', rowGap: hp(2.2) }}>
        <Image
          style={styles.gameTableLeftImage}
          source={{ uri: defenderImageUri }}
        />
        <Image
          style={styles.gameTableLeftImage}
          source={{ uri: challengerImageUri }}
        />
      </View>

      <View style={{ width: '76%' }}>
        <View style={[styles.gameTableHeaderContent, { marginTop: wp(1) }]}>
          <Text style={styles.gameTableHeaderTitle}>Q1</Text>
          <Text style={styles.gameTableHeaderTitle}>Q2</Text>
          <Text style={styles.gameTableHeaderTitle}>Q3</Text>
          <Text style={styles.gameTableHeaderTitle}>Total</Text>
        </View>

        <View style={styles.gameTableRow}>
          <View
            style={[
              styles.gameTableHeaderContent,
              { borderBottomWidth: 0, left: wp(1), top: hp(0.3) },
            ]}>
            <Text style={styles.gameTableHeaderTitle}>
              {defenderScoreData?.QUARTER_1 || '0'}
            </Text>
            <Text style={styles.gameTableHeaderTitle}>
              {defenderScoreData?.QUARTER_2 || '0'}
            </Text>
            <Text style={styles.gameTableHeaderTitle}>
              {defenderScoreData?.QUARTER_3 || '0'}
            </Text>
            <Text style={styles.gameTableHeaderTitle}>
              {defenderScoreData?.Final || '0'}
            </Text>
          </View>
        </View>

        <View style={[styles.gameTableRow, { marginBottom: hp(1) }]}>
          <View
            style={[
              styles.gameTableHeaderContent,
              { borderBottomWidth: 0, left: wp(1), top: hp(1) },
            ]}>
            <Text style={styles.gameTableHeaderTitle}>
              {challengerScoreData?.QUARTER_1 || '0'}
            </Text>
            <Text style={styles.gameTableHeaderTitle}>
              {challengerScoreData?.QUARTER_2 || '0'}
            </Text>
            <Text style={styles.gameTableHeaderTitle}>
              {challengerScoreData?.QUARTER_3 || '0'}
            </Text>
            <Text style={styles.gameTableHeaderTitle}>
              {challengerScoreData?.Final || '0'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function GameDetails() {
  const { data } = useContext(LiveGameContext);

  const defenderGamePoints = data?.defenderGamePoints;
  const challengerGamePoints = data?.challengerGamePoints;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>
            2 points
          </Text>

          <View
            style={{
              marginTop: wp(3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#CE1141',
                fontSize: 14,
                fontWeight: '400',
                marginRight: wp(2),
              }}>
              {defenderGamePoints?.twoPoints || '0'}
            </Text>
            <PieChart
              innerRadius={20}
              outerRadius={21}
              score1={defenderGamePoints?.twoPoints || 0}
              score2={challengerGamePoints?.twoPoints || 0}
              color1={'#FDB927'}
              color2={'#CE1141'}
            />

            <Text
              style={{
                color: '#FDB927',
                fontSize: 14,
                fontWeight: '400',
                marginLeft: wp(2),
              }}>
              {challengerGamePoints?.twoPoints || '0'}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>
            3 points
          </Text>

          <View
            style={{
              marginTop: wp(3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#CE1141',
                fontSize: 14,
                fontWeight: '400',
                marginRight: wp(2),
              }}>
              {defenderGamePoints?.threePoints || '0'}
            </Text>
            <PieChart
              innerRadius={20}
              outerRadius={21}
              score1={defenderGamePoints?.threePoints || 0}
              score2={challengerGamePoints?.threePoints || 0}
              color1={'#FDB927'}
              color2={'#CE1141'}
            />

            <Text
              style={{
                color: '#FDB927',
                fontSize: 14,
                fontWeight: '400',
                marginLeft: wp(2),
              }}>
              {challengerGamePoints?.threePoints || '0'}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>
            Free throws
          </Text>

          <View
            style={{
              marginTop: wp(3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#CE1141',
                fontSize: 14,
                fontWeight: '400',
                marginRight: wp(2),
              }}>
              {defenderGamePoints?.freeThrows || '0'}
            </Text>
            <PieChart
              innerRadius={20}
              outerRadius={21}
              score1={defenderGamePoints?.freeThrows || 0}
              score2={challengerGamePoints?.freeThrows || 0}
              color1={'#FDB927'}
              color2={'#CE1141'}
            />

            <Text
              style={{
                color: '#FDB927',
                fontSize: 14,
                fontWeight: '400',
                marginLeft: wp(2),
              }}>
              {challengerGamePoints?.freeThrows || '0'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(0.5) }}>
        <Text style={styles.subtitle}>Rebounds</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(0.5),
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity
            style={[styles.progressInfo, styles.progressInfoBtn]}>
            <Text
              style={{ fontSize: 10, fontWeight: '500', color: Colors.light }}>
              Foul
            </Text>
          </TouchableOpacity> */}

          <Text style={styles.scoreText}>
            {defenderGamePoints?.rebounds || '0'}
          </Text>

          <ProgressBar
            style={styles.progress}
            fullWidth
            progressColor={Colors.light}
            progress={defenderGamePoints?.rebounds || 0}
          />

          <ProgressBar
            style={[styles.progress, styles.reverse]}
            fullWidth
            progressColor={Colors.light}
            progress={challengerGamePoints?.rebounds || 0}
          />

          <Text style={styles.scoreText}>
            {challengerGamePoints?.rebounds || '0'}
          </Text>

          {/* <TouchableOpacity
            style={[styles.progressInfo, styles.progressInfoBtn]}>
            <Text style={styles.infoText}>Foul</Text>
          </TouchableOpacity> */}
        </View>

        <Text style={styles.subtitle}>Turnovers</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(0.5),
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {/* <View style={styles.progressInfo}>
            <Text style={styles.scoreText}>0</Text>
          </View> */}

          <Text style={styles.scoreText}>
            {defenderGamePoints?.turnOvers || '0'}
          </Text>

          <ProgressBar
            style={styles.progress}
            fullWidth
            progressColor={Colors.light}
            progress={defenderGamePoints?.turnOvers || 0}
          />
          <ProgressBar
            style={[styles.progress, styles.reverse]}
            fullWidth
            progressColor={Colors.light}
            progress={challengerGamePoints?.turnOvers || 0}
          />

          <Text style={styles.scoreText}>
            {challengerGamePoints?.turnOvers || '0'}
          </Text>

          {/* <View style={styles.progressInfo}>
            <Text style={styles.scoreText}>0</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}

export default function GameStat({ title }) {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <GameTable />
      <GameDetails />
    </View>
  );
}
const styles = StyleSheet.create({
  gameTableLeftImage: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(4),
    marginLeft: wp(6),
  },
  gameTableLeftImageContainer: {
    width: '25%',
    alignSelf: 'center',
  },
  gameTableRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(2),
  },
  gameTableHeaderTitle: {
    color: Colors.light,
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
    width: '16%',
    textAlign: 'center',
  },
  gameTableHeaderContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomColor: '#6B6E74',
    borderBottomWidth: 1,
    paddingBottom: hp(1),
    paddingTop: hp(0.5),
    marginLeft: 'auto',
  },
  gameTableHeaderSpace: {
    width: '20%',
    alignSelf: 'center',
  },
  gameTableHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(1),
  },
  gameTableContainer: {
    backgroundColor: 'rgba(34,37,46,1)',
    width: '100%',
    borderRadius: wp(2.5),
    marginTop: wp(4),
    paddingVertical: hp(0.25),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: hp(2),
    paddingTop: hp(1),
  },
  header: {
    color: Colors.light,
    fontSize: FontSize.size_3xl,
    fontWeight: '600',
  },
  progress: {
    width: wp(30),
    backgroundColor: Colors.foulBarColor,
  },
  reverse: { transform: [{ rotateY: '180deg' }] },
  progressInfo: { width: wp(7), alignItems: 'center' },
  progressInfoBtn: {
    backgroundColor: '#FF2D2D',
    padding: 5,
    borderRadius: 5,
  },
  scoreText: {
    color: Colors.light,
    fontSize: 12,
    fontWeight: '400',
  },
  infoText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.light,
  },
  subtitle: {
    color: '#BDBEC0',
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: '500',
    marginTop: hp(1.5),
  },
  container: {
    backgroundColor: Colors.playerCategoryBg,
    justifyContent: 'space-around',
    borderRadius: 14,
    marginTop: wp(4),
    paddingVertical: wp(4),
    paddingHorizontal: wp(2),
  },
});
