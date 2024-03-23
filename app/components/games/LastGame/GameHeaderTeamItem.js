import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-ui-lib';
import { appImages } from '../../../constants/appImages';
import { View } from 'react-native';
import styles from './styles';

const GameHeaderTeamItem = ({
  name = '',
  color,
  isReverse = false,
  nameStyle = {},
  subTitle = '',
  subTitleStyle = {},
  image,
}) => {
  return (
    <View style={styles.gameHeaderTeamItem(isReverse)}>
      {image ? (
        <FastImage
          source={image}
          defaultSource={appImages.defaultAvatarImage}
          style={styles.gameHeaderTeamItemBadge()}
        />
      ) : (
        <View style={styles.gameHeaderTeamItemBadge(color)}>
          <Text medium>{name[0]}</Text>
        </View>
      )}
      {subTitle ? (
        <View style={styles.gameHeaderTeamItemNameContainer}>
          <Text regular-400 style={[nameStyle]}>
            {name}
          </Text>
          <Text
            small-400
            style={[
              styles.gameHeaderTeamItemSubTitle(color, isReverse),
              subTitleStyle,
            ]}>
            {subTitle}
          </Text>
        </View>
      ) : (
        <Text
          small-x-600
          numberOfLines={2}
          style={[styles.gameHeaderTeamItemName(color, isReverse), nameStyle]}>
          {name}
        </Text>
      )}
    </View>
  );
};

export default GameHeaderTeamItem;
