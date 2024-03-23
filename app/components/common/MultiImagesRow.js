import React from 'react';
import { StyleSheet, View } from 'react-native';
import { wp } from '../../utils/responsive';
import { customTheme } from '../../constants';
import FastImage from 'react-native-fast-image';
import { appImages } from '../../constants/appImages';

const MultiImagesRow = ({
  images = [],
  imageSize = wp(10),
  borderColor = customTheme.colors.playerCategoryBg,
}) => {
  return (
    <View style={styles.container}>
      {images.map((item, index) => (
        <FastImage
          key={index}
          source={item}
          style={styles.avatar(index, imageSize, borderColor)}
          defaultSource={appImages.defaultAvatarImage}
        />
      ))}
    </View>
  );
};

export default MultiImagesRow;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  avatar: (index, imageSize, borderColor) => ({
    height: imageSize,
    width: imageSize,
    borderWidth: 2,
    borderRadius: imageSize / 2,
    borderColor: borderColor,
    marginLeft: index ? -wp(2) : 0,
  }),
});
