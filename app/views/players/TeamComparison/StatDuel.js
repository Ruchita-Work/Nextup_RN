import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Color, FontFamily, FontSize } from '../../GlobalStyles';
import { Colors, Fonts } from '../../../constants';
import FastImage from 'react-native-fast-image';
import DuelChart from '../../../components/common/DuelGraph';
import { hp, wp } from '../../../utils/responsive';
import CommonDropdown from '../../../components/common/CommonDropdown';

function Bullet({ color, size }) {
  return (
    <View
      style={{
        backgroundColor: color,
        height: size,
        width: size,
        margin: size / 2,
        borderRadius: size / 2,
      }}
    />
  );
}

function DuelCard({
  defenderTeamName,
  defenderTeamLocation,
  defenderTeamLogo,
  defenderColor,
  challengerTeamName,
  challengerTeamLogo,
  challengerTeamLocation,
  challengerColor,
}) {
  return (
    <View style={styles.duelCardWrapper}>
      <View style={styles.duelCardItem}>
        <Bullet size={8} color={defenderColor} />
        <FastImage
          style={styles.duelCardImg}
          resizeMode={'contain'}
          source={defenderTeamLogo}
        />
        <View style={{ marginLeft: wp(1) }}>
          <Text style={styles.duelCardTeamLocationText}>
            {defenderTeamLocation}
          </Text>
          <Text style={styles.duelCardTeamNameText}>{defenderTeamName}</Text>
        </View>
      </View>
      <View style={styles.duelCardItem}>
        <Bullet size={8} color={challengerColor} />
        <FastImage
          style={styles.duelCardImg}
          resizeMode={'contain'}
          source={challengerTeamLogo}
        />
        <View style={{ marginLeft: wp(1) }}>
          <Text style={styles.duelCardTeamLocationText}>
            {challengerTeamLocation}
          </Text>
          <Text style={styles.duelCardTeamNameText}>{challengerTeamName}</Text>
        </View>
      </View>
    </View>
  );
}

export default function StatDuel({ data }) {
  const [selectedDuelFilter, setSelectedDuelFilter] = useState(
    data?.graphCompareDropdown?.[0] || '',
  );

  const homeTeamLast = {
    defenderTeamLogo: require('../../../assets/images/dummyTeamLogo.png'),
    defenderTeamName: 'Bulls',
    defenderColor: '#246BFD',
    defenderTeamLocation: 'Chicago',
    challengerTeamLogo: require('../../../assets/images/dummyTeamLogo1.png'),
    challengerTeamName: 'Lakers',
    challengerTeamLocation: 'Ros Angeles',
    challengerColor: '#27DC70',
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stat Duel</Text>
        {!!data?.graphCompareDropdown?.length && (
          <CommonDropdown
            items={data?.graphCompareDropdown}
            value={selectedDuelFilter}
            onSelectItem={setSelectedDuelFilter}
          />
        )}
      </View>
      <DuelCard {...homeTeamLast} />
      <DuelChart
        graphSize={wp(80)}
        scaleCount={5}
        xthreshold={wp(5)}
        ythreshold={20}
        numberInterval={2}
        data={[
          {
            AST: 26.3,
            RPG: 48.6,
            STL: 5.4,
            BPG: 7.5,
            FG: 47.3,
            PTS: 115.8,
          },
          {
            AST: 30.2,
            RPG: 20.6,
            STL: 5.2,
            BPG: 10.2,
            FG: 40.3,
            PTS: 110.25,
          },
        ]}
        options={{
          graphShape: 1,
          showAxis: false,
          showIndicator: false,
          colorList: ['#27DC70', '#246BFD'],
          dotList: [false, false],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  duelCardWrapper: {
    marginTop: hp(2.2),
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  duelCardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  duelCardImg: {
    width: 50,
    height: 50,
  },
  duelCardTeamLocationText: {
    color: Colors.light,
    fontSize: 12,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
    lineHeight: 15,
  },
  duelCardTeamNameText: {
    color: Colors.light,
    fontSize: 12,
    fontFamily: Fonts.Bold,
    fontWeight: '700',
    lineHeight: 15,
  },
  container: {
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: FontSize.size_3xl,
    color: Color.othersWhite,
    lineHeight: 22,
    textAlign: 'left',
    fontFamily: FontFamily.robotoBold,
    fontWeight: '600',
  },
});
