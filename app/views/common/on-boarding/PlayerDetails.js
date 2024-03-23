import React from 'react';
import { View } from 'react-native-ui-lib';
import {
  FormDatePicker,
  FormInputField,
  FormInputPicker,
  FormMaskedInput,
} from '../../../components/common/FormInputs';
import {
  useEnterPorfileDetails,
  useOnBoarding,
} from '../../../hooks/useOnBoarding';
import { Controller } from 'react-hook-form';
import OnBoardingWrapper from '../../../components/common/OnBoardingWrapper';
import { useLookup } from '../../../hooks/useLookup';

export default function PlayerDetails() {
  const { handleOnBoarding, handleNavigation, handleBack } = useOnBoarding();
  const { control, setValue, handleSubmit } = useEnterPorfileDetails();
  const { states, cities, queryFilter } = useLookup();

  const onSubmit = data => {
    data.personalInfo.height = `${data.personalInfo.height}/${data.personalInfo.height1}`;
    delete data.personalInfo.height1;
    handleOnBoarding(data, () => {
      handleNavigation('PlayerStyle');
    });
  };

  return (
    <OnBoardingWrapper
      backButtonAction={handleBack}
      handleForm={handleSubmit(onSubmit)}
      title="Enter Profile Details"
      label={'Confirm'}
      progress={40}>
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
                  width={'40%'}
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
        <Controller
          name="personalInfo.dateOfBirth"
          control={control}
          rules={{ required: 'Date of Birth is required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <FormDatePicker
                label={'Date of Birth'}
                placeholder="Select date"
                value={value ?? null}
                onChange={onChange}
                required
                error={error && error?.message}
              />
            );
          }}
        />
        <View row>
          <Controller
            name="personalInfo.state"
            control={control}
            rules={{
              required: 'State is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View width={'50%'}>
                <FormInputPicker
                  value={value ?? null}
                  data={states}
                  label={'State'}
                  required
                  title="Search for state"
                  placeholder="Select State"
                  onValueChange={value => {
                    queryFilter('state', value?.value);
                    setValue('personalInfo.city', '');
                    onChange(value.value);
                  }}
                  error={error && error?.message}
                />
              </View>
            )}
          />
          <Controller
            name="personalInfo.city"
            control={control}
            rules={{
              required: 'City is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View width={'50%'}>
                <FormInputPicker
                  required
                  value={value ?? null}
                  data={cities}
                  label={'City'}
                  title="Search for city"
                  placeholder="Select City"
                  onValueChange={value => {
                    onChange(value.value);
                  }}
                  error={error && error?.message}
                />
              </View>
            )}
          />
        </View>

        <View row centerH spread>
          <Controller
            name="personalInfo.height"
            control={control}
            rules={{
              required: 'Height is required',
            }}
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <FormMaskedInput
                label={'Height'}
                value={value ?? ''}
                tailLabel={'FEET'}
                placeholder="Enter Height"
                onChangeText={onChange}
                onValueChange={pickvalue => {
                  onChange(pickvalue);
                }}
                error={error && error?.message}
                data={[
                  {
                    label: 'FEET',
                    value: 'FEET',
                  },
                ]}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            name="personalInfo.height1"
            control={control}
            rules={{
              required: 'Height is required',
            }}
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <FormMaskedInput
                label={'Height'}
                value={value ?? ''}
                tailLabel={'INCHES'}
                placeholder="Enter Height"
                onChangeText={onChange}
                onValueChange={pickvalue => {
                  onChange(pickvalue);
                }}
                error={error && error?.message}
                data={[
                  {
                    label: 'INCH',
                    value: 'INCH',
                  },
                ]}
                keyboardType="numeric"
              />
            )}
          />
        </View>
        <Controller
          name="personalInfo.weight"
          control={control}
          rules={{
            required: 'Weight is required',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormMaskedInput
              label={'Weight'}
              value={value ?? ''}
              tailLabel={'LBS'}
              placeholder="Enter Weight"
              onChangeText={onChange}
              onValueChange={pickvalue => {
                onChange(pickvalue);
              }}
              data={[
                {
                  label: 'LBS',
                  value: 'LBS',
                },
              ]}
              error={error && error?.message}
              keyboardType="numeric"
            />
          )}
        />
      </>
    </OnBoardingWrapper>
  );
}
