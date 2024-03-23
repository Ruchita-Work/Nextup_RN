import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';

const styles = StyleSheet.create({
  title: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '700',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
    marginTop: hp(3),
  },

  // GameHeader
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  gameHeaderVSText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light + '60',
  },

  //GameHeaderTeamItem
  gameHeaderTeamItem: isReverse => ({
    flexDirection: isReverse ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: wp(2),
    width: wp(40),
  }),
  gameHeaderTeamItemBadge: color => ({
    height: wp(9.5),
    width: wp(9.5),
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
  }),
  gameHeaderTeamItemName: (color, isReverse) => ({
    color: color,
    flex: 1,
    textAlign: isReverse ? 'right' : 'left',
  }),
  gameHeaderTeamItemNameContainer: {
    justifyContent: 'center',
  },
  gameHeaderTeamItemSubTitle: (color, isReverse) => ({
    color: color,
    textAlign: isReverse ? 'right' : 'left',
  }),

  // /LastGameScoreTable
  lastGameScoreTable: {
    gap: hp(1),
    marginTop: hp(2),
  },
  lastGameScoreTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastGameScoreTableRowTitle: color => ({
    width: wp(25),
    textAlign: 'center',
    paddingHorizontal: wp(1),
    color: color || customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_12,
  }),
  lastGameScoreTableRowBody: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lastGameScoreTableRowValue: color => ({
    textAlign: 'center',
    width: wp(17.8),
    color: color || customTheme.colors.light,
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_12,
  }),

  // GameDropdownButton
  gameDropdownButton: (color, isActive) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(1),
    backgroundColor: isActive ? color : customTheme.colors.lightGray,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  }),
  gameDropdownButtonTitle: isActive => ({
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontSize: customTheme.fontSizes.size_12,
    color: !isActive ? customTheme.colors.light : customTheme.colors.dark,
    flex: 1,
    textAlign: 'center',
  }),
  gameDropdownButtonImage: isActive => ({
    height: wp(4),
    width: wp(4),
    tintColor: !isActive ? customTheme.colors.light : customTheme.colors.dark,
    marginRight: wp(2),
  }),
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_18,
    textAlign: 'center',
    marginVertical: hp(4),
  },
});

export default styles;
