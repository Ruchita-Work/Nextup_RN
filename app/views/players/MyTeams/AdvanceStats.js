import { ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useContext } from 'react';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../utils/responsive';
import GameHeaderTeamItem from '../../../components/games/LastGame/GameHeaderTeamItem';
import { customTheme } from '../../../constants';
import { Text, View } from 'react-native-ui-lib';
import StatsBoxItem from '../../../components/common/StatsBoxItem';
import { useGetAdvanceTeamStats } from '../../../api/myteam.api';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { ViewContainer } from '../../../components/common/ViewConatiner';

const AdvanceStats = () => {
  const { selectedSeason, selectedTeam } = useContext(MyTeamsContext);
  const { data, isLoading } = useGetAdvanceTeamStats({
    season: selectedSeason,
    teamId: selectedTeam?.teamId,
    enabled: !!(selectedSeason && selectedTeam?.teamId),
  });

  const renderBoxAverageCustomItem = useCallback((item, index) => {
    return (
      <StatsBoxItem
        key={`renderBoxAverageCustomItem-${item.title}-${index}`}
        title={item.title}
        subtitle={item.subtitle}
        style={styles.scoreBoxItem}
      />
    );
  }, []);

  if ((!data || !data?.data) && !isLoading) {
    return (
      <View useSafeArea flex>
        <Back title="Advance Statistics" containerStyle={styles.backButton} />
        <View flex center>
          <Text large-3xl-700>No advance stats found</Text>
        </View>
      </View>
    );
  }

  const advanceStatsData = data?.data;

  return (
    <ViewContainer>
      <Back title="Advance Statistics" containerStyle={styles.backButton} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View row centerV spread style={styles.gameScoreContainer}>
          <GameHeaderTeamItem
            name={advanceStatsData?.teamName}
            color={customTheme.colors.lightBlue}
            image={
              advanceStatsData?.teamLogoUrl
                ? { uri: advanceStatsData?.teamLogoUrl }
                : null
            }
          />
          <Text header-400>
            {advanceStatsData?.wins || 0}-{advanceStatsData?.loss || 0}
          </Text>
        </View>

        {advanceStatsData?.analyticsScoreList?.map((item, index) => {
          const scoreData = Object.keys(item.score || {}).map(objKey => ({
            title: item.score[objKey],
            subtitle: objKey,
          }));

          return (
            <View style={styles.boxSpace} key={`analyticsScoreList-${index}`}>
              <Text style={styles.boxTitle} large-x-600>
                {item.name}
              </Text>
              <View row style={styles.scoreItemsRow}>
                {scoreData.map((scoreItem, scoreIndex) =>
                  renderBoxAverageCustomItem(scoreItem, scoreIndex),
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ViewContainer>
  );
};

export default AdvanceStats;

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  gameScoreContainer: {
    backgroundColor: customTheme.colors.primary,
    marginHorizontal: wp(2),
    borderRadius: wp(2),
    paddingVertical: hp(2),
    paddingLeft: wp(6),
    paddingRight: wp(9),
    marginTop: hp(3),
  },
  boxSpace: {
    marginHorizontal: wp(2.2),
    marginTop: hp(3),
    gap: hp(1),
  },
  boxTitle: {
    marginLeft: wp(3),
  },
  scoreBoxItem: {
    width: '23%',
    margin: '1%',
  },
  scoreItemsRow: {
    flexWrap: 'wrap',
  },
});
