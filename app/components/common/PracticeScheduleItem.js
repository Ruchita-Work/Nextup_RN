import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-ui-lib';
import { hp, wp } from '../../utils/responsive';
import { Colors, customTheme } from '../../constants';
import moment from 'moment';
import { errorToast } from '../../utils/toast';
import PracticeInfoModal from './PracticeInfoModal';

const PracticeScheduleItem = ({ data, disabled = false }) => {
  const [isCheckinModalVisible, setIsCheckinModalVisible] = useState(false);
  const [isPracticeCompleteModalVisible, setIsPracticeCompleteModalVisible] =
    useState(false);

  const practiceDate = data?.practiceDate
    ? moment(data?.practiceDate).format('DD MMMM YYYY,')
    : '-';

  const practiceTime = data?.practiceTime
    ? moment(data?.practiceTime).format('HH:mm')
    : '-';

  const handleOnPressPractice = () => {
    const isPracticeComplete = moment().unix() >= data?.practiceTime;
    if (isPracticeComplete) {
      setIsPracticeCompleteModalVisible(true);
    } else {
      setIsCheckinModalVisible(true);
    }
  };

  const handleCheckin = () => {
    // TODO : CHECK IN API INTEGRATION COACH SHOULD BE NOTIFIED
    setIsCheckinModalVisible(false);
  };

  const handleScheduleNavigate = () => {
    if (data?.address) {
      const scheme = Platform.select({
        ios: 'maps://0,0?q=',
        android: 'geo:0,0?q=',
      });
      const encodedAddress = encodeURIComponent(data.address);
      const url = Platform.select({
        ios: `${scheme}${encodedAddress}`,
        android: `${scheme}${encodedAddress}`,
      });
      Linking.openURL(url);
    } else {
      errorToast({
        title: 'Error',
        body: 'Address not found for this practice',
      });
    }
    setIsCheckinModalVisible(false);
  };

  const handleSelectCompleteModalOption = () => {
    // TODO : API INTEGRATION
    setIsPracticeCompleteModalVisible(false);
  };

  const checkInModalButtons = [
    { title: 'Check In', onPress: handleCheckin, color: Colors.darkRed },
    {
      title: 'Navigate',
      onPress: handleScheduleNavigate,
      color: Colors.btnBg,
    },
  ];

  const practiceCompleteButtons = [
    {
      title: 'Offense',
      onPress: handleSelectCompleteModalOption.bind(null, 'Offense'),
      color: Colors.darkRed,
    },
    {
      title: 'Defense',
      onPress: handleSelectCompleteModalOption.bind(null, 'Defense'),
      color: Colors.btnBg,
    },
  ];

  const checkinModalTitle = `Team Practice at ${moment
    .unix(data?.practiceDate)
    .format('HH A')}`;

  const checkInModalDescription = `Location: ${data?.address} Practice in 15 mins`;

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={styles.container}
        activeOpacity={0.7}
        onPress={handleOnPressPractice}>
        <Image
          style={styles.practiceImage}
          source={require('../../assets/rectangle-copy.png')}
          resizeMode="cover"
        />
        <Text medium-600 style={styles.title}>
          {`${practiceDate} ${practiceTime}`}
        </Text>
      </TouchableOpacity>
      <PracticeInfoModal
        isVisible={isCheckinModalVisible}
        title={checkinModalTitle}
        description={checkInModalDescription}
        buttons={checkInModalButtons}
        setIsVisible={setIsCheckinModalVisible}
      />
      <PracticeInfoModal
        isVisible={isPracticeCompleteModalVisible}
        title={'Practice Complete'}
        description={'You’ve finished practice! What did you work on?'}
        buttons={practiceCompleteButtons}
        setIsVisible={setIsPracticeCompleteModalVisible}
      />
    </>
  );
};

export default PracticeScheduleItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: customTheme.colors.gray_500,
    borderRadius: wp(2),
    padding: wp(2),
    marginBottom: wp(5),
  },
  practiceImage: { height: hp(12.5), width: '100%' },
  title: { marginTop: hp(2) },
});
