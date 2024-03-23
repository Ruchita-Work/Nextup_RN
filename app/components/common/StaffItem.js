import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { appImages } from '../../constants/appImages';
import { hp, wp } from '../../utils/responsive';
import { useAuth } from '../../hooks/useAuth';
import AppSheet from './AppSheet';
import { customTheme } from '../../constants';
import FastImage from 'react-native-fast-image';

const StaffItem = ({
  name,
  email,
  profilePic,
  containerStyle = {},
  onPressDelete,
}) => {
  const { isCoach } = useAuth();

  const [isDeleteActionSheetVisible, setIsDeleteActionSheetVisible] =
    useState(false);

  const onPressDeleteHandler = () => {
    onPressDelete?.();
    setIsDeleteActionSheetVisible(false);
  };

  const handleDeleteAlert = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this staff ?', [
      {
        text: 'Cancel',
        style: 'cancel',
        isPreferred: true,
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onPressDeleteHandler,
      },
    ]);
  };

  const deleteStaffSheetOptions = [
    {
      label: 'Delete',
      onPress: handleDeleteAlert,
      color: customTheme.colors.darkRed2,
    },
    { label: 'Cancel', onPress: () => setIsDeleteActionSheetVisible(false) },
  ];

  return (
    <View row centerV style={[styles.container, containerStyle]}>
      <View style={styles.avatarContainer}>
        <FastImage
          source={{ uri: profilePic, priority: FastImage.priority.high }}
          style={styles.avatarImage}
          defaultSource={appImages.defaultAvatarImage}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} medium-600 style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} small-400 style={styles.email}>
          {email}
        </Text>
      </View>
      {isCoach && (
        <TouchableOpacity
          onPress={() => {
            setIsDeleteActionSheetVisible(true);
          }}>
          <Image style={styles.moreIcon} source={appImages.moreVertical} />
        </TouchableOpacity>
      )}
      <AppSheet
        options={deleteStaffSheetOptions}
        isVisible={isDeleteActionSheetVisible}
        setIsVisible={setIsDeleteActionSheetVisible}
      />
    </View>
  );
};

export default StaffItem;

const styles = StyleSheet.create({
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  infoContainer: {
    gap: hp(0.5),
    flex: 1,
    paddingRight: wp(2),
  },
  moreIcon: {
    height: wp(6),
    width: wp(6),
  },
  avatarContainer: {
    height: wp(12.5),
    width: wp(12.5),
    borderRadius: wp(7),
    marginRight: wp(3),
    overflow: 'hidden',
  },
});
