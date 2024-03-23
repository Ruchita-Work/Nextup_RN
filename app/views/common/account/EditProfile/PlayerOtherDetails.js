import * as React from 'react';
import { View } from 'react-native-ui-lib';
import { FormMaskedInput } from '../../../../components/common/FormInputs';
import { hp } from '../../../../utils/responsive';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function PlaayerOtherDetails({ formik }) {
  const { handleChange, handleBlur, values, touched, errors, setFieldValue } =
    formik;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: hp(5) }}>
      <View marginT-32>
        <View row centerH spread>
          <FormMaskedInput
            label={'Height'}
            tailLabel={'FEET'}
            placeholder="Enter Height"
            required
            keyboardType="numeric"
            value={values?.heightFeet ?? ''}
            onBlur={handleBlur('heightFeet')}
            error={touched.heightFeet && errors.heightFeet}
            onChangeText={handleChange('heightFeet')}
            onValueChange={pickvalue => {
              setFieldValue('heightFeet', pickvalue);
            }}
          />
          <FormMaskedInput
            label={'Height'}
            tailLabel={'INCHES'}
            placeholder="Enter Height"
            required
            value={values?.heightInches ?? ''}
            onBlur={handleBlur('heightInches')}
            error={touched.heightInches && errors.heightInches}
            onChangeText={handleChange('heightInches')}
            onValueChange={pickvalue => {
              setFieldValue('heightInches', pickvalue);
            }}
            keyboardType="numeric"
          />
        </View>
        <FormMaskedInput
          label={'Weight'}
          value={values.weight ?? ''}
          tailLabel={'LBS'}
          placeholder="Enter Weight"
          onChangeText={handleChange('weight')}
          required
          onValueChange={pickvalue => {
            setFieldValue('weight', pickvalue);
          }}
          error={touched.weight && errors.weight}
          keyboardType="numeric"
          onBlur={handleBlur('weight')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
export default PlaayerOtherDetails;
