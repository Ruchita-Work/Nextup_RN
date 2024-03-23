import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StatsBoxItem from '../common/StatsBoxItem';
import { hp, wp } from '../../utils/responsive';
import { customTheme } from '../../constants';

const CoachViewPlayerDetailsStatsTab = ({
  stats,
  scrollContentContainerStyle,
}) => {
  const statsList = Object.keys(stats || {});

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={scrollContentContainerStyle}>
      <View style={styles.statsContainer}>
        {statsList.map(item => (
          <StatsBoxItem
            title={stats?.[item] || '0'}
            subtitle={item}
            style={styles.statItem}
            titleStyle={styles.statItemTitle}
            subtitleStyle={styles.statItemSubTitle}
          />
        ))}
        {statsList.length > 1 && <View style={styles.firstDash} />}
        {statsList.length > 2 && <View style={styles.secondDash} />}
      </View>
      {/* <TouchableOpacity style={styles.viewMore} activeOpacity={0.7}>
        <Text regular-400 style={styles.viewMoreText}>
          View More
        </Text>
        <Image source={appImages.dropdown} style={styles.dropdown} />
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default CoachViewPlayerDetailsStatsTab;

const styles = StyleSheet.create({
  statsContainer: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    flexWrap: 'wrap',
    rowGap: hp(2),
    columnGap: wp(4),
  },
  statsVerticalContainer: {
    justifyContent: 'space-between',
    height: '100%',
  },
  statItemTitle: {
    fontSize: customTheme.fontSizes.size_40,
    fontWeight: '700',
    fontFamily: customTheme.fontFamily.robotoBold,
  },
  statItemSubTitle: {
    color: customTheme.colors.light + '90',
    fontFamily: customTheme.fontFamily.robotoRegular,
  },
  statItem: {
    paddingVertical: 0,
    width: wp(20),
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(1),
    alignSelf: 'center',
    marginTop: hp(3),
  },
  viewMoreText: {
    textDecorationLine: 'underline',
    color: customTheme.colors.light + '80',
  },
  dropdown: {
    height: wp(4),
    width: wp(4),
    tintColor: customTheme.colors.light + '80',
  },
  firstDash: {
    height: '75%',
    position: 'absolute',
    width: 1,
    backgroundColor: customTheme.colors.light + '30',
    left: '36%',
  },
  secondDash: {
    height: '75%',
    position: 'absolute',
    width: 1,
    backgroundColor: customTheme.colors.light + '30',
    left: '74%',
  },
});
