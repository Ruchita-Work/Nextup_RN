import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import OnBoardingWrapper from '../../../components/common/OnBoardingWrapper';
import { customTheme } from '../../../constants';
import { appImages } from '../../../constants/appImages';
import { Dimensions, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUpload } from '../../../hooks/useUpload';
import { useOnBoarding } from '../../../hooks/useOnBoarding';
import AppLoader from '../../../utils/Apploader';
import { useUserUpdateCertificates } from '../../../api/user.api';
import { useAuth } from '../../../hooks/useAuth';
import UpdloadTypeDialog from '../../../components/common/UploadTypeDialog';
export default function PhotoUpload() {
  const navigation = useNavigation();
  const routes = useRoute();
  const { isMale, user, isCoach, onRecheckingAuth } = useAuth();

  const { mutate: updateProfilePick, isLoading: isUpdating } =
    useUserUpdateCertificates({
      onSuccess: data => {
        handleSkip();
      },
    });

  const {
    isUploading,
    uploadProgress,
    pickDocument,
    uploadedDocument,
    scanDocument,
  } = useUpload();
  const imageUrl = uploadedDocument?.imageUrl
    ? { uri: uploadedDocument?.imageUrl }
    : isMale
    ? appImages.player_male
    : appImages.player_female;

  const [upload, setUpload] = React.useState(false);
  const handlePress = () => {
    updateProfilePick({
      data: {
        personalInfo: {profilePictureUrl: uploadedDocument?.imageUrl}
      },
      id: user?.id,
    });
  };
  const handleSkip = () => {
    if (isCoach) {
      navigation.navigate('DocumentVerification');
      return;
    }
    onRecheckingAuth();
    // navigation.navigate('DocumentVerification')
  };
  return (
    <OnBoardingWrapper
      progress={80}
      handleForm={handlePress}
      skip
      onSkip={handleSkip}
      loading={isUpdating}
      disabled={isUploading?.loading}>
      <>
        <Text
          white
          style={{
            fontSize: customTheme.fontSizes.size_32,
            fontFamily: customTheme.fontFamily.robotoLight,
            fontWeight: '200',
          }}>
          Upload{' '}
        </Text>
        <Text
          white
          style={{
            fontSize: customTheme.fontSizes.size_32,
            fontFamily: customTheme.fontFamily.robotoLight,
            fontWeight: '700',
          }}>
          Photo{' '}
        </Text>
        {}
        <View center flex>
          <TouchableOpacity onPress={() => setUpload(true)} center centerV>
            <>
              <ImageBackground
                source={imageUrl}
                style={{
                  width: Dimensions.get('window').width / 2,
                  height: Dimensions.get('window').width / 2,
                  borderRadius: Dimensions.get('window').width,
                  overflow: 'hidden',
                }}>
                <View
                  center
                  centerH
                  centerV
                  flex
                  backgroundColor={''}
                  style={{
                    opacity: 0.8,
                  }}>
                  <FontAwesomeIcon
                    icon={faCamera}
                    size={customTheme.spacings.spacing_24}
                    color={customTheme.colors.light}
                  />
                </View>
              </ImageBackground>
            </>
          </TouchableOpacity>
        </View>
{
  isUploading.loading &&
    <AppLoader
    visible={isUploading.loading}
    loadingMessage={`${uploadProgress} %`}
  />
}
      </>
      <UpdloadTypeDialog
        isVisible={upload}
        handlePick={pickDocument}
        handleScan={scanDocument}
        onClose={setUpload.bind(this, false)}
      />
    </OnBoardingWrapper>
  );
}
