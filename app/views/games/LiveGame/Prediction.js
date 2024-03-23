import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { Colors } from '../../../constants';
import PieChart from '../../../components/games/LiveGame/PieChart';
import { MyColors } from '../../../constants/colors';
import { FontSize } from '../../GlobalStyles';
import { LiveGameContext } from '.';

function TeamItem({ score, image }) {
  return (
    <View style={styles.teamItem}>
      <Text style={styles.whiteText}>{score}</Text>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
}

export default function Prediction() {
  const { data } = useContext(LiveGameContext);
  const defenderPrediction = +(data?.predictionDefender || '0');
  const challengerPrediction = +(data?.predictionChallenger || '0');

  const firstDefenderNameSegment = (data?.defenderTeamInfo?.name || '').split(
    ' ',
  )[0];
  const firstChallengerNameSegment = (
    data?.challengerTeamInfo?.name || ''
  ).split(' ')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediction</Text>
      <PieChart
        score2={challengerPrediction}
        score1={defenderPrediction}
        outerRadius={wp(21)}
        innerRadius={wp(20)}
        color1={Colors.darkRed}
        color2={Colors.darkYellow}>
        <View style={[styles.horizontalRow, { maxWidth: wp(40) }]}>
          <Text
            numberOfLines={1}
            style={[styles.whiteText, { fontSize: 14, maxWidth: wp(19) }]}>
            {firstDefenderNameSegment.toUpperCase()}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.grayText, { fontSize: 14, maxWidth: wp(19) }]}>
            {firstChallengerNameSegment.toUpperCase()}
          </Text>
        </View>
      </PieChart>
      <View
        style={[styles.horizontalRow, styles.stretch, { marginTop: hp(1) }]}>
        <TeamItem
          image={{ uri: data?.defenderTeamInfo?.logoUrl }}
          score={`${defenderPrediction}%`}
        />
        <TeamItem
          image={{ uri: data?.challengerTeamInfo?.logoUrl }}
          score={`${challengerPrediction}%`}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 'auto',
    marginVertical: hp(2),
    paddingHorizontal: wp(2),
    paddingTop: hp(3),
    paddingBottom: hp(2),
    backgroundColor: Colors.playerCategoryBg,
    borderRadius: wp(2),
    alignItems: 'center',
  },
  title: {
    color: MyColors.light,
    fontSize: FontSize.size_mini,
    marginBottom: hp(2),
  },
  whiteText: {
    color: MyColors.light,
    fontSize: FontSize.size_mini,
  },
  grayText: {
    color: MyColors.overlayWhite,
    fontSize: FontSize.size_mini,
  },
  horizontalRow: {
    flexDirection: 'row',
    gap: wp(2),
  },
  stretch: {
    width: '100%',
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp(7),
  },
  imageWrapper: {
    height: wp(12.5),
    width: wp(12.5),
    alignItems: 'center',
    borderRadius: wp(7),
    justifyContent: 'center',
    backgroundColor: Colors.light,
  },
  teamItem: {
    alignItems: 'center',
    gap: hp(1),
  },
});
