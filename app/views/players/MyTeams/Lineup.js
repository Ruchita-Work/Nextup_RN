import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Text } from 'react-native-ui-lib';
import { hp, isAndroid, wp } from '../../../utils/responsive';
import LineupItem from '../../../components/common/LineupItem';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { customTheme } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import { useGetLineups } from '../../../api/myteam.api';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';
import EmptyView from '../../../components/players/EmptyView';

const Lineup = () => {
  const navigation = useNavigation();
  const { isCoach } = useAuth();

  const { selectedSeason, selectedTeam } = useContext(MyTeamsContext);
  const { data, refetch } = useGetLineups({
    season: selectedSeason,
    teamId: selectedTeam?.teamId,
    enabled: !!(selectedSeason && selectedTeam?.teamId),
  });

  useRefreshOnFocus(refetch);

  const coachLineup = data?.data?.lineUpCreatedByCoach || [];

  const aiLineup = data?.data?.aiBasedLineUp || [];

  const onPressAddLineupHandler = () => {
    navigation.navigate('AddLineup', { aiLineup: data?.data?.aiBasedLineUp });
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.lineupBox}>
       {!!coachLineup?.length &&  <Text large-xl-600>Coach Lineup</Text>}
        {!coachLineup?.length && (
            <EmptyView title='No Lineups are added'/>
        )}
        {coachLineup?.map(item => (
          <LineupItem key={item.id.toString()} data={item} />
        ))}
      </View>
      {!!aiLineup?.length && (
        <View style={styles.lineupBox}>
          <Text large-xl-600>AI Base Lineup</Text>
          {aiLineup?.map((item, index) => (
            <LineupItem
              data={item}
              key={index}
              isAILineup
              containerStyle={styles.aiLineupItem}
              viewTextStyle={styles.aiLineupItemViewText}
            />
          ))}
        </View>
      )}
      {!!isCoach && (
        <PrimaryButton
          onPress={onPressAddLineupHandler}
          style={styles.newLineupButton}
          title={'New Lineup'}
        />
      )}
    </ScrollView>
  );
};

export default Lineup;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(3),
    paddingBottom: isAndroid ? hp(3) : hp(5),
    gap: hp(3),
    flexGrow: 1,
  },
  lineupBox: {
    gap: hp(1.5),
  },
  newLineupButton: {
    marginHorizontal: wp(4),
    marginTop: 'auto',
  },
  aiLineupItem: {
    backgroundColor: customTheme.colors.btnBg,
  },
  aiLineupItemViewText: {
    color: customTheme.colors.light,
  },
  emptyComponentView: {
    width: '100%',
    marginTop: hp(1.5),
    alignItems: 'center',
  },
});
