import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import {
  FormActionPicker,
  FormInputField,
  FormInputPicker,
} from '../../common/FormInputs';
import { hp, wp } from '../../../utils/responsive';
import { View } from 'react-native-ui-lib';
import { customTheme } from '../../../constants';

const TravelTeamForm = ({
  formik,
  onSelectDropdownValue,
  statesData,
  citiesData,
}) => {
  const onChangeTeamName = text => {
    formik.setFieldValue('teamName', text);
    formik.setFieldError('teamName', text ? '' : 'Please enter team name');
  };

  return (
    <>
      <FormInputField
        required
        containerStyle={styles.schoolNameInput}
        label={'Team Name'}
        placeholder="Enter Team Name"
        value={formik.values.teamName}
        onChangeText={onChangeTeamName}
        error={formik.errors.teamName}
        onBlur={formik.handleBlur('teamName')}
        placeholderTextColor={customTheme.colors.$textNeutral}
      />
      <View row centerV spread style={{ marginBottom: hp(1) }}>
        <View width={wp(46)}>
          <FormInputPicker
            value={formik.values.state}
            data={statesData?.data || []}
            required
            label={'States'}
            title="States"
            placeholder="Select State"
            error={formik.errors.state}
            onValueChange={value => {
              onSelectDropdownValue(formik, 'state', value);
            }}
          />
        </View>
        <View width={wp(46)}>
          <FormInputPicker
            value={formik.values.city}
            data={citiesData || []}
            required
            label={'Cities'}
            disabled={!formik.values.state}
            title="Cities"
            placeholder="Select City"
            error={formik.errors.city}
            onValueChange={value => {
              onSelectDropdownValue(formik, 'city', value);
            }}
          />
        </View>
      </View>
      <View row spread style={styles.dropdownRow}>
        <View width={wp(46)}>
          <FormActionPicker
            value={formik.values.gender}
            data={['Boy', 'Girl']}
            required
            label={'Gender'}
            placeholder="Select Gender"
            onValueChange={value =>
              onSelectDropdownValue(formik, 'gender', value)
            }
            error={formik.errors.gender}
          />
        </View>
        <View width={wp(46)}>
          <FormActionPicker
            value={formik.values.ageGroup}
            required
            data={[
              '16U or 16 and Under',
              '17U or 17 and Under',
              '18U or 18 and Under',
            ]}
            title={'Select age group'}
            label={'Age Group'}
            placeholder="Select Age Group"
            onValueChange={value =>
              onSelectDropdownValue(formik, 'ageGroup', value)
            }
            error={formik.errors.ageGroup}
          />
        </View>
      </View>
    </>
  );
};

export default memo(TravelTeamForm);

const styles = StyleSheet.create({
  schoolNameInput: {
    flex: 0,
    marginBottom: hp(3),
    height: 'auto',
    width: '100%',
  },
  dropdownWithLimitedWidth: { width: wp(42) },
  dropdownRow: { marginTop: hp(1) },
});
