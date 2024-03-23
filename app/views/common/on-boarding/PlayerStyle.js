import { View, Image, Text } from 'react-native-ui-lib';
import { useEffect } from 'react';
import _ from 'lodash';
import OnBoardingWrapper from '../../../components/common/OnBoardingWrapper';
import { Layout, customTheme } from '../../../constants';
import { useOnBoarding, usePlayerStyle } from '../../../hooks/useOnBoarding';
import { Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { Pressable } from 'react-native';

export default function PlayerStyle() {
  const { handleOnBoarding, handleBack, hanldePlayerRegistration, isLoading } =
    useOnBoarding();

  const {
    control,
    playingPositionDescription,
    playerStylesList,
    handleSubmit,
    setValue,
  } = usePlayerStyle();

  const onSubmit = data => {
    handleOnBoarding(data);
    hanldePlayerRegistration(data);
  };
  useEffect(() => {
    const defaultPlayingPosition = playerStylesList?.data[0];
    setValue('playingPosition', defaultPlayingPosition);
  }, [playerStylesList]);

  const scrorevalues = useMemo(
    () => playingPositionDescription?.scoreValues,
    [playingPositionDescription],
  );

  return (
    <OnBoardingWrapper
      backButtonAction={handleBack}
      loading={isLoading}
      handleForm={handleSubmit(onSubmit)}
      title="Select Player Style"
      label={'Confirm'}
      progress={70}>
      <Controller
        name="playingPosition"
        control={control}
        rules={{
          required: 'Select from the 5 player styles',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <View
              row
              center
              style={{
                flexWrap: 'wrap',
              }}>
              {_.map(playerStylesList?.data, (item, index) => {
                const isSelected = value?.name === item?.name;
                return (
                  <Pressable key={index} onPress={() => onChange(item)}>
                    <View
                      margin-8
                      center
                      style={{
                        borderColor: isSelected
                          ? customTheme.colors.secondary
                          : customTheme.colors.light,
                        borderWidth: isSelected ? 2 : 1,
                        opacity: isSelected ? 1 : 0.7,
                        overflow: 'hidden',
                        borderRadius: customTheme.spacings.spacing_16,
                      }}>
                      <Image
                        resizeMode="cover"
                        resizeMethod="scale"
                        source={{
                          uri:
                            item?.imageUrl ??
                            'https://unsplash.com/photos/G38HyRyx3Cw/download?force=true',
                        }}
                        width={100}
                        height={120}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>
            {error && <Text red10>{error.message}</Text>}
          </View>
        )}
      />

      <View marginV-12>
        <Text
          white
          adjustsFontSizeToFit
          marginV-8
          style={{
            fontSize: customTheme.fontSizes.size_16,
            fontFamily: customTheme.fontFamily.robotoBold,
            fontWeight: '700',
          }}>
          What type of player are you?
        </Text>
        <Text white>
          {playingPositionDescription?.description ??
            'Select from the 5 player styles. Just like a game each style will come with different challenges including stats in focus'}
        </Text>
      </View>
      <View>
        <Text white marginV-12>
          Stats of Focus{' '}
        </Text>
        <Controller
          name="statsOfFocus"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View row spread marginV-12>
              {scrorevalues &&
                Object.keys(scrorevalues).map((key, index) => {
                  return (
                    <View
                      key={index}
                      center
                      style={{
                        borderRadius: customTheme.spacings.spacing_16,
                      }}
                      backgroundColor={customTheme.colors.primary}
                      marginH-4
                      flex
                      width={Layout.width / 4}
                      height={Layout.height / 12}>
                      <Text white>{scrorevalues[key] ?? 0}</Text>
                      <Text
                        white
                        style={{
                          opacity: 0.6,
                        }}>
                        {key}
                      </Text>
                    </View>
                  );
                })}
            </View>
          )}
        />
      </View>
    </OnBoardingWrapper>
  );
}
