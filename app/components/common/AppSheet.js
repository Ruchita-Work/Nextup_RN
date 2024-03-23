import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { ActionSheet, Text } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../../utils/responsive';

const AppSheet = ({ options = [], isVisible, setIsVisible }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: customTheme.colors.background,
        paddingBottom: bottom,
        maxHeight: hp(50),
      }}
      visible={isVisible}
      cancelButtonIndex={2}
      destructiveButtonIndex={0}
      onDismiss={() => setIsVisible(false)}
      options={options}
      renderAction={(option, index) => {
        const itemColor = option.color;
        return (
          <TouchableOpacity
            key={index}
            onPress={option.onPress}
            style={styles.sheetItem}
            activeOpacity={0.7}>
            <Text medium-700 color={itemColor}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default AppSheet;

const styles = StyleSheet.create({
  sheetItem: { paddingVertical: hp(2), alignItems: 'center' },
});
