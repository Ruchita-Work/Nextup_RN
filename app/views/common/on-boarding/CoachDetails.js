import React from 'react';
import { View } from 'react-native-ui-lib';
import OnBoardingWrapper from '../../../components/common/OnBoardingWrapper';
import {
  FormInputField,
  FormInputPicker,
} from '../../../components/common/FormInputs';
import {
  useCoachPorfileDetails,
  useOnBoarding,
} from '../../../hooks/useOnBoarding';
import { Controller } from 'react-hook-form';
import { useLookup } from '../../../hooks/useLookup';

export default function CoachDetails() {
  const { handleOnBoarding, handleBack, handleCoachRegistration } =
    useOnBoarding();
  const { queryFilter, states, cities } = useLookup();

  const { control, handleSubmit, setValue, chekIfStateSelected } =
    useCoachPorfileDetails();

  const onSubmit = data => {
    handleOnBoarding(data, () => handleCoachRegistration(data));
  };

  return (
    <OnBoardingWrapper
      handleForm={handleSubmit(onSubmit)}
      label={'Confirm'}
      progress={60}
      title="Enter Coach Details"
      backButtonAction={handleBack}>
      <>
        <View row spread>
          <Controller
            name="personalInfo.firstName"
            control={control}
            rules={{
              required: 'Last Name is required',
              maxLength: {
                value: 50,
                message: 'Last Name must be less than 50 characters',
              },
              minLength: {
                value: 3,
                message: 'Last Name must be more than 3 characters',
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: 'Last Name must contain only alphabets',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View width={'50%'}>
                <FormInputField
                  label={'First Name'}
                  value={value ?? ''}
                  required
                  removeSpace
                  placeholder="Enter First Name"
                  onChangeText={onChange}
                  width={'50%'}
                  error={error && error?.message}
                />
              </View>
            )}
          />
          <Controller
            name="personalInfo.lastName"
            control={control}
            rules={{
              required: 'Last Name is required',
              maxLength: {
                value: 50,
                message: 'Last Name must be less than 50 characters',
              },
              minLength: {
                value: 3,
                message: 'Last Name must be more than 3 characters',
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: 'Last Name must contain only alphabets',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View width={'50%'}>
                <FormInputField
                  label={'Last Name'}
                  value={value ?? ''}
                  required
                  removeSpace
                  placeholder="Enter Last Name"
                  onChangeText={onChange}
                  width={'40%'}
                  error={error && error?.message}
                />
              </View>
            )}
          />
        </View>
        <View row>
          <Controller
            control={control}
            name="personalInfo.state"
            rules={{
              required: {
                value: true,
                message: 'Please select a state',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View width={'50%'}>
                <FormInputPicker
                  value={value}
                  data={states}
                  label={'State'}
                  required
                  title="Search for state.."
                  placeholder="Select State"
                  onValueChange={value => {
                    setValue('personalInfo.city', '');
                    queryFilter('state', value?.value);

                    onChange(value?.value);
                  }}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="personalInfo.city"
            render={({ field: { onChange, value } }) => (
              <View width={'50%'}>
                <FormInputPicker
                  value={value}
                  data={cities}
                  label={'City'}
                  title="Search for city.."
                  required
                  placeholder="Select City"
                  onValueChange={value => {
                    if (chekIfStateSelected()) {
                      onChange(value.value);
                    }
                  }}
                />
              </View>
            )}
          />
        </View>
      </>
    </OnBoardingWrapper>
  );
}
