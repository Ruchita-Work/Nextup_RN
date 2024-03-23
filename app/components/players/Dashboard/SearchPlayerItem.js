import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Checkbox, Text, View } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';
import FastImage from 'react-native-fast-image';
import { appImages } from '../../../constants/appImages';

const PointsInfoItem = ({ title, value }) => {
  return (
    <View style={styles.pointInfoItemContainer}>
      <Text style={styles.pointInfoItemTitle}>{title}</Text>
      <Text regular-500>{value}</Text>
    </View>
  );
};

const SearchPlayerItem = ({
  onPress,
  isSelected = false,
  onCheckBoxPress = () => {},
  data = {},
}) => {
  const pointsList = Object.keys(data?.pgs || {});
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FastImage
        source={{
          uri: data?.profilePictureUrl,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
        defaultSource={appImages.defaultAvatarImage}
      />
      <View flex>
        <Text medium-600 numberOfLines={2}>
          {data?.name}
        </Text>
        <View row centerV spread style={styles.pointsInfoContainer}>
          {pointsList?.map((item, index) => (
            <PointsInfoItem
              key={index}
              title={item.toUpperCase()}
              value={data?.pgs[item] || '0'}
            />
          ))}
        </View>
      </View>
      <Checkbox
        style={styles.checkbox}
        color={
          isSelected ? customTheme.colors.btnBg : customTheme.colors.lightGray1
        }
        value={isSelected}
        onValueChange={onCheckBoxPress}
        size={wp(5.5)}
        borderRadius={wp(1)}
        hitSlop={wp(2)}
      />
    </Pressable>
  );
};

export default SearchPlayerItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: customTheme.colors.lightDark,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
  },
  image: {
    height: wp(12.5),
    width: wp(12.5),
    marginRight: wp(3),
    borderRadius: wp(7),
  },
  pointsInfoContainer: {
    marginTop: hp(0.7),
    marginRight: wp(10),
  },
  pointInfoItemContainer: {
    alignItems: 'center',
  },
  pointInfoItemTitle: {
    fontSize: customTheme.fontSizes.size_11,
    color: customTheme.colors.light + '60',
    fontFamily: customTheme.fontFamily.robotoRegular,
  },
  checkbox: {
    marginRight: wp(3),
  },
});
