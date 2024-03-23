import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { hp, isAndroid, wp } from '../../../utils/responsive';
import Back from '../../../utils/HeaderButtons/Back';
import GameHeader from '../../../components/games/LastGame/GameHeader';
import LastGameScoreTable from '../../../components/games/LastGame/LastGameScoreTable';
import GameDropdownButton from '../../../components/games/LastGame/GameDropdownButton';
import QuickBoxScore from '../../../components/games/QuickBoxScore/QuickBoxScore';
import { Picker, Text, View } from 'react-native-ui-lib';
import { customTheme } from '../../../constants';
import CourtChartSVG from '../../../assets/images/icons-svgs/CourtChartSVG';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import AppSheet from '../../../components/common/AppSheet';
import useAdvanceGameStats from '../../../hooks/useAdvanceGameStats';

const GameStatistics = () => {
  const {
    lastGameScoreData,
    setIsVisibleGameSelectSheet,
    boxScoreData,
    gameSelectSheetOptions,
    isVisibleGameSelectSheet,
    gameHeaderData,
    courtData,
    filterButtonsData,
    playerSelectSheetOptions,
    setSelectedPlayer,
    selectedPlayer,
  } = useAdvanceGameStats();

  return (
    <ViewContainer>
      <Back title="Game Statistics" containerStyle={styles.backButton} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.lastGameInfo}>
          <GameHeader
            containerStyle={styles.gameHeader}
            leftTeaminfo={gameHeaderData.left}
            rightTeamInfo={gameHeaderData.right}
          />
          <LastGameScoreTable tableData={lastGameScoreData} />
        </View>
        <View row centerV spread style={styles.dropdownButtons}>
          <GameDropdownButton
            title={filterButtonsData.teamButton.title}
            isActive
            color={filterButtonsData.teamButton.color}
            style={styles.filterButton}
            onPress={setIsVisibleGameSelectSheet.bind(null, true)}
          />
          <Picker
            value={selectedPlayer?.playerId}
            topBarProps={{
              cancelButtonProps: {
                iconStyle: { tintColor: customTheme.colors.light },
              },
              title: 'Select season',
              titleStyle: {
                color: customTheme.colors.light,
                fontFamily: customTheme.fontFamily.robotoMedium,
              },
            }}
            renderPicker={() => (
              <GameDropdownButton
                title={filterButtonsData.playerButton.title}
                style={styles.filterButton}
              />
            )}>
            {playerSelectSheetOptions.map(item => {
              return (
                <Picker.Item
                  onPress={() => setSelectedPlayer(item)}
                  value={item.playerId}
                  label={item.playerName}
                  key={item.playerId}
                  selectedIconColor={customTheme.colors.light}
                  labelStyle={{ color: customTheme.colors.light }}
                />
              );
            })}
          </Picker>
        </View>
        <Text medium-700 style={styles.quickScoreTitle}>
          {filterButtonsData.teamButton.title}’s Quick Box Score
        </Text>
        <QuickBoxScore
          containerStyle={styles.quickBoxScore}
          tableData={boxScoreData}
        />
        <Text medium-700 style={styles.quickScoreTitle}>
          Court Chart
        </Text>
        <View style={styles.courtChartContainer}>
          {Object.keys(courtData || {}).length ? (
            <CourtChartSVG data={courtData} />
          ) : (
            <View center>
              <Text medium-xl-600 style={styles.noCourtChartData}>
                No court chart data
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <AppSheet
        options={gameSelectSheetOptions}
        isVisible={isVisibleGameSelectSheet}
        setIsVisible={setIsVisibleGameSelectSheet}
      />
    </ViewContainer>
  );
};

export default GameStatistics;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  gameHeader: {
    backgroundColor: customTheme.colors.lightDark,
    padding: wp(2),
    borderRadius: wp(2),
  },
  dropdownButtons: {
    marginHorizontal: wp(10),
    marginTop: hp(4),
  },
  quickScoreTitle: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
  },
  quickBoxScore: {
    alignSelf: 'center',
    marginTop: hp(3),
    marginLeft: wp(4),
  },
  lastGameInfo: {
    marginHorizontal: wp(2),
  },
  scrollView: {
    paddingBottom: hp(isAndroid ? 3 : 5),
  },
  courtChartContainer: {
    marginTop: hp(2),
    alignSelf: 'center',
  },
  filterButton: {
    width: wp(35),
  },
  noCourtChartData: { marginVertical: hp(5) },
});
