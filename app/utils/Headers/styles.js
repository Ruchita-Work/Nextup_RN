import { StyleSheet, Platform } from 'react-native';
import { Layout, Colors, Fonts, customTheme } from '../../constants';
const wide = Layout.width;
export default StyleSheet.create({
  container: {
    width: '100%',
    height: wide * 0.15,
    backgroundColor: customTheme.colors.light,
    elevation: 4,
    borderBottomWidth: 0.5,
    borderColor: customTheme.colors.shade,
    marginTop: 0,
  },
  subCont: {
    flex: 1,
    backgroundColor: customTheme.colors.light,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  titleContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingHorizontal: wide * 0.04,
    alignItems: Platform.OS == 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: customTheme.colors.base,
    fontFamily: Fonts.SemiBold,
    lineHeight: 25,
  },
  subTitle: {
    fontSize: 14,
    color: customTheme.colors.base,
    fontFamily: Fonts.Regular,
  },
  label: {
    color: customTheme.colors.base,
    fontSize: 20,
    fontFamily: Fonts.SemiBold,
    paddingVertical: 0,
    paddingHorizontal: 20,
    lineHeight: 40,
  },
});
