import { useContext, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetListOfStatesAndCities } from '../api/onboarding.api';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAddTeamApi } from '../api/myteam.api';
import { errorToast } from '../utils/toast';
import { useAuth } from './useAuth';
import { getSeasonString, uploadImageApi } from '../utils/helper';
import { MyTeamsContext } from '../context/MyTeamsProvider';

const teamTypeOptions = [
  { label: 'High School', value: 'highSchool' },
  { label: 'Travel Team', value: 'travelTeam' },
];

const highSchoolSchema = Yup.object().shape({
  school: Yup.string().required('Please select school'),
  gender: Yup.string().required('Please select gender'),
  level: Yup.string().required('Please select level'),
});

const travelTeamSchema = Yup.object().shape({
  teamName: Yup.string().required('Please enter team name'),
  state: Yup.string().required('Please select state'),
  city: Yup.string().required('Please select city'),
  ageGroup: Yup.string().required('Please select age group'),
  gender: Yup.string().required('Please select gender'),
});

const HighSchoolLevelEnum = {
  'Jr. Varsity': 'JR_VARSITY',
  Varsity: 'VARSITY',
};

const TravelTeamAgeGroupEnum = {
  '16U or 16 and Under': 0,
  '17U or 17 and Under': 1,
  '18U or 18 and Under': 2,
};

const useAddNewTeam = () => {
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const { mutateAsync: addNewTeamMutation } = useAddTeamApi();
  const { user } = useAuth();
  const { selectedSeason } = useContext(MyTeamsContext);

  const [isLoading, setIsLoading] = useState(false);

  // Travel Team Option
  const [citiesData, setCitiesData] = useState([]);

  const { data: statesData, mutate: getListOfStates } =
    useGetListOfStatesAndCities();
  const { mutate: getListOfCities } = useGetListOfStatesAndCities();

  const [selectedTeamOption, setSelectedTeamOption] = useState('highSchool');

  const isHighSchoolSelected = useMemo(
    () => selectedTeamOption === 'highSchool',
    [selectedTeamOption],
  );

  const [profileImage, setProfileImage] = useState(null);

  const onSubmitFormHandler = async () => {
    if (!profileImage) {
      errorToast({
        title: 'Team image is mandatory',
        body: 'Please select a team image',
      });
      return;
    }

    try {
      setIsLoading(true);

      const teamImageUrl = (await uploadImageApi(profileImage))?.data?.data
        ?.imageUrl;

      const teamPayload = {
        name: isHighSchoolSelected
          ? highSchoolFormik.values.school
          : travelTeamFormik.values.teamName,
        teamLogo: teamImageUrl,
        ownerId: user?.id || null,
        recentSeasonType: selectedSeason || getSeasonString(),
        ...(!isHighSchoolSelected && {
          travelTeamInfo: {
            teamName: travelTeamFormik.values.teamName,
            state: travelTeamFormik.values.state,
            city: travelTeamFormik.values.city,
            gender: travelTeamFormik.values.gender,
            ageGroup: TravelTeamAgeGroupEnum[travelTeamFormik.values.ageGroup],
          },
        }),
        ...(isHighSchoolSelected && {
          highSchoolTeamInfo: {
            teamName: highSchoolFormik.values.school,
            gender: highSchoolFormik.values.gender,
            level: HighSchoolLevelEnum[highSchoolFormik.values.level],
          },
        }),
      };
      const response = await addNewTeamMutation(teamPayload);
      setIsLoading(false);
      if (response.success && !response.error) {
        // successToast({ title: 'Success', body: 'Team added successfully' });
        navigation.goBack();
      } else {
        throw new Error('Fail');
      }
    } catch (error) {
      setIsLoading(false);
      errorToast({
        title: 'Error',
        body: 'Failed to add team! Please try again after some time',
      });
    }
  };

  const highSchoolFormik = useFormik({
    initialValues: {
      school: '',
      gender: '',
      level: '',
      state: '',
      city: '',
    },
    onSubmit: onSubmitFormHandler,
    validationSchema: highSchoolSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const travelTeamFormik = useFormik({
    initialValues: {
      teamName: '',
      state: '',
      city: '',
      ageGroup: '',
      gender: '',
    },
    onSubmit: onSubmitFormHandler,
    validationSchema: travelTeamSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (isFocus) {
      getListOfStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);

  useEffect(() => {
    if (travelTeamFormik.values.state) {
      travelTeamFormik.setFieldValue('city', '');
      getListOfCities(
        { state: travelTeamFormik.values.state },
        { onSuccess: data => setCitiesData(data.data) },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelTeamFormik.values.state]);

  const onSelectDropdownValue = (_formik, key, value) => {
    _formik.setFieldValue(key, value);
    value && _formik.setFieldError(key, '');
  };

  const onSelectProfileImageHandler = imageResponse => {
    const newImageData = imageResponse?.assets?.[0] || null;
    setProfileImage(newImageData);
  };

  const onPressSaveHandler = isHighSchoolSelected
    ? highSchoolFormik.handleSubmit
    : travelTeamFormik.handleSubmit;

  const onTeamOptionChangeHandler = value => {
    if (value === 'travelTeam') {
      highSchoolFormik.setErrors({
        school: '',
        gender: '',
        level: '',
      });
    } else {
      travelTeamFormik.setErrors({
        city: '',
        state: '',
        teamName: '',
        ageGroup: '',
        gender: '',
      });
    }
    setSelectedTeamOption(value);
  };

  return {
    profileImage,
    onSelectProfileImageHandler,
    selectedTeamOption,
    onTeamOptionChangeHandler,
    isHighSchoolSelected,
    highSchoolFormik,
    onSelectDropdownValue,
    citiesData,
    travelTeamFormik,
    statesData,
    onPressSaveHandler,
    teamTypeOptions,
    isLoading,
  };
};

export default useAddNewTeam;
