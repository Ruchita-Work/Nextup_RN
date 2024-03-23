import { useFormik } from 'formik';
import moment from 'moment';
import { getStaticTimeData } from '../components/common/SetTimeModal';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MyTeamsContext } from '../context/MyTeamsProvider';
import { useCreatePracticeByCoach } from '../api/myteam.api';
import { errorToast } from '../utils/toast';

const padTime = val => String(val).padStart(2, '0');

const getInitialTimeData = () => {
  const timeData = getStaticTimeData();

  const currentDateMoment = moment();
  const currentHour =
    currentDateMoment.get('h') > 12
      ? currentDateMoment.get('h') - 12
      : currentDateMoment.get('h');
  const currentMinutes = currentDateMoment.get('minutes');
  const currentSeconds = currentDateMoment.get('seconds');
  const currentTimeType = currentDateMoment.format('A');

  const hourIndex = timeData.hours.findIndex(i => i === padTime(currentHour));
  const minuteIndex = timeData.minutes.findIndex(
    i => i === padTime(currentMinutes),
  );
  const secondsIndex = timeData.seconds.findIndex(
    i => i === padTime(currentSeconds),
  );
  const timeTypeIndex = timeData.timeTypes.findIndex(
    i => i === currentTimeType,
  );

  const newData = {
    selectedHour: { data: padTime(currentHour), index: hourIndex },
    selectedMinute: { data: padTime(currentMinutes), index: minuteIndex },
    selectedSecond: { data: padTime(currentSeconds), index: secondsIndex },
    selectedTimeType: { data: currentTimeType, index: timeTypeIndex },
  };

  return newData;
};

const practiceSchema = Yup.object().shape({
  location: Yup.string().required('Please select location'),
  date: Yup.string().required('Please select date'),
  time: Yup.string().required('Please select time'),
});

const useCreatePractice = () => {
  const navigation = useNavigation();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeModalData, setTimeModalData] = useState({
    isTimeSelected: false,
    selectedData: null,
    currentTimeData: getInitialTimeData(),
  });
  const [loading, setLoading] = useState(false);

  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const { mutateAsync: createPracticeMutation } = useCreatePracticeByCoach();

  const { values, setFieldValue, setFieldError, errors, handleSubmit } =
    useFormik({
      initialValues: {
        location: '',
        date: '',
        time: '',
        locationExtraData: {},
      },
      onSubmit: formData => {
        onSubmitHandler(formData);
      },
      validationSchema: practiceSchema,
      validateOnBlur: false,
      validateOnChange: false,
    });

  function parseDate(dateString) {
    const parts = dateString.match(
      /(\d+)-(\d+)-(\d+) (\d+):(\d+) ([APap][Mm])/,
    );
    if (!parts) {
      throw new Error('Invalid date format');
    }

    const year = parseInt(parts[3], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
    const day = parseInt(parts[2], 10);
    let hours = parseInt(parts[4], 10);
    const minutes = parseInt(parts[5], 10);
    const amPm = parts[6].toLowerCase();

    if (amPm === 'pm' && hours !== 12) {
      hours += 12;
    } else if (amPm === 'am' && hours === 12) {
      hours = 0;
    }

    return new Date(year, month, day, hours, minutes);
  }

  const onSubmitHandler = async data => {
    try {
      setLoading(true);

      const selectedDate = moment(data.date).format('MM-DD-YYYY');
      const selectedTime = data.time;

      const dateTime = selectedDate + ' ' + selectedTime;

      const dateObject = parseDate(dateTime);
      const unixTimestamp = dateObject.getTime();

      const createPracticePayload = {
        address: data.location,
        practiceDate: unixTimestamp,
        practiceTime: unixTimestamp,
      };

      const response = await createPracticeMutation({
        teamId: selectedTeam?.teamId,
        season: selectedSeason,
        payload: createPracticePayload,
      });

      if (response.success && !response.error) {
        navigation.goBack();
      } else {
        throw new Error('Fail');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast({
        title: 'Error',
        body: 'Failed to create practice! Please try again after some time',
      });
    }
  };

  const openTimePickerHandler = () => {
    setTimeModalData(prevValue => ({
      ...prevValue,
      currentTimeData: getInitialTimeData(),
    }));
    setShowTimePicker(true);
  };

  const getSelectedTimeString = data => {
    return `${data?.selectedHour?.data}:${data?.selectedMinute?.data} ${data?.selectedTimeType?.data}`;
  };

  const onConfirmTimeHandler = data => {
    setFieldValue('time', getSelectedTimeString(data));
    setFieldError('time', '');
    setTimeModalData(prevValue => ({
      ...prevValue,
      isTimeSelected: true,
      selectedData: data,
    }));
  };

  const openDateCalendarHandler = () => {
    setShowDatePicker(true);
  };

  const timeValue = timeModalData.isTimeSelected
    ? getSelectedTimeString(timeModalData.selectedData)
    : '';

  const dateValue = values.date ? values.date.format('DD MMMM YYYY') : '';

  const timeModalInitialData = timeModalData.isTimeSelected
    ? timeModalData.selectedData
    : timeModalData.currentTimeData;

  const onSelectDateHandler = date => {
    setShowDatePicker(false);
    setFieldValue('date', moment(date.timestamp));
    setFieldError('date', '');
  };

  const selectedCalendarDate = values.date
    ? values.date.format('YYYY-MM-DD')
    : '';

  const onSelectLocation = (locationData, locationExtraDetails) => {
    const locationString = locationData?.description || '';
    setFieldValue('location', locationString);
    setFieldError('location', locationString ? '' : 'Please select location');
    setFieldValue('locationExtraData', {
      locationData,
      locationExtraDetails,
    });
  };

  const onPressLocation = () => {
    navigation.navigate('GoogleAutoCompleteScreen', { onSelectLocation });
  };

  return {
    errors,
    openDateCalendarHandler,
    dateValue,
    openTimePickerHandler,
    timeValue,
    handleSubmit,
    showTimePicker,
    setShowTimePicker,
    timeModalInitialData,
    onConfirmTimeHandler,
    showDatePicker,
    setShowDatePicker,
    onSelectDateHandler,
    selectedCalendarDate,
    onPressLocation,
    values,
    loading,
  };
};

export default useCreatePractice;
