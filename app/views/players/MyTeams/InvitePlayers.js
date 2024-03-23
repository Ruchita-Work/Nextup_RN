import { StyleSheet, View } from 'react-native';
import React from 'react';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../utils/responsive';
import { FormInputField } from '../../../components/common/FormInputs';
import PrimaryButton from '../../../components/common/PrimaryButton';
import useInviteOutsidePlayers from '../../../hooks/useInviteOutsidePlayers';
import AppLoader from '../../../utils/Apploader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const InvitePlayers = () => {
  const {
    onPressShareHandler,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    loading,
    routeParams,
  } = useInviteOutsidePlayers();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Back
        containerStyle={styles.backContainer}
        title={routeParams?.isAddStaff ? 'Invite Staff' : 'Invite Player'}
      />
      {loading && <AppLoader />}
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={{ flex: 1 }}>
          <FormInputField
            placeholder={'Enter Full name'}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            containerStyle={styles.fullNameInput}
            label="Full name"
            value={values.fullName}
            error={touched.fullName && errors.fullName}
            autoCorrect={false}
          />
          <FormInputField
            placeholder={'Enter email id'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            containerStyle={styles.emailIdInput}
            label="Email ID"
            keyboardType="email-address"
            value={values.email}
            error={touched.email && errors.email}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInputField
            placeholder={'Enter phone number'}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            containerStyle={styles.emailIdInput}
            label="Phone number"
            keyboardType="number-pad"
            value={values.phoneNumber}
            error={touched.phoneNumber && errors.phoneNumber}
          />
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            title={'Share'}
            style={styles.shareButton}
            onPress={onPressShareHandler}
          />
          <PrimaryButton title={'Invite'} onPress={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default InvitePlayers;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backContainer: { marginHorizontal: wp(7), marginTop: hp(3) },
  fullNameInput: {
    marginTop: hp(5),
    marginVertical: hp(2),
    marginHorizontal: wp(8),
    marginRight: wp(8),
    height: 'auto',
  },
  emailIdInput: {
    marginVertical: hp(2),
    marginHorizontal: wp(8),
    marginRight: wp(8),
    height: 'auto',
  },
  shareButton: { backgroundColor: 'transparent' },
  footer: {
    marginTop: hp(22),
    marginHorizontal: wp(10),
    marginBottom: hp(2),
    gap: hp(2),
  },
  scrollContent: { paddingBottom: hp(5) },
});
