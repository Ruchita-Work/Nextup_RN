import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import { Colors } from '../../../constants';
import { FontSize } from '../../../views/GlobalStyles';
import FastImage from 'react-native-fast-image';
import { hp, wp } from '../../../utils/responsive';
import { LiveGameContext } from '../../../views/games/LiveGame';

function TeamCard({ score, name, logoImg }) {
  return (
    <View style={[styles.verticalRow, styles.gap10]}>
      <View style={styles.eventItemTeamContainer}>
        <View style={styles.eventItemTeamInnerContainer}>
          <FastImage source={logoImg} style={styles.image} />
        </View>
      </View>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamScore}>{score}</Text>
    </View>
  );
}

export default function VSCard1({ title }) {
  const { data } = useContext(LiveGameContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.horizentalRow}>
        <View style={styles.sideItem}>
          <TeamCard
            name={data?.defenderTeamInfo?.name}
            logoImg={{ uri: data?.defenderTeamInfo?.logoUrl }}
            score={`${data?.defenderTeamInfo?.wins}-${data?.defenderTeamInfo?.loss}`}
          />
        </View>
        <View style={styles.centerItem}>
          <Image
            style={styles.vsImage}
            source={require('../../../assets/mask-group.png')}
          />
        </View>
        <View style={styles.sideItem}>
          <TeamCard
            name={data?.challengerTeamInfo?.name}
            score={`${data?.challengerTeamInfo?.wins}-${data?.challengerTeamInfo?.loss}`}
            logoImg={{ uri: data?.challengerTeamInfo?.logoUrl }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: hp(1),
    marginBottom: hp(2),
  },
  verticalRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizentalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gap10: {
    gap: 10,
  },
  teamName: {
    color: Colors.light,
    fontSize: FontSize.size_mini,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: wp(2),
  },
  teamScore: {
    color: Colors.light,
    fontSize: FontSize.bodyMediumSemibold_size,
  },
  centerItem: {
    // width: '20%',
  },
  sideItem: {
    width: '35%',
    alignItems: 'center',
  },
  vsImage: {
    height: 60,
    transform: [{ translateY: hp(-1) }],
  },
  title: {
    color: Colors.white_08,
    fontSize: 14,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: wp(20),
  },
  eventItemTeamContainer: {
    borderWidth: 3,
    borderColor: Colors.white_08,
    borderRadius: wp(10),
    height: 60,
    width: 60,
  },
  eventItemTeamInnerContainer: {
    borderRadius: wp(10),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
