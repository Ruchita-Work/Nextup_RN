/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { customTheme } from '../../constants';
import { hp } from '../../utils/responsive';
import { Text } from 'react-native-ui-lib';

export function CustomTabView({ state, descriptors, navigation, position }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: customTheme.spacings.spacing_16,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              borderBottomColor: isFocused
                ? customTheme.colors.light
                : customTheme.colors.background,
              borderBottomWidth: isFocused ? 2 : 0,
              paddingBottom: hp(1),
            }}
            key={index}>
            <Text animated
              style={isFocused ? styles.focusedStyle : styles.unFocusedStyle}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  focusedStyle: {
    color: customTheme.colors.light,
    textAlign: 'center',
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoMedium,
    fontWeight: '800'
  },
  unFocusedStyle: {
    color: customTheme.colors.white,
    textAlign: 'center',
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoMedium,
    opacity: 0.6
  }
})