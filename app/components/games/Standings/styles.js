import { customTheme } from '../../../constants';
import { hp, wp } from '../../../utils/responsive';

const { StyleSheet } = require('react-native');

const getCellWidthByIndex = index => {
  if (index === 0) {
    return '5%';
  }
  if (index === 1) {
    return '45%';
  }
  return '10%';
};

const styles = StyleSheet.create({
  title: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '700',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  headerSeeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSeeAllText: {
    color: customTheme.colors.light + '70',
    textDecorationLine: 'underline',
  },
  dropdownImage: { height: wp(4), width: wp(4), marginLeft: wp(1) },

  // TableHeader
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(1),
    borderBottomColor: customTheme.colors.midnight_blue,
    borderBottomWidth: 1,
    paddingBottom: hp(1),
    paddingHorizontal: wp(1),
  },
  headerText: index => ({
    color: customTheme.colors.light,
    fontFamily: customTheme.fontFamily.robotoRegular,
    width: getCellWidthByIndex(index),
    textAlign: 'center',
    paddingHorizontal: wp(1),
  }),

  // TableBody
  tableBody: { gap: hp(1) },
  tableBodyRow: index => ({
    backgroundColor:
      index >= 5
        ? customTheme.colors.midnight_black
        : index >= 3
        ? customTheme.colors.maroon_brown
        : customTheme.colors.navy_blue,
    borderRadius: wp(2.5),
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(1),
  }),
  tableBodyCellValue: (color, index) => ({
    fontWeight: '700',
    fontFamily: customTheme.fontFamily.robotoRegular,
    textAlign: index === 1 ? 'left' : 'center',
    paddingHorizontal: wp(1),
    width: index !== undefined ? getCellWidthByIndex(index) : undefined,
    color: color || customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_13,
  }),
  tableBodyCellFlag: {
    height: wp(5),
    width: wp(5),
    marginHorizontal: wp(1),
  },
  tableBodyNameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    paddingRight: '6%',
  },
});

export default styles;
