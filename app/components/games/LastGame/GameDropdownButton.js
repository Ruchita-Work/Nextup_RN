import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { appImages } from '../../../constants/appImages';
import styles from './styles';

const GameDropdownButton = ({ title, isActive, color, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.gameDropdownButton(color, isActive), style]}>
      <Text style={styles.gameDropdownButtonTitle(isActive)}>{title}</Text>
      <Image
        source={appImages.dropdown}
        style={styles.gameDropdownButtonImage(isActive)}
      />
    </TouchableOpacity>
  );
};

export default GameDropdownButton;
