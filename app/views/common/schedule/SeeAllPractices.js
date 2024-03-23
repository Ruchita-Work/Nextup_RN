import { FlatList, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../utils/responsive';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useGetScheduleListForTeam } from '../../../api/myteam.api';
import { errorToast } from '../../../utils/toast';
import PracticeScheduleItem from '../../../components/common/PracticeScheduleItem';
import { useAuth } from '../../../hooks/useAuth';
import { useRoute } from '@react-navigation/native';

const SeeAllPractices = () => {
  const { params } = useRoute();
  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const { isCoach } = useAuth();
  const { data } = useGetScheduleListForTeam({
    season: selectedSeason,
    teamId: selectedTeam?.teamId,
    enabled:
      !!(selectedSeason && selectedTeam?.teamId) && !params?.practiceList,
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
  });

  const practiceList = params?.practiceList || data?.data?.practiceList || [];

  return (
    <ViewContainer>
      <Back title="Practice Schedules" containerStyle={styles.backButton} />
      <FlatList
        data={practiceList || []}
        keyExtractor={item => `${item?.practiceId}`}
        bounces={practiceList.length}
        renderItem={({ item }) => (
          <PracticeScheduleItem
            data={item}
            onPress={() => {}}
            disabled={!!isCoach}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: wp(4), paddingTop: hp(4) }}
      />
    </ViewContainer>
  );
};

export default SeeAllPractices;

const styles = StyleSheet.create({
  backButton: { marginHorizontal: wp(5), marginTop: hp(2) },
});
