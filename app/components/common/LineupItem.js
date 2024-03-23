import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { Text } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { hp, wp } from '../../utils/responsive';
import MultiImagesRow from './MultiImagesRow';
import { appImages } from '../../constants/appImages';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const LineupItem = ({
  containerStyle = {},
  isAILineup = false,
  titleStyle = {},
  viewTextStyle = {},
  data = {},
}) => {
  const navigation = useNavigation();

  const onPressViewLineupDetailsHandler = () => {
    navigation.navigate('LineupDetails', { lineup: data, isAILineup });
  };

  const isDefault = !!data.default;

  const imagesRowData = [];

  if (data?.playerPositionsList?.length) {
    data?.playerPositionsList?.forEach(positionItem => {
      positionItem.availablePlayersList?.forEach(playerItem => {
        imagesRowData.push({
          uri: playerItem?.playerProfilePictureUrl,
          priority: FastImage.priority.high,
        });
      });
    });
  }

  imagesRowData.splice(5);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftBodyItem}>
        <Text medium-xl-600 style={titleStyle}>
          {data?.name || 'N/A'}
        </Text>
        <MultiImagesRow
          images={imagesRowData}
          borderColor={containerStyle?.backgroundColor}
        />
      </View>
      <View style={styles.rightBodyItem(isDefault, isAILineup)}>
        {(isDefault || isAILineup) && (
          <Image
            style={styles.icon(isAILineup)}
            source={isAILineup ? appImages.crown : appImages.yellowCheckBadge}
          />
        )}
        <TouchableOpacity onPress={onPressViewLineupDetailsHandler}>
          <Text
            medium-700
            color={customTheme.colors.btnBg}
            style={viewTextStyle}>
            View
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(LineupItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: customTheme.colors.playerCategoryBg,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBodyItem: { gap: hp(1) },
  rightBodyItem: (isVerified, isAILineup) => ({
    gap: hp(1),
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: isVerified || isAILineup ? 'center' : 'flex-end',
    ...(!(isVerified || isAILineup) && { marginBottom: hp(1) }),
  }),
  icon: isAILineup => ({
    height: wp(7),
    width: wp(7),
    tintColor: isAILineup ? customTheme.colors.darkYellow2 : undefined,
  }),
});
