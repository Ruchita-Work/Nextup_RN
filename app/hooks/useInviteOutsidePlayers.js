import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  useInviteNewAdminRole,
  useInviteOutsidePlayer,
} from '../api/myteam.api';
import { useAuth } from './useAuth';
import { getInvitePlayerDynamicLink } from '../utils/helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { errorToast } from '../utils/toast';
import { useContext, useState } from 'react';
import { MyTeamsContext } from '../context/MyTeamsProvider';
import useInviteShare from './useInviteShare';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter full name'),
  email: Yup.string()
    .required('Please enter email')
    .email('Please enter a valid email'),
  phoneNumber: Yup.string()
    .required('Please enter phone number')
    .length(10, 'Phone number should be 10 characters long'),
});

const useInviteOutsidePlayers = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { params } = useRoute();
  const { openShareSheet } = useInviteShare();

  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const { mutateAsync: inviteOutsidePlayerMutation } = useInviteOutsidePlayer();
  const { mutateAsync: inviteNewAdminRoleMutation } = useInviteNewAdminRole();

  const invitePlayerHandler = async inviteData => {
    const inviteLink = await getInvitePlayerDynamicLink(user?.id);
    const invitePlayerPayload = {
      fullName: inviteData?.fullName || null,
      emailId: inviteData?.email?.trim().toLowerCase() || null,
      contactNumber:
        inviteData?.phoneNumber?.email?.trim().toLowerCase() || null,
      seasonName: selectedSeason,
      sharedLink: inviteLink,
      playerPositions: '0',
    };
    return await inviteOutsidePlayerMutation({
      teamId: selectedTeam?.teamId,
      payload: invitePlayerPayload,
    });
  };

  const inviteAdmin = async inviteData => {
    const adminPayload = {
      emailId: inviteData?.email?.trim().toLowerCase() || null,
      ownerId: user?.id,
      teamId: +selectedTeam?.teamId,
      role: params?.role || null,
      coachId: user?.id,
      season: selectedSeason,
      contactNumber:
        inviteData?.phoneNumber?.email?.trim().toLowerCase() || null,
    };
    return await inviteNewAdminRoleMutation({ payload: adminPayload });
  };

  const onSubmitHandler = async data => {
    try {
      setLoading(true);
      let response = null;
      if (params?.isAddStaff) {
        response = await inviteAdmin(data);
      } else {
        response = await invitePlayerHandler(data);
      }
      if (response.success && !response.error) {
        navigation.goBack();
      } else {
        throw new Error('Fail');
      }
    } catch (error) {
      errorToast({
        title: 'Error',
        body: `Failed to invite ${
          params?.isAddStaff ? 'staff' : 'player'
        }! Please try again after some time`,
      });
    } finally {
      setLoading(false);
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        fullName: '',
        email: '',
        phoneNumber: '',
      },
      onSubmit: onSubmitHandler,
      validationSchema: validationSchema,
    });

  return {
    onPressShareHandler: openShareSheet,
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    loading,
    routeParams: params,
  };
};

export default useInviteOutsidePlayers;
