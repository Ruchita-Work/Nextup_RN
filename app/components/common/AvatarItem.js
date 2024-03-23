import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { hp, wp } from '../../utils/responsive';
import { Text } from 'react-native-ui-lib';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import FastImage from 'react-native-fast-image';
import { Colors, customTheme } from '../../constants';
import { appImages } from '../../constants/appImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BlurView } from '@react-native-community/blur';

const AvatarItem = ({
  size = wp(12.5),
  image,
  containerStyle = {},
  title = '',
  titleStyle = {},
  subTitle = '',
  subTitleStyle = {},
  isDisable = false,
  onPress,
  disableTouchable = false,
  isSelected = false,
  blurImage = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disableTouchable}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {isDisable ? (
        <Grayscale>
          <FastImage
            source={{ uri: image }}
            style={styles.image(size)}
            defaultSource={appImages.defaultAvatarImage}
          />
        </Grayscale>
      ) : (
        <FastImage
          source={{ uri: image }}
          style={styles.image(size)}
          defaultSource={appImages.defaultAvatarImage}
        />
      )}
      {!!blurImage && !!image && (
        <BlurView
          style={[styles.image(size), { position: 'absolute' }]}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <Text
        numberOfLines={1}
        small-600
        center
        style={[titleStyle, isDisable && styles.disabledTitle]}>
        {title}
      </Text>
      {!!subTitle && (
        <Text
          numberOfLines={1}
          medium-500
          style={[subTitleStyle, isDisable && styles.disabledSubTitle]}>
          {subTitle}
        </Text>
      )}

      {!!isSelected && (
        <View style={styles.selectedPlayerCheck}>
          <AntDesign color={'white'} name="check" size={wp(3)} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AvatarItem;

const styles = StyleSheet.create({
  container: {
    gap: hp(0.8),
    alignItems: 'center',
  },
  disabledTitle: {
    color: customTheme.colors.light + '70',
  },
  disabledSubTitle: {
    color: customTheme.colors.light + '40',
  },
  image: size => ({
    height: size,
    width: size,
    borderRadius: size / 2,
  }),
  selectedPlayerCheck: {
    height: wp(5),
    width: wp(5),
    borderRadius: wp(4),
    backgroundColor: Colors.btnBg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: wp(2),
    top: wp(8),
  },
});
