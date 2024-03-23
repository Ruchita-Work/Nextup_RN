import React, { useState } from 'react';
import { hp, wp } from '../../../../utils/responsive';
import { View } from 'react-native-ui-lib';
import {
  FormDatePicker,
  FormInputField,
} from '../../../../components/common/FormInputs';
import UpdloadTypeDialog from '../../../../components/common/UploadTypeDialog';
import ImageUpload from '../../../../components/common/ImageUpload';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

function PlayerAcoountEdit({ formik }) {
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const { handleChange, handleBlur, values, touched, errors, setFieldValue } =
    formik;

  const onSelectProfileImageHandler = imageResponse => {
    const newImageData = imageResponse?.assets?.[0] || null;
    setFieldValue('profileImage', newImageData);
  };

  const onPressCamera = async () => {
    const resp = await launchCamera({
      includeBase64: true,
    });
    onSelectProfileImageHandler(resp);
  };

  const onPressGallery = async () => {
    const resp = await launchImageLibrary();
    onSelectProfileImageHandler(resp);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      <ImageUpload
        onPress={() => setIsUploadVisible(true)}
        source={{ uri: values?.profileImage?.uri }}
        containerStyle={styles.imageUploadContainer}
      />

      <View style={styles.inputsRow}>
        <FormInputField
          placeholder={'Enter first name'}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          label="First name"
          value={values.firstName}
          error={touched.firstName && errors.firstName}
          autoCorrect={false}
          containerStyle={{ width: '43%' }}
          required
        />
        <FormInputField
          placeholder={'Enter last name'}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          label="Last name"
          value={values.lastName}
          error={touched.lastName && errors.lastName}
          autoCorrect={false}
          containerStyle={{ width: '43%' }}
          required
        />
      </View>
      <FormDatePicker
        label={'Date of Birth'}
        placeholder="Select date"
        value={values.dob ?? null}
        onChange={handleChange('dob')}
        required
        error={touched.dob && errors.dob}
      />
      <FormInputField
        placeholder={'Enter email id'}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        label="Email ID"
        keyboardType="email-address"
        value={values.email}
        error={touched.email && errors.email}
        autoCapitalize="none"
        autoCorrect={false}
        required
      />

      <UpdloadTypeDialog
        isVisible={isUploadVisible}
        handlePick={onPressGallery}
        handleScan={onPressCamera}
        onClose={setIsUploadVisible.bind(this, false)}
      />
    </KeyboardAwareScrollView>
  );
}
export default PlayerAcoountEdit;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: hp(5),
  },
  imageUploadContainer: {
    alignSelf: 'center',
    marginTop: hp(3),
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3.5),
    columnGap: wp(4),
  },
});
