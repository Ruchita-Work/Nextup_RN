import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { wp } from '../responsive';
import { customTheme } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

const Back = ({
  onPress,
  containerStyle = {},
  title = '',
  backButtonStyle = {},
}) => {
  const navigation = useNavigation();
  const onBackPress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View row centerV style={containerStyle}>
      <TouchableOpacity
        center
        activeOpacity={0.5}
        style={[styles.back, backButtonStyle]}
        onPress={onBackPress}>
        <Image
          source={require('../../assets/leftArrow1.png')}
          style={styles.backImage}
        />
      </TouchableOpacity>
      {title && (
        <Text white medium style={styles.title}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default memo(Back);

const styles = StyleSheet.create({
  back: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(1),
    borderWidth: 2,
    borderColor: customTheme.colors.borderColor,
  },
  backImage: { height: wp(3.5), width: wp(3.5) },
  title: { marginLeft: wp(3) },
});
