import React, { createContext, useCallback, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { hp, isAndroid, wp } from '../utils/responsive';
import { customTheme } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export const ImagePreviewContext = createContext({
  showImagePreview: (_images, _currentIndex) => {
    Alert.alert('Hello');
  },
});

const ImagePreviewProvider = props => {
  const [images, setImages] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(null);

  const showImagePreviewHandler = (_images, _currentIndex) => {
    if (_images[0]) {
      setImages(_images);
      setIsVisible(true);
      setStartIndex(_currentIndex);
    }
  };

  const onCloseHandler = () => {
    setIsVisible(false);
    setImages(null);
    setImageIndex(0);
    setStartIndex(null);
  };

  const CustomHeaderComponent = useCallback(
    ({ imageIndex: _imageIndex }) => (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onCloseHandler}
          style={{ marginLeft: wp(6) }}>
          <FontAwesomeIcon icon={faClose} color={customTheme.colors.light} />
        </TouchableOpacity>
        {/* <Text style={styles.countText}>
          {_imageIndex + 1} of {images?.length ?? 1}
        </Text> */}
      </View>
    ),
    [],
  );

  return (
    <ImagePreviewContext.Provider
      value={{ showImagePreview: showImagePreviewHandler }}>
      <ImageView
        images={images ? images.map(i => ({ uri: i })) : [{}]}
        imageIndex={
          (startIndex ?? 0) > (images?.length ?? 0) ? 0 : startIndex || 0
        }
        visible={isVisible}
        onRequestClose={onCloseHandler}
        doubleTapToZoomEnabled
        keyExtractor={(_, index) => index.toString()}
        HeaderComponent={CustomHeaderComponent}
        onImageIndexChange={setImageIndex}
      />
      {props.children}
    </ImagePreviewContext.Provider>
  );
};

export default ImagePreviewProvider;

const styles = StyleSheet.create({
  countText: {
    color: customTheme.colors.light,
    alignSelf: 'center',
    textAlign: 'center',
    marginRight: wp(44),
    marginLeft: 'auto',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: hp(isAndroid ? 4 : 8),
  },
});
