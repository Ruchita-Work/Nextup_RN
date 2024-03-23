import React from 'react';
import { StyleSheet } from 'react-native';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../utils/responsive';
import PrimaryButton from '../../../components/common/PrimaryButton';
import SetTimeModal from '../../../components/common/SetTimeModal';
import CalendarModal from '../../../components/common/CalendarModal';
import SelectionDropdown from '../../../components/common/SelectionDropdown';
import { View } from 'react-native-ui-lib';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useCreatePractice from '../../../hooks/useCreatePractice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppLoader from '../../../utils/Apploader';

export const CreatePractice = () => {
  const { bottom } = useSafeAreaInsets();

  const {
    dateValue,
    errors,
    handleSubmit,
    onConfirmTimeHandler,
    onSelectDateHandler,
    openDateCalendarHandler,
    openTimePickerHandler,
    selectedCalendarDate,
    setShowDatePicker,
    setShowTimePicker,
    showDatePicker,
    showTimePicker,
    timeModalInitialData,
    timeValue,
    onPressLocation,
    values,
    loading,
  } = useCreatePractice();

  return (
    <SafeAreaView edges={['top']} style={{ paddingBottom: bottom, flex: 1 }}>
      <Back title="Create Practice" containerStyle={styles.back} />
      {loading && <AppLoader />}
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.dropdownSelectionBody}>
          <SelectionDropdown
            title={'Location'}
            error={errors.location}
            isPicker={false}
            onPressValue={onPressLocation}
            value={values.location}
            placeholder="Select location"
          />
          <View row centerV spread style={styles.datTimeRowDropdown}>
            <SelectionDropdown
              title={'Date'}
              isPicker={false}
              onPressValue={openDateCalendarHandler}
              containerStyle={styles.dateTimeDropdown}
              value={dateValue}
              error={errors.date}
              placeholder="Select date"
            />
            <SelectionDropdown
              title={'Time'}
              isPicker={false}
              onPressValue={openTimePickerHandler}
              containerStyle={styles.dateTimeDropdown}
              value={timeValue}
              error={errors.time}
              placeholder="Select time"
            />
          </View>
        </View>
        <PrimaryButton
          style={styles.button}
          title={'Schedule'}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
      <SetTimeModal
        isVisible={showTimePicker}
        setIsVisible={setShowTimePicker}
        initialData={timeModalInitialData}
        onConfirmTime={onConfirmTimeHandler}
      />
      <CalendarModal
        isVisible={showDatePicker}
        setIsVisible={setShowDatePicker}
        onSelectDate={onSelectDateHandler}
        selectedDate={selectedCalendarDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    marginTop: hp(2),
    marginLeft: wp(5),
  },
  button: {
    marginHorizontal: wp(8),
    marginTop: 'auto',
    marginBottom: hp(4),
  },
  dropdownSelectionBody: {
    marginHorizontal: wp(6),
    marginTop: hp(5),
    rowGap: hp(2),
  },
  datTimeRowDropdown: {
    columnGap: wp(4),
  },
  dateTimeDropdown: {
    width: wp(40),
  },
});
