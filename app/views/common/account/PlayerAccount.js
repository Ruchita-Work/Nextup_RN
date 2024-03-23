import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { Pressable } from 'react-native';
import { ScrollViewContainer } from '../../../components/common/SrollViewContainer';
import { customTheme } from '../../../constants';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faUser,
  faTrashAlt,
  faRightFromBracket,
  faStar,
  faShareNodes,
  faStickyNote,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmationDialog } from '../../../components/common/confirmationDialog';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import FastImage from 'react-native-fast-image';
import { hp, wp } from '../../../utils/responsive';

export default function PlayerAccount() {
  const [dialog, setDialog] = useState({
    logout: false,
  });
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const profileMenuOptions = [
    {
      name: 'My Profile',
      icon: faUser,
      onPress: () => {
        navigation.navigate('AccountDetails');
      },
    },
    // {
    //   name: 'Subscriptions',
    //   icon: faTicketSimple,
    // },
    // {
    //   name: 'Help and Support ',
    //   icon: faHeadphonesSimple,
    // },
    {
      name: 'Privacy Policy ',
      icon: faCheckSquare,
    },
    {
      name: 'Terms and Conditions ',
      icon: faStickyNote,
    },
    {
      name: 'Share Application',
      icon: faShareNodes,
    },
    {
      name: 'Rate Us',
      icon: faStar,
    },
    {
      name: 'Logout',
      icon: faRightFromBracket,
      onPress: () => {
        setDialog({
          logout: true,
        });
      },
    },
    {
      name: 'Delete Account',
      icon: faTrashAlt,
    },
  ];
  return (
    <ScrollViewContainer>
      <View style={{ alignSelf: 'center' }}>
        <FastImage
          style={{
            borderWidth: 1,
            borderColor: customTheme.colors.white,
            height: wp(20),
            width: wp(20),
            borderRadius: wp(10),
            alignSelf: 'center',
            marginTop: hp(2),
          }}
          source={{ uri: user?.personalInfo?.profilePictureURL }}
        />
        <Text
          style={{
            color: customTheme.colors.white,
            marginVertical: customTheme.spacings.spacing_8,
            fontSize: customTheme.fontSizes.size_20,
            textAlign: 'center',
            fontWeight: '700',
            fontFamily: customTheme.fontFamily.robotoRegular,
            marginTop: hp(1.5),
          }}>
          {user?.personalInfo?.firstName} {user?.personalInfo?.lastName}
        </Text>
        <TouchableOpacity
          marginT-8
          onPress={() => navigation.navigate('EditProfile')}>
          <Text centerH medium center>
            Edit profile
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: customTheme.spacings.spacing_40,
        }}>
        {_.map(profileMenuOptions, (item, index) => {
          return (
            <Pressable
              onPress={item.onPress}
              key={index}
              style={{
                backgroundColor: customTheme.colors.primary,
                marginVertical: customTheme.spacings.spacing_4,
                borderRadius: customTheme.spacings.spacing_8,
                paddingHorizontal: customTheme.spacings.spacing_16,
                paddingVertical: customTheme.spacings.spacing_8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={item?.icon}
                  color={customTheme.colors.white}
                  size={customTheme.fontSizes.size_28}
                />
                <Text
                  style={{
                    color: customTheme.colors.white,
                    marginLeft: customTheme.spacings.spacing_8,
                  }}>
                  {item?.name}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  borderLeftWidth: 1,
                  borderLeftColor: customTheme.colors.white,
                  opacity: 0.6,
                  paddingHorizontal: customTheme.spacings.spacing_8,
                }}>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  color={customTheme.colors.white}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      <ConfirmationDialog
        open={dialog.logout}
        title="Want to log out?"
        body="You won’t be able to continue your journey logged out."
        confirmText="Yes, log me out"
        cancelText="No, stay here"
        onClose={() => setDialog({ ...dialog, logout: false })}
        onConfirm={() => {
          logout();
          setDialog({ ...dialog, logout: false });
        }}
      />
    </ScrollViewContainer>
  );
}
