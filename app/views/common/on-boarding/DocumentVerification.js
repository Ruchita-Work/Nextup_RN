import React from 'react';
import {
  View,
  Text,
  AnimatedImage,
  TouchableOpacity,
  Image,
  Dialog,
} from 'react-native-ui-lib';
import { ActivityIndicator, ImageBackground } from 'react-native';
import { Layout, customTheme } from '../../../constants';
import { appImages } from '../../../constants/appImages';
import { Dimensions } from 'react-native';
import { FormButton } from '../../../components/common/FormInputs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { useUpload } from '../../../hooks/useUpload';
import { useMemo, useState } from 'react';
import OnBoardingWrapper from '../../../components/common/OnBoardingWrapper';
import UpdloadTypeDialog from '../../../components/common/UploadTypeDialog';
import AppLoader from '../../../utils/Apploader';
import { hp } from '../../../utils/responsive';
import { useUserUpdateCertificates } from '../../../api/user.api';
import { useAuth } from '../../../hooks/useAuth';

const ImageRender = ({ uri, onPress }) => {
  return (
    <ImageBackground
      style={{ justifyContent: 'center', alignContent: 'center' }}
      resizeMode="contain"
      source={appImages.placeHolderPhotoIdBorder}>
      <Image
        resizeMode="contain"
        customOverlayContent={() => <Text red10>eye</Text>}
        style={{
          alignSelf: 'center',
          borderRadius: customTheme.spacings.spacing_16,
        }}
        width={'100%'}
        height={Layout.width * 0.46}
        source={{ uri }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          backgroundColor: customTheme.colors.tertiary,
          opacity: 0.5,
          height: Layout.width * 0.46,
          width: Layout.width * 0.3,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <FontAwesomeIcon
          style={{ alignSelf: 'center' }}
          icon={faEye}
          size={24}
          color={customTheme.colors.white}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const VerticalStepIndicator = ({
  doc,
  handleCertificate,
  handleIndentity,
  handleCertificateVisible,
  handleIndentityVisible,
}) => {
  return (
    <View row marginT-20>
      <View width={'20%'} marginL-12 center>
        <View center>
          <View row>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={24}
              color={doc?.idProofUrl ? customTheme.colors.success : '#70768A'}
            />
          </View>
          <View
            center
            style={{
              height: Layout.width * 0.46,
              backgroundColor: doc?.idProofUrl
                ? customTheme.colors.green
                : customTheme.colors.grey,
              borderColor:
                doc?.idProofUrl && doc?.certificateUrl
                  ? customTheme.colors.success
                  : '#70768A',
              borderWidth: 1,
              width: 1,
              borderStyle: 'dashed', // Use 'dashed' style
            }}
          />
          <View>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={24}
              color={
                doc?.certificateUrl ? customTheme.colors.success : '#70768A'
              }
            />
          </View>
        </View>
      </View>
      <View>
        {doc?.idProofUrl ? (
          <ImageRender
            uri={doc?.idProofUrl}
            onPress={handleCertificateVisible}
          />
        ) : (
          <TouchableOpacity onPress={handleIndentity}>
            <ImageBackground
              resizeMode="contain"
              source={appImages.certificateCoaching}
              style={{
                width: Dimensions.get('window').width / 2,
                height: Dimensions.get('window').width / 2,
                overflow: 'hidden',
                justifyContent: 'center',
              }}>
              <Text
                center
                uppercase
                style={{
                  color: '#70768A',
                }}>
                Photo Id
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}

        <Text
          white
          center
          marginV-12
          style={{
            fontSize: customTheme.fontSizes.size_16,
            fontFamily: customTheme.fontFamily.robotoRegular,
            opacity: 0.7,
          }}>
          For verification try not to skip this {`\n`} process
        </Text>
        {doc?.certificateUrl ? (
          <ImageRender
            uri={doc?.certificateUrl}
            onPress={handleCertificateVisible}
          />
        ) : (
          <TouchableOpacity onPress={handleCertificate}>
            <ImageBackground
              resizeMode="contain"
              source={appImages.certificateCoaching}
              style={{
                width: Dimensions.get('window').width / 2,
                height: Dimensions.get('window').width / 2,
                overflow: 'hidden',
                justifyContent: 'center',
              }}>
              <Text center uppercase style={{ color: '#70768A' }}>
                Coaching {`\n`} Certificate
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function DocumentVerification() {
  const { user, onRecheckingAuth } = useAuth();
  const [upload, setUpload] = useState({
    idProof: false,
    value: false,
  });
  const [doc, setDoc] = useState({
    idProofUrl: null,
    certificateUrl: null,
  });
  const [visibleDoc, setVisibleDoc] = useState(null);
  const {
    isUploading,
    uploadProgress,
    pickDocument,
    uploadedDocument,
    scanDocument,
  } = useUpload();
  const { mutate: updateProfilePick, isLoading: isUpdating } =
    useUserUpdateCertificates({
      onSuccess: data => {
        onRecheckingAuth();
      },
    });
  const progressCount = useMemo(() => {
    if (doc.idProofUrl && doc.certificateUrl) {
      return 100;
    }
    if (doc.idProofUrl || doc.certificateUrl) {
      return 90;
    }
    return 80;
  }, [doc]);
  const handleDoc = res => {
    if (upload.idProof) {
      setDoc({
        ...doc,
        idProofUrl: res?.imageUrl,
      });
      setVisibleDoc(prev => ({
        idProof: true,
        value: prev?.value,
        url: res?.imageUrl,
      }));
    } else {
      setDoc({
        ...doc,
        certificateUrl: res?.imageUrl,
      });
      setVisibleDoc(prev => ({
        idProof: false,
        value: prev?.value,
        url: res?.imageUrl,
      }));
    }
  };
  const handleCertificate = () => {
    setUpload({
      idProof: false,
      value: true,
    });
  };
  const handleIndentity = () => {
    setUpload({
      idProof: true,
      value: true,
    });
  };
  const handleCertificateVisible = () => {
    setVisibleDoc({
      idProof: false,
      value: true,
      url: doc?.certificateUrl,
    });
  };
  const handleIndentityVisible = () => {
    setVisibleDoc({
      idProof: true,
      value: true,
      url: doc?.idProofUrl,
    });
  };
  const handleChange = () => {
    // setVisibleDoc(null)
    if (visibleDoc.idProof) {
      handleIndentity();
      return;
    }
    handleCertificate();
  };
  const handlePress = () => {
    updateProfilePick({
      data: {
        certificateUrl: doc?.certificateUrl,
        idProofUrl: doc?.idProofUrl,
      },
      id: user?.id,
    });
  };

  return (
    <OnBoardingWrapper
      progress={progressCount}
      handleForm={handlePress}
      disabled={!doc?.idProofUrl && !doc?.certificateUrl}
      loading={isUploading.loading || isUpdating}>
      <>
        <Text
          white
          style={{
            fontSize: customTheme.fontSizes.size_32,
            fontFamily: customTheme.fontFamily.robotoLight,
            fontWeight: '200',
          }}>
          One Last{' '}
        </Text>
        <Text
          white
          style={{
            fontSize: customTheme.fontSizes.size_32,
            fontFamily: customTheme.fontFamily.robotoLight,
            fontWeight: '700',
          }}>
          Step{' '}
        </Text>
        <VerticalStepIndicator
          doc={doc}
          handleCertificate={handleCertificate}
          handleIndentity={handleIndentity}
          handleCertificateVisible={handleCertificateVisible}
          handleIndentyVisible={handleIndentityVisible}
        />
      </>
      {
        isUploading.loading &&
        <AppLoader
        visible={isUploading.loading}
        loadingMessage={`${uploadProgress} %`}
      />
      }  
      <UpdloadTypeDialog
        isVisible={upload?.value}
        handlePick={() => pickDocument(handleDoc)}
        handleScan={() => scanDocument(handleDoc)}
        onClose={setUpload.bind(this, {
          idProof: false,
          value: false,
        })}
      />
      <Dialog
        visible={visibleDoc?.value}
        width={Layout.width}
        bottom
        containerStyle={{
          backgroundColor: customTheme.colors.primary,
          marginBottom: 0,
          paddingTop: customTheme.spacings.spacing_12,
          paddingBottom: customTheme.spacings.spacing_32,
          paddingHorizontal: customTheme.spacings.spacing_16,
          borderTopRightRadius: customTheme.spacings.spacing_16,
          borderTopLeftRadius: customTheme.spacings.spacing_16,
        }}
        onDismiss={() => setVisibleDoc(null)}>
        <Text white center style={{ opacity: 0.6 }}>
          View Document
        </Text>
        <AnimatedImage
          source={{ uri: visibleDoc?.url }}
          // useBackgroundContainer
          animationDuration={2000}
          loader={<ActivityIndicator color={customTheme.colors.white} />}
          style={{
            width: Layout.width * 0.8,
            height: hp(20),
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: customTheme.spacings.spacing_16,
          }}
        />
        <FormButton
          onPress={handleChange}
          label={'Change'}
          loading={isUploading?.loading}
        />
      </Dialog>
    </OnBoardingWrapper>
  );
}
