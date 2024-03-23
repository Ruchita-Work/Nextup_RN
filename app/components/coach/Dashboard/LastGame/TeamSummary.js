import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import SideBySideBarGraph from '../../../../components/common/SideBySideBar';
import { Layout, Colors, Fonts, customTheme } from './../../../../constants';
import { hp, wp } from '../../../../utils/responsive';

const wide = Layout.width;

function TeamSummary({ data }) {
  const challengerInfo = data?.gameStats[0];
  const defenderInfo = data?.gameStats[0];

  const sideBySideChartInfo = data?.kpi?.map?.(i => ({
    name: i,
    value: [defenderInfo?.averageKpi?.[i], challengerInfo?.averageKpi?.[i]],
  }));

  return (
    <View>
      <Text style={styles.header}>Team Summary</Text>
      <View style={styles.arenaSection}>
        <FastImage
          source={{ uri: defenderInfo?.teamLogoUrl }}
          style={styles.teamLogo}
          resizeMode="contain"
        />
        <Text style={styles.arenaText}>Team Stats</Text>
        <FastImage
          source={{ uri: challengerInfo?.teamLogoUrl }}
          style={styles.teamLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.graphContainer}>
        <SideBySideBarGraph pgsData={sideBySideChartInfo || []} />
      </View>
    </View>
  );
}

export default TeamSummary;

const styles = StyleSheet.create({
  graphContainer: {
    marginTop: wide * 0.05,
    marginBottom: wide * 0.06,
  },
  header: {
    fontFamily: customTheme.fontFamily.robotoBold,
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_18,
    marginTop: hp(2),
    paddingHorizontal: customTheme.spacings.spacing_16,
    fontWeight: 'bold',
  },
  arenaSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: wide * 0.04,
    paddingHorizontal: wp(8),
  },
  arenaText: {
    color: Colors.light,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  teamLogo: {
    width: wide * 0.1,
    height: wide * 0.1,
  },
});
