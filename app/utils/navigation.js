import { Colors, Fonts, customTheme } from '../constants';
import { TransitionPresets } from 'react-navigation-stack';
export const Header = () => ({
  headerStyle: {
    backgroundColor: customTheme.colors.light,
  },
  headerBackTitle: null,
  headerTintColor: customTheme.colors.base,
  headerTitleStyle: {
    color: customTheme.colors.base,
    fontSize: 20,
    fontFamily: Fonts.Bold,
  },
});

// gets the current screen from navigation state
export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

export const defaultNavigationOptions = {
  headerMode: 'screen',
  headerStatusBarHeight: 0,
  header: null,
  ...TransitionPresets.SlideFromRightIOS,
};
