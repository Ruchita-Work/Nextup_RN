import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import {
  useLocationDetails,
  useOnBoarding,
} from '../../../hooks/useOnBoarding';
import { ScreenHeader } from '../../../components/common/ScreenHeader';
import { FlatList } from 'react-native-gesture-handler';
import { customTheme } from '../../../constants';
import { FormInputPicker } from '../../../components/common/FormInputs';

export default function SelectCoachingLocation() {
  const {
    handleOnBoarding,
    handleNavigation,
    handleBack,
    states,
    schools,
    handleCoachRegistration,
  } = useOnBoarding();
  const { control, cities, handleSubmit, chekIfStateSelected } =
    useLocationDetails();

  const onSubmit = data => {
    handleOnBoarding(data, () => {
      handleNavigation('CoachDetails');
    });
  };

  const _renderItems = ({ item, index }) => (
    <TouchableOpacity marginB-32 key={index}>
      <Text
        white
        style={{
          fontSize: customTheme.fontSizes.size_16,
          fontFamily: customTheme.fontFamily.robotoMedium,
        }}>
        {item?.label || item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{ flex: 1, paddingHorizontal: customTheme.spacings.spacing_16 }}>
      <ScreenHeader
        title="Select Coaching Location"
        backButtonAction={() => null}
      />
      <FormInputPicker data={states ?? []} label={'State'} />
      <FlatList
        data={schools ?? []}
        keyExtractor={(item, index) => index.toString()}
        StickyHeaderComponent={() => <Text>Hi</Text>}
        renderItem={_renderItems}
      />
    </View>
  );
}
