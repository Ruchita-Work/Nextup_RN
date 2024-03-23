import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { wp } from '../../utils/responsive';
import FastImage from 'react-native-fast-image';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { customTheme } from '../../constants';
import { appImages } from '../../constants/appImages';

const ImageUpload = ({
  size = wp(24),
  source = {},
  containerStyle = {},
  onSelectImage = () => {},
  onPress,
}) => {
  const baseContainerStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };

  const onPressPickImageHandler = () => {
    if (onPress) {
      onPress();
    } else {
      launchImageLibrary({ mediaType: 'photo' })
        .then(onSelectImage)
        .catch(e => {});
    }
  };

  return (
    <TouchableOpacity
      style={[baseContainerStyle, styles.container, containerStyle]}
      onPress={onPressPickImageHandler}
      activeOpacity={0.7}>
      <Image
        source={require('../../assets/images/CameraIcon.png')}
        style={styles.addImage}
        resizeMode="contain"
      />
      <FastImage
        source={source}
        style={styles.image}
        defaultSource={appImages.defaultAvatarImage}
      />
      <LinearGradient
        colors={['#00000001', '#00000080']}
        style={[styles.blackGradient, { width: size }]}
      />
    </TouchableOpacity>
  );
};

export default memo(ImageUpload);

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  image: { height: '100%', width: '100%' },
  addImage: {
    height: wp(5),
    width: wp(5),
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: wp(9.5),
    tintColor: customTheme.colors.light,
    zIndex: 2,
  },
  blackGradient: {
    height: wp(12),
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
  },
});
