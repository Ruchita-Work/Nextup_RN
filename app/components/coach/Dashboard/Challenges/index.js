import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontFamily, FontSize } from '../../../../views/GlobalStyles';
import { MyColors } from '../../../../constants/colors';
import { SectionHeader } from '../../../common/SectionHeader';

import Challenge from './ChallengeCard';
import cardBgImg from './../../../../assets/frame1000003182.png';
import { customTheme } from '../../../../constants';
import { hp } from '../../../../utils/responsive';

const avatarImgs = [
  require('../../../../assets/ellipse-691.png'),
  require('../../../../assets/ellipse-7566.png'),
  require('../../../../assets/ellipse-7572.png'),
];

export default function Challenges({ data = [] }) {
  return (
    <View style={styles.containerStyle}>
      <SectionHeader
        title={'AI Driven Challenges'}
        textStyle={styles.headerText}
        onPressSeeAll={() => {
          // TODO : Calendar Integration
        }}
      />

      {!!(!data || !data?.length) && (
        <Text style={styles.noDataText}>No data available</Text>
      )}

      {!!data &&
        data.map((_, index) => (
          <Challenge
            key={`coach-challenges-${index}`}
            backgroundImage={cardBgImg}
            dueTime=""
            avatarImgs={avatarImgs}
            variant="small"
          />
        ))}

      {/* <ActiveChallenges avatarUrls={avatarUrls} />
      <CompletedChallenges playerScores={playerScores} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FontFamily.robotoRegular,
    fontWeight: '700',
    color: MyColors.light,
    fontSize: FontSize.size_3xl,
  },
  containerStyle: {
    width: '92%',
    alignSelf: 'center',
  },
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
    textAlign: 'center',
    marginVertical: hp(2),
  },
});
