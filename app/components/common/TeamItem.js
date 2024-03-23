/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { Colors } from 'react-native-ui-lib';
import { Color, Padding } from '../../views/GlobalStyles';
import { hp, wp } from '../../utils/responsive';
import { customTheme } from '../../constants';
import FastImage from 'react-native-fast-image';
import { appImages } from '../../constants/appImages';
import { SvgCssUri } from 'react-native-svg';

const TeamItem = ({
  imageSource = {},
  name = '',
  isActive = false,
  containerStyle = {},
  imageContainerStyle = {},
  onPress,
  ...rest
}) => {
  const isImageSVG = imageSource?.uri?.split('.').slice(-1)[0] === 'svg';
  return (
    <View
      style={[
        styles.container,
        isActive && styles.containerActiveBottomBorder,
        containerStyle,
      ]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        {isImageSVG ? (
          <SvgCssUri
            onPress={onPress ? onPress : null}
            width="88%"
            height="88%"
            uri={imageSource.uri}
            fallback={
              <Image
                source={appImages.defaultAvatarImage}
                style={styles.image}
              />
            }
          />
        ) : (
          <TouchableOpacity
            style={styles.image}
            onPress={onPress ? onPress : null}>
            <FastImage
              style={styles.image}
              source={
                imageSource.uri
                  ? { uri: imageSource.uri, priority: 'high' }
                  : imageSource
              }
              defaultSource={appImages.defaultAvatarImage}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text numberOfLines={2} style={styles.name}>
        {name || 'N/A'}
      </Text>
    </View>
  );
};

export default memo(TeamItem);

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  containerActiveBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  imageContainer: {
    height: wp(22),
    width: wp(22),
    borderRadius: wp(12),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
  name: {
    lineHeight: hp(1.8),
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: Color.othersWhite,
    width: '92%',
    paddingVertical: Padding.p_8xs,
    textAlign: 'center',
    marginTop: hp(0.3),
  },
});
