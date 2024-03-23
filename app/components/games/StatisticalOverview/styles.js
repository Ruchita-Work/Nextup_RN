import { StyleSheet } from 'react-native';
import { customTheme } from '../../../constants';
import { hp, wp } from '../../../utils/responsive';

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
});

export default styles;
