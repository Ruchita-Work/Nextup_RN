import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { FormActionPicker, FormInputPicker } from '../../common/FormInputs';
import { useLookup } from '../../../hooks/useLookup';

const HighSchoolForm = ({ onSelectDropdownValue, formik }) => {
  const { resetFilter, queryFilter, cities, states, schools } = useLookup();
  const _renderInputFilter = () => {
    return (
      <>
        <View width={'50%'} marginR-4>
          <FormInputPicker
            data={states ?? []}
            value={formik.values?.state || ''}
            label={'State'}
            title="Search for States"
            placeholder="Select State"
            onValueChange={value => {
              queryFilter('state', value?.value);
              onSelectDropdownValue(formik, 'state', value?.value);
              onSelectDropdownValue(formik, 'city', '');
            }}
          />
        </View>
        <View width={'50%'}>
          <FormInputPicker
            data={cities ?? []}
            label={'City'}
            value={formik.values?.city || ''}
            title="Search for city"
            placeholder="City"
            onValueChange={value => {
              queryFilter('city', value?.value);
              onSelectDropdownValue(formik, 'city', value?.value);
            }}
          />
        </View>
      </>
    );
  };

  return (
    <>
      <FormInputPicker
        value={formik.values.school}
        data={schools || []}
        required
        renderFilter={_renderInputFilter}
        label={'Team'}
        title="Search for team"
        placeholder="Select Team"
        error={formik.errors.school}
        onValueChange={value => {
          resetFilter();
          onSelectDropdownValue(formik, 'school', value?.value);
        }}
      />
      <View row spread style={styles.dropdownRow}>
        <View width={wp(44)}>
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
        <View width={wp(44)}>
          <FormActionPicker
            value={formik.values.level}
            required
            data={['Jr. Varsity', 'Varsity']}
            label={'Level'}
            placeholder="Select Level"
            onValueChange={value =>
              onSelectDropdownValue(formik, 'level', value)
            }
            error={formik.errors.level}
          />
        </View>
      </View>
    </>
  );
};

export default memo(HighSchoolForm);

const styles = StyleSheet.create({
  rowDropdownItem: { width: wp(40) },
  dropdownRow: { marginTop: hp(1) },
});
