import React from 'react';
import { View, Image, SafeAreaView, Platform } from 'react-native';
import { appImages } from '../../../constants/appImages';
import { CommonStyles, customTheme } from '../../../constants';
import TextComponent from '../../../components/common/TextComponent';
import SocialButton from '../../../components/common/SocialButton';
import useBackend from '../../../hooks/useBackend';
import { useAuth } from '../../../hooks/useAuth';

const loginOptions = [
  {
    id: 1,
    text: 'Continue with Apple',
    logo: appImages.apple_logo,
    showBtn: Platform.OS === 'ios',
  },
  {
    id: 2,
    text: 'Continue with Google',
    logo: appImages.google_logo,
    showBtn: Platform.OS === 'ios' || Platform.OS === 'android',
  },
  // {
  //   id: 0,
  //   text: 'Continue with Meta',
  //   logo: appImages.fb_logo,
  // },
];
export default function WelcomeScreen() {
  const { handleImperativeLogin } = useBackend();
  const { updateUserSocialSigninData } = useAuth();

  const handleSubmit = async type => {
    const response = await handleImperativeLogin(type);
    updateUserSocialSigninData(response?.additionalUserInfo);
  };

  return (
    <SafeAreaView style={[CommonStyles.appThemeBgContainer]}>
      <Image
        source={appImages.login_logo}
        resizeMode="contain"
        style={[CommonStyles.flex75, CommonStyles.width100]}
      />
      <View style={[CommonStyles.alignCenter, { width: '50%' }]}>
        <TextComponent numberOfLines={3} textStyle={[CommonStyles.titleFont]}>
          Players,{'\n'}Coaches and{'\n'}Fans.
        </TextComponent>
      </View>
      {loginOptions.map((item, index) => {
        return (
          item.showBtn && (
            <View
              key={index}
              style={[
                [
                  CommonStyles.mt10,
                  CommonStyles.mb10,
                  CommonStyles.ph10,
                  { marginHorizontal: customTheme.spacings.spacing_12 },
                ],
              ]}>
              <SocialButton
                buttonContainerStyle={[
                  CommonStyles.flexRowAlignCenter,
                  CommonStyles.socialLoginButton,
                  CommonStyles.oynxBlueBorder,
                ]}
                title={item.text}
                textStyle={{
                  color: customTheme.colors.background,
                  fontSize: customTheme.fontSizes.size_16,
                  fontWeight: '600',
                  marginLeft: customTheme.spacings.spacing_8,
                }}
                imageSrc={item.logo}
                imageStyle={CommonStyles.midSizeLogo}
                onPressButton={() => handleSubmit(item?.id)}
              />
            </View>
          )
        );
      })}
    </SafeAreaView>
  );
}
