import { StyleSheet } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Back from '../../utils/HeaderButtons/Back';
import { hp, wp } from '../../utils/responsive';
import { useNavigation, useRoute } from '@react-navigation/native';
import { customTheme } from '../../constants';
import { ViewContainer } from '../../components/common/ViewConatiner';

const GoogleAutoCompleteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const onPressLocationHandler = (data = null, details = null) => {
    if (route.params?.onSelectLocation) {
      route.params.onSelectLocation?.(data, details);
    }
    navigation.goBack();
  };

  return (
    <ViewContainer>
      <Back containerStyle={styles.back} title="Select Location" />
      <GooglePlacesAutocomplete
        styles={{
          container: styles.autoCompleteContainer,
          textInput: { color: customTheme.colors.black },
          description: { color: customTheme.colors.black },
        }}
        textInputProps={{
          placeholderTextColor: customTheme.colors.txtFieldPlaceHolder,
        }}
        placeholder="Search"
        fetchDetails={false} // ! change this to true if lat long are needed
        onPress={onPressLocationHandler}
        query={{
          key: 'AIzaSyD7_xFub7aZNysOmazideo804WlJG9IeYc',
          language: 'en',
          components: 'country:us',
        }}
        debounce={500}
      />
    </ViewContainer>
  );
};

export default GoogleAutoCompleteScreen;

const styles = StyleSheet.create({
  back: { marginTop: hp(2), marginLeft: wp(5) },
  autoCompleteContainer: { marginTop: hp(4), marginHorizontal: wp(5) },
});
