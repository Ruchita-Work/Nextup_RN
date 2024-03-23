import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../../../../../constants';
import { openCamera } from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import tickSelectedIcon from '../../../../../assets/images/tick_selected.png';
import newUncheckIcon from '../../../../../assets/images/new_uncheck_icon.png';
import rejectDocIcon from '../../../../../assets/images/doc_reject_icon.png';
import dottedLine from '../../../../../assets/images/seperator_dash.png';
import placeholder from '../../../../../assets/images/Placeholder_PhotoId.png';
import placeholderBorder from '../../../../../assets/images/placeHolder_photoid_border.png';
import InfoIcon from '../../../../../assets/images/info_icon.png';
import CoachCertPlaceholder from '../../../../../assets/images/CochingCerti.png';
import { openPicker } from 'react-native-image-crop-picker';
import { hp, wp } from '../../../../../utils/responsive';
import { useAuth } from '../../../../../hooks/useAuth';

function Verification({ formik, coachInfo }) {
  const { isCoach } = useAuth();
  const { values, setFieldValue } = formik;

  const photoId = values.idDoc?.uri;
  const coachCertificateId = values.coachCert?.uri;

  const isIdApproved = coachInfo?.idProofApproved === true;
  const isCoachCertiApproved = coachInfo?.certificateApproved === true;

  const isIdInProgress = !photoId || coachInfo?.idProofApproved === null;
  const isCoachCertiInProgress =
    !coachCertificateId || coachInfo?.certificateApproved === null;

  function onSelectDoc(isFrom) {
    const isAvatar = isFrom === 'ava';
    Alert.alert(
      isAvatar ? 'PHOTO ID' : 'COACHING CERTIFICATE',
      'Pick from',
      [
        {
          text: 'Gallery',
          onPress: async () => {
            const res = await openPicker({ cropping: true, multiple: false });
            if (isAvatar) {
              setFieldValue('idDoc', { ...res, uri: res.sourceURL });
            } else {
              setFieldValue('coachCert', { ...res, uri: res.sourceURL });
            }
          },
        },
        {
          text: 'Camera',
          onPress: async () => {
            const res = await openCamera({ cropping: true, multiple: false });
            if (isAvatar) {
              setFieldValue('idDoc', { ...res, uri: res.sourceURL });
            } else {
              setFieldValue('coachCert', { ...res, uri: res.sourceURL });
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <View style={styles.fullScreen}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onSelectDoc('ava')}>
          {!photoId ? (
            <Image
              source={placeholder}
              style={[
                styles.selectedPhoto,
                { tintColor: Colors.photIdRactangle },
              ]}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.selectedPhotoContainer}>
              <FastImage
                style={styles.selectedPhoto}
                source={{ uri: photoId }}
              />
              <Image source={placeholderBorder} style={styles.photoBorder} />
            </View>
          )}
          {!photoId ? (
            <Text style={styles.noPhotoIdText}>
              For profile verification, try not to skip the process
            </Text>
          ) : (
            <View style={styles.photoIdUnderVerificationContainer}>
              {isIdApproved === false ? (
                <Image source={InfoIcon} style={styles.infoIcon} />
              ) : (
                <></>
              )}
              {isIdInProgress ? (
                <Text style={styles.docUnderVerificationText}>
                  Your document is under verification, We will notify once
                  verified.
                </Text>
              ) : isIdApproved === false ? (
                <View>
                  <Text style={styles.docUnderVerificationText}>
                    Your document is rejeted. Please upload right documents.
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => onSelectDoc('ava')}>
                    <Text style={styles.reuploadText}> Reupload</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.leftLineContainer}>
          {!photoId ? (
            <Image style={styles.icon} source={newUncheckIcon} />
          ) : isIdInProgress || isIdApproved ? (
            <Image style={styles.icon} source={tickSelectedIcon} />
          ) : isIdApproved === false ? (
            <Image style={styles.icon} source={rejectDocIcon} />
          ) : (
            <Image style={styles.icon} source={newUncheckIcon} />
          )}

          {!!isCoach && (
            <>
              <Image
                style={styles.dottedLine}
                source={dottedLine}
                resizeMode="stretch"
              />
              {!coachCertificateId ? (
                <Image style={styles.icon} source={newUncheckIcon} />
              ) : isCoachCertiInProgress || isCoachCertiApproved ? (
                <Image style={styles.icon} source={tickSelectedIcon} />
              ) : isCoachCertiApproved === false ? (
                <Image style={styles.icon} source={rejectDocIcon} />
              ) : (
                <Image style={styles.icon} source={newUncheckIcon} />
              )}
            </>
          )}
        </View>
        {!!isCoach && (
          <TouchableOpacity
            style={{ marginTop: hp(4.5) }}
            onPress={() => onSelectDoc('certi')}>
            {!coachCertificateId ? (
              <View style={styles.selectedPhotoContainer}>
                <Image
                  source={CoachCertPlaceholder}
                  resizeMode="contain"
                  style={[
                    styles.selectedPhoto,
                    { tintColor: Colors.photIdRactangle },
                  ]}
                />
                <View style={styles.coachingCertTitleContainer}>
                  <Text style={styles.coachCertText}>COACHING</Text>
                  <Text style={styles.coachCertText}>CERTIFICATE</Text>
                </View>
              </View>
            ) : (
              <View style={styles.selectedPhotoContainer}>
                <FastImage
                  style={styles.selectedPhoto}
                  source={{ uri: coachCertificateId }}
                />
                <Image source={placeholderBorder} style={styles.photoBorder} />
              </View>
            )}
            {!coachCertificateId ? (
              <Text style={styles.noPhotoIdText}>
                For profile verification, try not to skip the process
              </Text>
            ) : (
              <View style={styles.photoIdUnderVerificationContainer}>
                {isCoachCertiApproved === false && (
                  <Image source={InfoIcon} style={styles.infoIcon} />
                )}
                {isCoachCertiInProgress ? (
                  <Text style={styles.docUnderVerificationText}>
                    Your document is under verification, We will notify once
                    verified.
                  </Text>
                ) : isCoachCertiApproved === false ? (
                  <View>
                    <Text style={styles.docUnderVerificationText}>
                      Your document is rejeted. Please upload right documents.
                    </Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => onSelectDoc('certi')}>
                      <Text style={styles.reuploadText}>
                        {' '}
                        Upload New Documents
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default Verification;

const styles = StyleSheet.create({
  coachCertText: {
    color: Colors.photIdRactangle,
    fontSize: 14,
    fontFamily: Fonts.Bold,
    lineHeight: 18,
  },
  coachingCertTitleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  approvalRejectImage: {
    width: wp(10),
    height: wp(10),
  },
  dottedLine: {
    flex: 1,
    tintColor: Colors.photIdRactangle,
  },
  leftLineContainer: {
    position: 'absolute',
    top: '13%',
    bottom: '23%',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reuploadText: {
    color: Colors.btnBg,
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 16,
    width: wp(52),
    textAlign: 'center',
  },
  docUnderVerificationText: {
    marginTop: hp(1.8),
    color: Colors.photIdRactangle,
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 16,
    width: wp(50),
    textAlign: 'center',
    marginHorizontal: wp(1),
  },
  infoIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.photIdRactangle,
  },
  fullScreen: {
    flex: 1,
    marginTop: hp(1),
  },
  container: {
    alignItems: 'center',
    marginTop: hp(5),
    width: '90%',
    alignSelf: 'center',
  },
  icon: {
    width: wp(10),
    height: wp(10),
  },
  selectedPhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  selectedPhoto: {
    height: wp(30),
    width: wp(46),
    borderRadius: wp(1.3),
  },
  photoBorder: {
    position: 'absolute',
    tintColor: Colors.photIdRactangle,
  },
  noPhotoIdText: {
    paddingTop: hp(1),
    color: Colors.greyTxtColor,
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 16,
    width: wp(50),
    textAlign: 'center',
    alignSelf: 'center',
  },
  photoIdUnderVerificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.7),
  },
});
