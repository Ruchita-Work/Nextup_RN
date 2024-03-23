import React from 'react';
import { StyleSheet } from 'react-native';
import { hp, isAndroid, wp } from '../../../utils/responsive';
import Back from '../../../utils/HeaderButtons/Back';
import { FormInputField } from '../../../components/common/FormInputs';
import HeaderGreyComponent from '../../../components/common/HeaderGreyComponent';
import AvatarItem from '../../../components/common/AvatarItem';
import { Text, View } from 'react-native-ui-lib';
import { customTheme } from '../../../constants';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { appImages } from '../../../constants/appImages';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import useLineup from '../../../hooks/useLineup';
import inRange from 'lodash/inRange';
import AppLoader from '../../../utils/Apploader';

const AddLineup = () => {
  const {
    centerPlayers,
    forwardPlayers,
    guardPlayers,
    handleLineupSave,
    lineupName,
    setLineupName,
    onSelectPlayer,
    selectedPlayers,
    isLoadingCreateLineup,
    handleOnPressAiLineup,
    showAiLineupButton,
  } = useLineup();

  const renderAvatarItem = (playerData, index, position) => {
    const isSelected = selectedPlayers.find(
      item => item.playerId === playerData?.playerId,
    );

    return (
      <View style={{ width: '20%' }} key={`${playerData?.playerId}-${index}`}>
        <AvatarItem
          title={playerData.playerName || 'N/A'}
          containerStyle={styles.avatarItem}
          image={playerData.playerProfilePictureUrl}
          onPress={() => onSelectPlayer(playerData, position)}
          isSelected={isSelected}
        />
      </View>
    );
  };

  const renderNoPlayers = () => {
    return (
      <View flex center style={{ marginVertical: hp(2) }}>
        <Text medium-xl-600>No Players Available</Text>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Back title="Create New Lineup" containerStyle={styles.backButton} />
      {!!isLoadingCreateLineup && <AppLoader />}
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <FormInputField
          label={'LINEUP  NAME'}
          placeholder="Enter lineup name"
          containerStyle={styles.lineupNameInput}
          onChangeText={setLineupName}
          value={lineupName}
        />
        <HeaderGreyComponent title="Forwards" />
        <View row center-v style={styles.rowWrap}>
          {forwardPlayers.length
            ? forwardPlayers.map((item, index) =>
                renderAvatarItem(item, index, 'FORWARD'),
              )
            : renderNoPlayers()}
        </View>
        <HeaderGreyComponent
          title="Centers"
          containerStyle={{ marginTop: hp(2) }}
        />
        <View row center-v style={styles.rowWrap}>
          {centerPlayers.length
            ? centerPlayers.map((item, index) =>
                renderAvatarItem(item, index, 'CENTER'),
              )
            : renderNoPlayers()}
        </View>
        <HeaderGreyComponent
          title="Guards"
          containerStyle={{ marginTop: hp(2) }}
        />
        <View row center-v style={styles.rowWrap}>
          {guardPlayers.length
            ? guardPlayers.map((item, index) =>
                renderAvatarItem(item, index, 'GUARD'),
              )
            : renderNoPlayers()}
        </View>
        <Text medium-500 style={styles.playerSelected}>
          <Text
            medium-500
            color={
              inRange(selectedPlayers.length, 0, 2)
                ? customTheme.colors.darkRed
                : inRange(selectedPlayers.length, 1, 5)
                ? customTheme.colors.darkYellow
                : customTheme.colors.green10
            }>
            {selectedPlayers.length}/5
          </Text>{' '}
          Players Selected
        </Text>
        <View style={styles.footer}>
          {!!showAiLineupButton && (
            <PrimaryButton
              title={'Ai Coach Lineup'}
              style={styles.aiCochLineup}
              iconSource={appImages.crown}
              iconStyle={styles.aiCochLineupButtonIcon}
              onPress={handleOnPressAiLineup}
            />
          )}
          <PrimaryButton title={'Save'} onPress={handleLineupSave} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddLineup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  backButton: {
    marginTop: hp(2),
  },
  avatarItem: {
    width: '100%',
    marginBottom: hp(2),
  },
  listContentContainer: {
    marginTop: hp(2),
  },
  rowWrap: {
    flexWrap: 'wrap',
    marginTop: hp(2),
  },
  playerSelected: {
    marginTop: hp(5),
    alignSelf: 'center',
  },
  scrollContent: {
    paddingBottom: hp(isAndroid ? 3 : 5),
  },
  footer: {
    marginTop: hp(10),
    rowGap: hp(2),
  },
  aiCochLineup: {
    backgroundColor: customTheme.colors.tangaroa,
  },
  aiCochLineupButtonIcon: {
    tintColor: customTheme.colors.darkYellow2,
  },
  lineupNameInput: {
    marginVertical: hp(4),
    height: 'auto',
  },
});
