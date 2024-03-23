import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Layout } from './dimensions';

import { customTheme } from './theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Fonts } from './fonts';
let wide = Layout.width;
const STATUSBAR_HEIGHT = getStatusBarHeight();
export default StyleSheet.create({
  flex50: {
    flex: 0.5,
  },
  flex75: {
    flex: 0.75,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  width100: {
    width: '100%',
  },
  baseBg: {
    backgroundColor: customTheme.colors.base,
  },
  m5: {
    margin: 5,
  },
  mt3: {
    marginTop: 3,
  },
  mt10: {
    marginTop: 10,
  },
  mr10: {
    marginRight: 10,
  },
  mt5: {
    marginTop: 5,
  },
  mt20: {
    marginTop: 20,
  },
  mb3: {
    marginBottom: 3,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb50: {
    marginBottom: 50,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh20: {
    marginHorizontal: 20,
  },
  br15: {
    borderRadius: 15,
  },
  br10: {
    borderRadius: 10,
  },
  br5: {
    borderRadius: 5,
  },
  p10: {
    padding: 10,
  },
  p5: {
    padding: 5,
  },
  p8: {
    padding: 8,
  },
  p15: {
    padding: 15,
  },
  pt10: {
    paddingTop: 10,
  },
  pt5: {
    paddingTop: 5,
  },
  pl10: {
    paddingLeft: 10,
  },
  pb15: {
    paddingBottom: 15,
  },
  pb5: {
    paddingBottom: 5,
  },
  pr5: {
    paddingRight: 5,
  },
  pr10: {
    paddingRight: 10,
  },
  ph2: {
    paddingHorizontal: 2,
  },
  ph5: {
    paddingHorizontal: 5,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColAlignCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexDirRow: {
    flexDirection: 'row',
  },
  flexDirCol: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    padding: wide * 0.04,
  },
  appThemeBgContainer: {
    flex: 1,
  },
  chatBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  titleFont: {
    color: customTheme.colors.light,
    fontSize: 30,
    fontFamily: Fonts.Bold,
  },
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  noInternet: {
    position: 'absolute',
    bottom: 0,
    height: wide * 0.08,
    width: '100%',
    backgroundColor: customTheme.colors.base,
  },
  showinfo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 30,
    backgroundColor: customTheme.colors.base,
  },
  horizontalPadding: {
    paddingHorizontal: wide * 0.04,
  },
  horizontalMargin: {
    marginHorizontal: wide * 0.04,
  },
  verticalPadding: {
    paddingVertical: wide * 0.02,
  },
  verticalMargin: {
    marginVertical: wide * 0.02,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  large: {
    height: '80%',
    width: '80%',
  },
  medium: {
    height: '60%',
    width: '60%',
  },
  small: {
    height: '45%',
    width: '45%',
  },
  logo: {
    height: wide * 0.4,
    width: wide * 0.4,
  },
  rounded: {
    borderRadius: wide * 0.02,
  },
  topRounded: {
    borderTopLeftRadius: wide * 0.08,
    borderTopRightRadius: wide * 0.08,
  },
  leftRounded: {
    borderTopLeftRadius: wide * 0.02,
    borderBottomLeftRadius: wide * 0.02,
  },
  rightRounded: {
    borderTopRightRadius: wide * 0.02,
    borderBottomRightRadius: wide * 0.02,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: customTheme.colors.overlay,
  },
  boldText: {
    fontFamily: Fonts.Bold,
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: customTheme.colors.shade,
  },
  oynxBlueBorder: {
    borderWidth: 1,
    borderRadius: customTheme.spacings.spacing_28,
    borderColor: customTheme.colors.blue20,
  },
  bgGunMetal: {
    backgroundColor: customTheme.colors.darkGunMetal,
  },
  socialLoginButton: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: customTheme.colors.light,
  },
  btmborder: {
    marginVertical: 0,
    borderBottomWidth: 0.5,
    borderColor: customTheme.colors.shade,
  },
  verticalBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: customTheme.colors.shade,
  },
  hiddenbtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: wide * 0.2,
    borderWidth: 0.5,
    borderColor: customTheme.colors.shade,
    paddingHorizontal: wide * 0.03,
    backgroundColor: customTheme.colors.base,
    right: 0,
    marginVertical: wide * 0.02,
  },
  buttons: {
    backgroundColor: customTheme.colors.base,
    width: '50%',
    height: wide * 0.13,
    borderRadius: wide * 0.5,
    shadowColor: customTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.3,
    marginVertical: wide * 0.05,
  },
  label: {
    color: customTheme.colors.light,
    fontSize: 22,
    fontFamily: Fonts.Bold,
  },
  shadow: {
    shadowColor: customTheme.colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    elevation: 2,
    backgroundColor: customTheme.colors.light,
  },
  lightshadow: {
    shadowColor: customTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: customTheme.colors.light,
    elevation: 3,
  },
  topshadow: {
    shadowColor: customTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    backgroundColor: customTheme.colors.light,
    elevation: 24,
  },
  info: {
    color: customTheme.colors.base,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  inputContainer: {
    width: '80%',
    height: wide * 0.12,
    position: 'relative',
    borderColor: 'grey',
    borderRadius: wide * 0.1,
    justifyContent: 'center',
  },
  stickylabel: {
    position: 'absolute',
    top: -wide * 0.038,
    left: wide * 0.06,
    backgroundColor: customTheme.colors.light,
    marginVertical: 0,
  },
  input: {
    width: '70%',
    textAlignVertical: 'center',
    color: customTheme.colors.dark,
    height: '100%',
    fontFamily: Fonts.Regular,
  },
  listItem: {
    flexDirection: 'row',
    minHeight: wide * 0.15,
    backgroundColor: customTheme.colors.light,
    paddingVertical: wide * 0.02,
    marginVertical: wide * 0.02,
  },
  text: {
    fontSize: 16,
    color: customTheme.colors.grey,
    lineHeight: wide * 0.05,
    fontFamily: Fonts.Regular,
  },
  title: {
    fontSize: 18,
    color: customTheme.colors.darkshade,
    lineHeight: wide * 0.06,
    maxWidth: '80%',
    fontFamily: Fonts.Regular,
  },
  icon: {
    height: wide * 0.25,
    width: wide * 0.25,
    marginHorizontal: 10,
  },
  profilepic: {
    borderRadius: 10,
    alignSelf: 'center',
    height: wide * 0.3,
    width: wide * 0.3,
    marginVertical: wide * 0.05,
    position: 'relative',
  },
  img: {
    borderRadius: 10,
    height: wide * 0.25,
    width: wide * 0.25,
  },
  cameraicon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  midSizeLogo: {
    height: 35,
    width: 35,
  },
  normalSizeLogo: {
    height: 30,
    width: 30,
  },
  container: {
    flex: 1,
    padding: wide * 0.04,
    backgroundColor: customTheme.colors.light,
  },
  chatBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  noInternet: {
    position: 'absolute',
    bottom: 0,
    height: wide * 0.08,
    width: '100%',
    backgroundColor: customTheme.colors.base,
  },
  showinfo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 30,
    backgroundColor: customTheme.colors.base,
  },
  horizontalPadding: {
    paddingHorizontal: wide * 0.04,
  },
  horizontalMargin: {
    marginHorizontal: wide * 0.04,
  },
  verticalPadding: {
    paddingVertical: wide * 0.02,
  },
  verticalMargin: {
    marginVertical: wide * 0.02,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  large: {
    height: '80%',
    width: '80%',
  },
  medium: {
    height: '60%',
    width: '60%',
  },
  small: {
    height: '45%',
    width: '45%',
  },
  logo: {
    height: wide * 0.4,
    width: wide * 0.4,
  },
  rounded: {
    borderRadius: wide * 0.02,
  },
  topRounded: {
    borderTopLeftRadius: wide * 0.08,
    borderTopRightRadius: wide * 0.08,
  },
  leftRounded: {
    borderTopLeftRadius: wide * 0.02,
    borderBottomLeftRadius: wide * 0.02,
  },
  rightRounded: {
    borderTopRightRadius: wide * 0.02,
    borderBottomRightRadius: wide * 0.02,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: customTheme.colors.overlay,
  },
  boldText: {
    fontFamily: Fonts.Bold,
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: customTheme.colors.shade,
  },
  btmborder: {
    marginVertical: 0,
    borderBottomWidth: 0.5,
    borderColor: customTheme.colors.shade,
  },
  verticalBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: customTheme.colors.shade,
  },
  hiddenbtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: wide * 0.2,
    borderWidth: 0.5,
    borderColor: customTheme.colors.shade,
    paddingHorizontal: wide * 0.03,
    backgroundColor: customTheme.colors.base,
    right: 0,
    marginVertical: wide * 0.02,
  },
  buttons: {
    backgroundColor: customTheme.colors.base,
    width: '50%',
    height: wide * 0.13,
    borderRadius: wide * 0.5,
    shadowColor: customTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.3,
    marginVertical: wide * 0.05,
  },
  label: {
    color: customTheme.colors.light,
    fontSize: 22,
    fontFamily: Fonts.Bold,
  },
  shadow: {
    shadowColor: customTheme.colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    elevation: 2,
    backgroundColor: customTheme.colors.light,
  },
  lightshadow: {
    shadowColor: customTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: customTheme.colors.light,
    elevation: 3,
  },
  topshadow: {
    shadowColor: customTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    backgroundColor: customTheme.colors.light,
    elevation: 24,
  },
  info: {
    color: customTheme.colors.base,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  inputContainer: {
    width: '80%',
    height: wide * 0.12,
    position: 'relative',
    borderColor: 'grey',
    borderRadius: wide * 0.1,
    justifyContent: 'center',
  },
  stickylabel: {
    position: 'absolute',
    top: -wide * 0.038,
    left: wide * 0.06,
    backgroundColor: customTheme.colors.light,
    marginVertical: 0,
  },
  input: {
    width: '70%',
    textAlignVertical: 'center',
    color: customTheme.colors.dark,
    height: '100%',
    fontFamily: Fonts.Regular,
  },
  listItem: {
    flexDirection: 'row',
    minHeight: wide * 0.15,
    backgroundColor: customTheme.colors.light,
    paddingVertical: wide * 0.02,
    marginVertical: wide * 0.02,
  },
  text: {
    fontSize: 16,
    color: customTheme.colors.grey,
    lineHeight: wide * 0.05,
    fontFamily: Fonts.Regular,
  },
  title: {
    fontSize: 18,
    color: customTheme.colors.darkshade,
    lineHeight: wide * 0.06,
    maxWidth: '80%',
    fontFamily: Fonts.Regular,
  },
  icon: {
    height: wide * 0.25,
    width: wide * 0.25,
    marginHorizontal: 10,
  },
  profilepic: {
    borderRadius: 10,
    alignSelf: 'center',
    height: wide * 0.3,
    width: wide * 0.3,
    marginVertical: wide * 0.05,
    position: 'relative',
  },
  img: {
    borderRadius: 10,
    height: wide * 0.25,
    width: wide * 0.25,
  },
  cameraicon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  headerBottomLine: {
    borderBottomWidth: 0.4,
    borderBottomColor: customTheme.colors.newGrayFontColor,
  },
  midSizeLogo: {
    height: 35,
    width: 35,
  },
  normalSizeLogo: {
    height: 30,
    width: 30,
  },
});
