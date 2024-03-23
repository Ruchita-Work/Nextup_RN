import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageUpload from '../../../../components/common/ImageUpload';
import { hp, wp } from '../../../../utils/responsive';
import { FormInputField } from '../../../../components/common/FormInputs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function AccountDetail({ formik }) {
  const { handleChange, handleBlur, values, touched, errors, setFieldValue } =
    formik;

  const onSelectProfileImageHandler = imageResponse => {
    const newImageData = imageResponse?.assets?.[0] || null;
    setFieldValue('profileImage', newImageData);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <ImageUpload
          source={{ uri: values?.profileImage?.uri }}
          containerStyle={styles.imageUploadContainer}
          onSelectImage={onSelectProfileImageHandler}
        />
        <View style={styles.form}>
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
          <FormInputField
            placeholder={'Enter phone number'}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            label="Phone number"
            keyboardType="number-pad"
            value={values.phoneNumber}
            error={touched.phoneNumber && errors.phoneNumber}
            required
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
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default AccountDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageUploadContainer: {
    alignSelf: 'center',
    marginTop: hp(5),
  },
  form: {
    paddingHorizontal: wp(2),
    gapColumn: hp(1),
    alignSelf: 'center',
    width: '100%',
    marginTop: hp(2),
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3.5),
    columnGap: wp(4),
  },
  scrollContent: {
    paddingBottom: hp(5),
  },
});
