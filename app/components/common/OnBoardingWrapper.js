import { ProgressBar, TouchableOpacity, View, Text } from 'react-native-ui-lib';
import { Keyboard } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { ViewContainer } from './ViewConatiner';
import { ScreenHeader } from './ScreenHeader';
import { customTheme } from '../../constants';
import { FormButton } from './FormInputs';
import { hp, wp } from '../../utils/responsive';
import { useEffect, useState } from 'react';

export default function OnBoardingWrapper({
  title = '',
  children,
  label,
  loading,
  canGoBack = true,
  disabled = false,
  handleForm = () => null,
  skip = false,
  onSkip = () => null,
  progress = 0,
  backButtonAction = () => null,
}) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const CButton = () => (
    <>
      <FormButton
        onPress={handleForm}
        loading={loading}
        label={label}
        disabled={disabled}
      />
      {skip && (
        <TouchableOpacity marginT-20 onPress={onSkip}>
          <Text center white marginB-20>
            Skip
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    // Cleanup the listener when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      setKeyboardHeight(0);
    };
  }, []);
  return (
    <>
      <KeyboardAvoidingScrollView
       enableOnAndroid
       keyboardShouldPersistTaps="handled"
       bounces={false}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{ paddingBottom: hp(5) }}
        stickyFooter={
          <View
            style={{
              backgroundColor: customTheme.colors.background,
              paddingHorizontal: wp(4),
              paddingBottom: hp(4),
            }}>
            <CButton></CButton>
          </View>
        }>
        <ViewContainer includeStatusBar={false}>
          {canGoBack && (
            <ScreenHeader
              title={title}
              backButtonAction={backButtonAction}
              style={title ? { marginTop: hp(2.5) } : undefined}
            />
          )}
          <ProgressBar
            progress={progress}
            progressColor={customTheme.colors.blue20}
            style={{
              backgroundColor: customTheme.colors.primary,
              borderColor: customTheme.colors.blue1,
              borderWidth: 1,
              marginBottom: customTheme.spacings.spacing_40,
            }}
          />
          {children}
        </ViewContainer>
      </KeyboardAvoidingScrollView>
    </>
  );
}
