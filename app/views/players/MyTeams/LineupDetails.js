import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, isAndroid, wp } from '../../../utils/responsive';
import HeaderGreyComponent from '../../../components/common/HeaderGreyComponent';
import AvatarItem from '../../../components/common/AvatarItem';
import inRange from 'lodash/inRange';
import { customTheme } from '../../../constants';
import { Text, View } from 'react-native-ui-lib';
import CheckboxItem from '../../../components/common/CheckboxItem';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import useLineupDetails from '../../../hooks/useLineupDetails';
import AppLoader from '../../../utils/Apploader';

const LineupDetails = () => {
  const {
    isCoach,
    lineupData,
    selectedPlayers,
    benchPlayers,
    onSelectPlayer,
    isLoadingUpdateLineup,
    isDefault,
    setIsDefault,
    handleLineupEdit,
    handleLineupDelete,
    isAILineup,
  } = useLineupDetails();

  const isLineupEditable = isCoach && !isAILineup;

  const renderAvatarItem = (item, index, isDisable) => {
    const isSelected = selectedPlayers.find(
      selectedItem => selectedItem.playerId === item?.playerId,
    );
    return (
      <AvatarItem
        title={item?.playerName}
        containerStyle={styles.avatarItem}
        key={item?.playerId}
        subTitle={(item.position || ' ').slice(0, 1)}
        subTitleStyle={{ color: customTheme.colors.btnBg }}
        isDisable={isDisable}
        isSelected={isSelected && isLineupEditable}
        onPress={() => onSelectPlayer(item)}
        disableTouchable={!isLineupEditable}
        image={item?.playerProfilePictureUrl}
      />
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {!!isLoadingUpdateLineup && <AppLoader />}
      <Back
        title={lineupData?.name || 'Lineup'}
        containerStyle={styles.backButton}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={isCoach}
        showsVerticalScrollIndicator={false}>
        <HeaderGreyComponent title="Selected Player" />
        <View row style={styles.rowWrap}>
          {selectedPlayers.map((item, index) => renderAvatarItem(item, index))}
        </View>
        <HeaderGreyComponent
          title="Bench"
          containerStyle={styles.benchGreyHeader}
        />
        <View row style={styles.rowWrap}>
          {benchPlayers.map((item, index) =>
            renderAvatarItem(item, index, true),
          )}
        </View>
        {isLineupEditable && (
          <>
            <Text medium-500 style={styles.selectedPlayersText}>
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
            <CheckboxItem
              title={'Mark as a Default'}
              containerStyle={styles.markAsDefaultCheckBox}
              checked={isDefault}
              onPress={() => setIsDefault(prevVal => !prevVal)}
            />
            <View style={styles.footer}>
              <PrimaryButton title={'Edit Lineup'} onPress={handleLineupEdit} />
              <PrimaryButton
                title={'Delete Lineup'}
                style={styles.deleteLineupButton}
                onPress={handleLineupDelete}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LineupDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    flex: 1,
  },
  backButton: {
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  scrollContent: {
    paddingBottom: hp(isAndroid ? 3 : 5),
  },
  rowWrap: {
    flexWrap: 'wrap',
    marginTop: hp(2.5),
  },
  avatarItem: {
    width: '20%',
    marginBottom: hp(2),
  },
  benchGreyHeader: {
    marginTop: hp(2),
  },
  selectedPlayersText: {
    alignSelf: 'center',
    marginTop: hp(3),
  },
  markAsDefaultCheckBox: {
    marginTop: hp(7),
    alignSelf: 'center',
  },
  footer: {
    gap: hp(2),
    marginTop: hp(6),
  },
  deleteLineupButton: {
    backgroundColor: 'transparent',
  },
});
