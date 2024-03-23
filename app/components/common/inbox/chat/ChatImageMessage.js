/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useContext } from 'react';
import commonChatStyles from './commonChatStyles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { hp, wp } from '../../../../utils/responsive';
import { chunk, isArray } from 'lodash';
import { useAuth } from '../../../../hooks/useAuth';
import { ImagePreviewContext } from '../../../../context/ImagePreviewProvider';
import { Text } from 'react-native-ui-lib';

const ChatImageMessage = props => {
  const { user } = useAuth();

  const imagePreviewCtx = useContext(ImagePreviewContext);

  const isSameUserMessage =
    props.currentMessage?.user?._id?.toString?.() === user?.id?.toString?.();

  const isNextMessageFromSameUser =
    props.currentMessage?.user?._id === props.nextMessage?.user?._id;

  const isPreviousMessageFromSameUser =
    props.currentMessage?.user?._id === props.previousMessage?.user?._id;

  const RenderImages = useCallback(() => {
    const images =
      props.currentMessage?.image?.length > 4
        ? props.currentMessage?.image?.slice(0, 4)
        : props.currentMessage?.image;
    const isThreeImagesOrMore = images.length >= 3;
    const isMoreThanThreeImages = images.length > 3;
    const chunkImagesArr = chunk([...images].reverse(), 2).reverse();

    const imagePreviewHandler = (index = 0) => {
      imagePreviewCtx.showImagePreview(
        props.currentMessage?.image || [],
        index,
      );
    };

    return images.length === 1 ? (
      <TouchableOpacity
        style={styles.image}
        activeOpacity={0.7}
        onPress={() => imagePreviewHandler()}>
        <FastImage
          source={{ uri: images[0], priority: 'high' }}
          style={styles.image}
        />
      </TouchableOpacity>
    ) : (
      <View style={styles.imagesRow}>
        {isThreeImagesOrMore
          ? chunkImagesArr.map((chunkItem, chunkItemIndex) => {
              if (isArray(chunkItem) && chunkItem.length === 2) {
                return (
                  <View
                    style={{
                      width: isMoreThanThreeImages ? '50%' : '100%',
                      height: '100%',
                    }}>
                    {chunkItem.map((nestedChunkItem, nestedChunkIndex) => (
                      <TouchableOpacity
                        style={{
                          height: hp(12),
                          width: isMoreThanThreeImages ? '100%' : '50%',
                        }}
                        activeOpacity={0.7}
                        onPress={() => {
                          if (isMoreThanThreeImages) {
                            imagePreviewHandler(
                              chunkItemIndex
                                ? 2 + (nestedChunkIndex ? 0 : 1)
                                : 0 + (nestedChunkIndex ? 0 : 1),
                            );
                          } else {
                            imagePreviewHandler((nestedChunkIndex ? 0 : 1) + 1);
                          }
                        }}>
                        {chunkItemIndex === 1 &&
                        nestedChunkIndex === 1 &&
                        props.currentMessage?.image?.length > 4 ? (
                          <View style={styles.moreImageOverlay}>
                            <Text header-400>
                              + {props.currentMessage?.image?.length - 4}
                            </Text>
                          </View>
                        ) : null}
                        <FastImage
                          key={nestedChunkItem}
                          style={styles.image}
                          source={{ uri: nestedChunkItem, priority: 'high' }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={styles.twoImagesImage}
                    activeOpacity={0.7}
                    onPress={() => {
                      imagePreviewHandler(0);
                    }}>
                    <FastImage
                      style={styles.image}
                      key={chunkItem[0]}
                      source={{ uri: chunkItem[0], priority: 'high' }}
                    />
                  </TouchableOpacity>
                );
              }
            })
          : images.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.twoImagesImage}
                  activeOpacity={0.7}
                  onPress={() => imagePreviewHandler(index)}>
                  <FastImage
                    style={styles.image}
                    key={item}
                    source={{ uri: item, priority: 'high' }}
                  />
                </TouchableOpacity>
              );
            })}
      </View>
    );
  }, [imagePreviewCtx, props]);

  return (
    <View style={commonChatStyles.container(isSameUserMessage)}>
      <Text style={commonChatStyles.dateTimeText}>
        {moment(props.currentMessage?.createdAt).format('hh:mm a')}
      </Text>
      <View
        style={styles.container(
          isSameUserMessage,
          isNextMessageFromSameUser,
          isPreviousMessageFromSameUser,
        )}>
        <RenderImages />
      </View>
    </View>
  );
};

export default memo(ChatImageMessage);

const styles = StyleSheet.create({
  container: (
    isSameUserMessage,
    isNextMessageFromSameUser,
    isPreviousMessageFromSameUser,
  ) => ({
    ...commonChatStyles.container(isSameUserMessage, isNextMessageFromSameUser),
    ...commonChatStyles.messageBorderRadius(
      isSameUserMessage,
      isNextMessageFromSameUser,
    ),
    marginTop: isPreviousMessageFromSameUser ? 0 : hp(1),
    overflow: 'hidden',
    height: hp(24),
    width: wp(60),
  }),
  image: { width: '100%', height: '100%' },
  imagesRow: { width: '100%', flexDirection: 'row', height: '100%' },
  twoImagesImage: { width: '50%', height: hp(24) },
  moreImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000090',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
