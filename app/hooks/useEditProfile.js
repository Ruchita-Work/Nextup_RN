import { useFormik } from 'formik';
import { useEditUserProfile, useGetBasicUserInfo } from '../api/user.api';
import {
  editCoachValidationSchema,
  editPlayerValidationSchema,
} from '../validations/editProfileValidations';
import { useEffect, useState } from 'react';
import { errorToast } from '../utils/toast';
import { uploadImageApi } from '../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './useAuth';

const useEditProfile = () => {
  const navigation = useNavigation();
  const { updateUserData, user } = useAuth();
  const { data: basicUserInfoResponse, isLoading: isLoadingBasicUserInfo } =
    useGetBasicUserInfo();
  const { mutateAsync: mutateEditProfile } = useEditUserProfile();
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);

  const updateUserProfileImage = async formImage => {
    if (
      formImage?.uri !==
      basicUserInfoResponse?.data?.personalInfo?.profilePictureURL
    ) {
      const res = await uploadImageApi(formImage);
      return res?.data?.data?.imageUrl;
    } else {
      return formImage?.uri;
    }
  };

  const updatePhotoIdImage = async formImage => {
    if (formImage?.uri !== basicUserInfoResponse?.data?.coachInfo?.idProofUrl) {
      const res = await uploadImageApi({
        uri: formImage.uri,
        fileName: formImage.filename,
        type: formImage.mime,
      });
      return res?.data?.data?.imageUrl;
    } else {
      return formImage?.uri;
    }
  };

  const updateCoachCertImage = async formImage => {
    if (
      formImage?.uri !== basicUserInfoResponse?.data?.coachInfo?.certificateUrl
    ) {
      const res = await uploadImageApi({
        uri: formImage.uri,
        fileName: formImage.filename,
        type: formImage.mime,
      });
      return res?.data?.data?.imageUrl;
    } else {
      return formImage?.uri;
    }
  };

  const onEditCoachHandler = async form => {
    try {
      setIsLoadingUpdateProfile(true);
      const imageUrl = await updateUserProfileImage(form?.profileImage);
      const idProofUrl = await updatePhotoIdImage(form?.idDoc);
      const coachCertUrl = await updateCoachCertImage(form?.coachCert);

      const payload = {
        personalInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          contactNumber: form.phoneNumber,
        },
        profilePictureUrl: imageUrl,
        idProofUrl: idProofUrl,
        certificateUrl: coachCertUrl,
      };
      await mutateEditProfile({ data: payload });
      updateUserData({
        personalInfo: {
          ...user?.personalInfo,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          contactNumber: form.phoneNumber,
          profilePictureURL: imageUrl,
        },
      });
      navigation.goBack();
    } catch (error) {
      errorToast({ title: 'Failed to update profile' });
    } finally {
      setIsLoadingUpdateProfile(false);
    }
  };

  const onEditPlayerHandler = async form => {
    try {
      setIsLoadingUpdateProfile(true);
      const imageUrl = await updateUserProfileImage(form?.profileImage);
      const payload = {
        personalInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          dateOfBirth: form.dob,
          email: form.email,
          height: `${form.heightFeet}/${form.heightInches}`,
          weight: form.weight,
        },
        profilePictureUrl: imageUrl,
      };
      await mutateEditProfile({ data: payload });
      updateUserData({
        personalInfo: {
          ...user?.personalInfo,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          dateOfBirth: form.dob,
          height: `${form.heightFeet}/${form.heightInches}`,
          weight: form.weight,
          profilePictureURL: imageUrl,
        },
      });
      navigation.goBack();
    } catch (error) {
      errorToast({ title: 'Failed to update profile' });
    } finally {
      setIsLoadingUpdateProfile(false);
    }
  };

  const editCoachFormik = useFormik({
    editCoachValidationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      profileImage: null,
      idDoc: null,
      coachCert: null,
    },
    onSubmit: onEditCoachHandler,
  });

  const editPlayerFormik = useFormik({
    editPlayerValidationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      profileImage: null,
      dob: '',
      heightFeet: '',
      heightInches: '',
      weight: '',
    },
    onSubmit: onEditPlayerHandler,
  });

  useEffect(() => {
    if (basicUserInfoResponse?.success && basicUserInfoResponse?.data) {
      const userData = basicUserInfoResponse?.data;
      const _isCoach = userData?.typeOfUser === 'COACH';
      const _isPlayer = userData?.typeOfUser === 'PLAYER';
      const userPersonalInfo = userData?.personalInfo;
      const heightFeet = userPersonalInfo?.height?.split?.('/')?.[0];
      const heightInches = userPersonalInfo?.height?.split?.('/')?.[1];

      if (_isCoach) {
        editCoachFormik.setFieldValue('firstName', userPersonalInfo?.firstName);
        editCoachFormik.setFieldValue('lastName', userPersonalInfo?.lastName);
        editCoachFormik.setFieldValue('email', userPersonalInfo?.email);
        editCoachFormik.setFieldValue('profileImage', {
          uri: userPersonalInfo?.profilePictureURL,
        });
        editCoachFormik.setFieldValue(
          'phoneNumber',
          userPersonalInfo?.contactNumber,
        );
        editCoachFormik.setFieldValue('idDoc', {
          uri: userData?.coachInfo?.idProofUrl,
        });
        editCoachFormik.setFieldValue('coachCert', {
          uri: userData?.coachInfo?.certificateUrl,
        });
      }

      if (_isPlayer) {
        editPlayerFormik.setFieldValue(
          'firstName',
          userPersonalInfo?.firstName,
        );
        editPlayerFormik.setFieldValue('lastName', userPersonalInfo?.lastName);
        editPlayerFormik.setFieldValue('email', userPersonalInfo?.email);
        editPlayerFormik.setFieldValue('profileImage', {
          uri: userPersonalInfo?.profilePictureURL,
        });
        editPlayerFormik.setFieldValue('dob', userPersonalInfo?.dateOfBirth);
        editPlayerFormik.setFieldValue('heightFeet', heightFeet);
        editPlayerFormik.setFieldValue('heightInches', heightInches);
        editPlayerFormik.setFieldValue('weight', userPersonalInfo?.weight);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicUserInfoResponse]);
  const loading = isLoadingBasicUserInfo || isLoadingUpdateProfile;

  return {
    loading,
    isLoadingUpdateProfile,
    isLoadingBasicUserInfo,
    editCoachFormik,
    editPlayerFormik,
    basicUserInfoResponse,
  };
};

export default useEditProfile;
