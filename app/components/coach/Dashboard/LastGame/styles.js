import {StyleSheet} from 'react-native';
import {FontFamily, FontSize} from '../../../../views/GlobalStyles';
import {MyColors} from '../../../../constants/colors';
import {hp, wp} from '../../../../utils/responsive';

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.robotoRegular,
    fontWeight: '700',
    color: MyColors.light,
    fontSize: FontSize.size_3xl,
    marginTop: hp(1),
  },

  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  gameHeaderVSText: {
    fontFamily: FontFamily.robotoRegular,
    color: MyColors.light + '60',
  },

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
  gameHeaderTeamItemBadgeText: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.bodyLargeBold_size,
    color: MyColors.light,
  },
  gameHeaderTeamItemName: (color, isReverse) => ({
    fontWeight: '600',
    color: color,
    fontSize: FontSize.size_sm_3,
    flex: 1,
    textAlign: isReverse ? 'right' : 'left',
  }),

  lastGameScoreTable: {
    gap: hp(1),
    marginRight: wp(2),
    paddingRight: '5%',
  },
  lastGameScoreTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastGameScoreTableRowTitle: color => ({
    width: '30%',
    textAlign: 'center',
    paddingHorizontal: wp(1),
    color: color || MyColors.light,
    fontSize: FontSize.size_xs,
  }),
  lastGameScoreTableRowBody: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    // flex: 1,
  },
  lastGameScoreTableRowValue: color => ({
    textAlign: 'center',
    // width: wp(13.8),
    color: color || MyColors.light,
    fontFamily: FontFamily.robotoRegular,
    fontWeight: '600',
    fontSize: FontSize.size_xs,
  }),

  // GameDropdownButton
  gameDropdownButton: (color, isActive) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(1),
    backgroundColor: isActive ? color : MyColors.lightGray,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(6),
  }),
  gameDropdownButtonTitle: isActive => ({
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
    color: !isActive ? MyColors.light : MyColors.dark,
  }),
  gameDropdownButtonImage: isActive => ({
    height: wp(4),
    width: wp(4),
    tintColor: !isActive ? MyColors.light : MyColors.dark,
    marginHorizontal: wp(2),
  }),
});

export default styles;
