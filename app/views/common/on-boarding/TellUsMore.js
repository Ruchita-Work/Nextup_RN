import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { customTheme } from '../../../constants';
import { useOnBoarding, useTellUsMore } from '../../../hooks/useOnBoarding';
import { appImages } from '../../../constants/appImages';
import OnBoardingWrapper from '../../../components/common/OnBoardingWrapper';
import {
  FormActionPicker,
  FormInputField,
  FormInputPicker,
  FormRadioGroup,
  FormSelectable,
} from '../../../components/common/FormInputs';
import { Controller } from 'react-hook-form';
import { useLookup } from '../../../hooks/useLookup';

export default function TellUsMore() {
  const { handleOnBoarding, handleNavigation, handleBack } = useOnBoarding();
  const {
    control,
    playerPosition,
    playerImg,
    isPlayer,
    isCoach,
    isTravelTeam,
    resetField,
    setValue,
    chekIfStateSelected,
    handleSubmit,
  } = useTellUsMore();
  const {
    resetFilter,
    queryFilter,
    schools,
    cities,
    states,
    classOfYears,
    query,
  } = useLookup();

  const onSubmit = data => {
    handleOnBoarding(data, () => {
      const screenName = isPlayer ? 'PlayerDetails' : 'CoachDetails';
      handleNavigation(screenName);
    });
  };

  const _renderInputFilter = () => {
    return (
      <>
        <View width={'50%'} marginR-4>
          <FormInputPicker
            data={states ?? []}
            value={query?.state ?? ''}
            label={'State'}
            title="Search for States"
            placeholder="Select State"
            onValueChange={value => {
              queryFilter('state', value?.value);
            }}
          />
        </View>
        <View width={'50%'}>
          <FormInputPicker
            data={cities ?? []}
            label={'City'}
            value={query?.city}
            title="Search for city"
            placeholder="City"
            onValueChange={value => {
              queryFilter('city', value?.value);
            }}
          />
        </View>
      </>
    );
  };

  const _renderPlayerInputs = () => (
    <>
      <Controller
        name="gender"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormRadioGroup
            label={'Gender'}
            value={value}
            onValueChange={value => {
              resetFilter();
              // reset()
              onChange(value);
            }}
            radioValues={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
          />
        )}
      />
      <Controller
        control={control}
        name="schoolInfo.name"
        rules={{ required: 'Please select a school' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <FormInputPicker
              value={value?.value || value}
              data={schools ?? []}
              required
              renderFilter={() => {
                return _renderInputFilter(value);
              }}
              label={'School'}
              title="Search for Schools"
              placeholder="Select School"
              onValueChange={value => {
                resetFilter();
                setValue('schoolInfo', value);
                onChange(value.value);
              }}
              error={error && error?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="schoolInfo.classOff"
        rules={{ required: 'Please select a class of' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View width={'50%'}>
            <FormInputPicker
              value={value}
              required
              data={classOfYears ?? []}
              label={'Class Of'}
              title="Search for class of"
              placeholder="Select Class of"
              onValueChange={value => {
                onChange(value.value);
              }}
              error={error && error?.message}
            />
          </View>
        )}
      />
    </>
  );
  const _renderCoachSubInputs = () => (
    <>
      <View row>
        <View width={'50%'}>
          <Controller
            control={control}
            name="schoolInfo.name"
            rules={{ required: 'Please select a team' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <FormInputPicker
                  value={value?.value || value}
                  data={schools ?? []}
                  required
                  renderFilter={() => {
                    return _renderInputFilter(value);
                  }}
                  label={'Team'}
                  title="Search for team"
                  placeholder="Select Team"
                  onValueChange={value => {
                    resetFilter();
                    setValue('schoolInfo', value);
                    onChange(value.value);
                  }}
                  error={error && error?.message}
                />
              );
            }}
          />
        </View>

        <Controller
          control={control}
          name="schoolInfo.gender"
          rules={{ required: 'Please select a gender' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View width={'50%'}>
              <FormActionPicker
                value={value}
                data={['Boy', 'Girl']}
                required
                label={'Gender'}
                placeholder="Select Gender"
                onValueChange={value => onChange(value)}
                error={error && error?.message}
              />
            </View>
          )}
        />
      </View>
      <View width={'50%'}>
        <Controller
          control={control}
          name="coachingType.ageGroup"
          rules={{ required: 'Please select a level' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <FormActionPicker
                value={value}
                required
                data={['Jr & Varsity', 'Varsity', 'Both']}
                label={'Level'}
                placeholder="Select Level"
                onValueChange={value => onChange(value)}
                error={error && error?.message}
              />
            </>
          )}
        />
      </View>
    </>
  );
  const _renderCaochInputs = () => (
    <>
      <Controller
        name="coachingType.typeOfCoaching"
        control={control}
        rules={{ required: 'Please select a option' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormRadioGroup
            label={'Option'}
            value={value}
            onValueChange={value => {
              resetField('coachingType.state', '');
              resetField('coachingType.city', '');
              resetField('coachingType.ageGroup', '');
              resetField('schoolInfo', '');
              resetField('onBoardingTeamName', '');
              resetFilter();
              onChange(value);
            }}
            radioValues={[
              { label: 'High School', value: 'HIGH_SCHOOL' },
              { label: 'Travel Team', value: 'TRAVEL_TEAM' },
            ]}
            required
            error={error && 'Please select a option'}
          />
        )}
      />
      {isTravelTeam ? _renderTravelTeamInputs() : _renderCoachSubInputs()}
    </>
  );
  const _renderTravelTeamInputs = () => (
    <>
      <Controller
        name="onBoardingTeamName"
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
          <FormInputField
            label={'Team Name'}
            placeholder={'Enter Team Name'}
            value={value ?? ''}
            onChangeText={onChange}
            required
            error={error && error?.message}
          />
        )}
      />
      <View row>
        <Controller
          control={control}
          name="coachingType.state"
          rules={{ required: 'Please select a state' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            // console.log('value', states);
            console.log('vaelue', value);
            return (
              <View width={'50%'}>
                <FormInputPicker
                  value={value}
                  data={states ?? []}
                  required
                  label={'States'}
                  placeholder="Select State"
                  title="Search for states"
                  onValueChange={value => {
                    resetFilter();
                    queryFilter('state', value?.value);
                    resetField('coachingType.city', '');
                    onChange(value?.value);
                  }}
                  error={error && error?.message}
                />
              </View>
            );
          }}
        />
        <Controller
          control={control}
          name="coachingType.city"
          rules={{ required: 'Please select a city' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View width={'50%'}>
              <FormInputPicker
                value={value}
                required
                data={cities ?? []}
                label={'Cities'}
                title="Search for cities.."
                placeholder="Select City"
                onValueChange={value => {
                  if (chekIfStateSelected()) {
                    onChange(value?.value);
                  }
                }}
                error={error && error?.message}
              />
            </View>
          )}
        />
      </View>
      <View row spread centerH>
        <Controller
          control={control}
          name="schoolInfo.gender"
          rules={{ required: 'Please select a gender' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormActionPicker
              value={value}
              data={['Boys', 'Girls']}
              placeholder="Select Gender"
              required
              label={'Gender'}
              title="Search for cities.."
              onValueChange={value => onChange(value)}
              error={error && error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="coachingType.ageGroup"
          required
          rules={{ required: 'Please select a age group' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormActionPicker
              value={value}
              data={['14 & Under', '15 & Under', '17 & Under']}
              required
              label={'Age Group'}
              placeholder="Select Age Group"
              title="Search for cities.."
              onValueChange={value => onChange(value)}
              error={error && error?.message}
            />
          )}
        />
      </View>
    </>
  );
  return (
    <OnBoardingWrapper
      handleForm={handleSubmit(onSubmit)}
      backButtonAction={handleBack}
      label={'Confirm'}
      progress={10}>
      <View style={{ marginVertical: customTheme.spacings.spacing_16 }}>
        <Text
          style={{
            color: customTheme.colors.light,
            fontSize: customTheme.fontSizes.size_32,
            fontFamily: customTheme.fontFamily.robotoMedium,
          }}>
          Tell us
        </Text>
        <Text
          style={{
            color: customTheme.colors.light,
            fontSize: customTheme.fontSizes.size_32,
            fontWeight: '700',
            fontFamily: customTheme.fontFamily.robotoBold,
          }}>
          more
        </Text>
      </View>
      {/* From here the form content is display */}

      <View style={{ marginTop: customTheme.spacings.spacing_20 }}>
        <Controller
          control={control}
          name="typeOfUser"
          render={({ field: { onChange, value } }) => (
            <FormSelectable
              value={value ?? null}
              onChange={value => {
                resetFilter();
                resetField('schoolInfo', '');
                onChange(value);
              }}
              data={[
                {
                  label: 'PLAYER',
                  value: 'PLAYER',
                  imgSrc: playerImg[playerPosition],
                },
                {
                  label: 'COACH',
                  value: 'COACH',
                  imgSrc: appImages.coachOnboardingIcon,
                },
              ]}
            />
          )}
        />
        {isPlayer && _renderPlayerInputs()}
        {isCoach && _renderCaochInputs()}
      </View>
    </OnBoardingWrapper>
  );
}
