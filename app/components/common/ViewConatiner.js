import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { customTheme } from '../../constants';
import { View } from 'react-native-ui-lib';
import { isX } from '../../utils/responsive';
import { ScreenHeader } from './ScreenHeader';

export const statusBarHeight =
  StatusBar.currentHeight * customTheme.spacings.spacing_8 ||
  (Platform.OS === 'ios'
    ? isX
      ? customTheme.spacings.spacing_48
      : customTheme.spacings.spacing_48
    : customTheme.spacings.spacing_48);

export const ViewContainer = ({
  headerTilte,
  isView = true,
  includeStatusBar = true,
  ...props
}) => {
  // Default values for iOS and Android
  return (
    <>
      {includeStatusBar && (
        <View
          backgroundColor={customTheme.colors.light.background}
          width={'100%'}
          height={
            Platform.select({ default: statusBarHeight, android: 0 }) +
            customTheme.spacings.spacing_12
          }
        />
      )}

      {headerTilte && <ScreenHeader title={headerTilte ?? ''} />}
      {isView && (
        <View flex useSafeArea paddingH-16 {...props}>
          {props.children}
        </View>
      )}
      {!isView && props.children}
    </>
  );
};
