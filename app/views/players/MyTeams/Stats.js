import React, { useContext, useMemo } from 'react';
import { CustomTable } from '../../../components/common/CustomTable';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { hp, wp } from '../../../utils/responsive';
import { Image, Text, View } from 'react-native-ui-lib';
import { appImages } from '../../../constants/appImages';
import { customTheme } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useGetTeamStats } from '../../../api/myteam.api';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useAuth } from '../../../hooks/useAuth';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';
import EmptyView from '../../../components/players/EmptyView';

// ! Should be used strictly for coach side my team tab only.
export default function PlayerStats() {
  const navigation = useNavigation();
  const { selectedSeason, selectedTeam } = useContext(MyTeamsContext);
  const { user } = useAuth();

  const {
    data: teamStatsData,
    isLoading,
    refetch,
  } = useGetTeamStats({
    coachId: user?.id,
    season: selectedSeason,
    teamId: selectedTeam?.teamId,
    enabled: !!(user?.id && selectedSeason && selectedTeam?.teamId),
  });

  useRefreshOnFocus(refetch);

  const onPressShowAdvanceStatsHandler = () => {
    navigation.navigate('AdvanceStats');
  };

  const tableHeaderData = teamStatsData?.data?.kpi;

  const getTableData = _statsData => {
    if (!_statsData) {
      return [];
    }
    return _statsData?.statsForSeasonList?.map(item => {
      const playersStatsList =
        _statsData?.kpi?.map(kpiItem => item?.stats?.[kpiItem] || 'N/A') || [];

      return [item?.season || 'N/A', ...playersStatsList];
    });
  };

  const tableData = useMemo(
    () => getTableData(teamStatsData?.data),
    [teamStatsData],
  );

  if (!isLoading && (!teamStatsData || !teamStatsData?.data)) {
    return (
      <View flex center>
        <Text large-3xl-700>No stats found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      {!tableHeaderData && (
        <View style={{ paddingTop: hp(3) }}>
          <EmptyView title="No Stats Available" />
        </View>
      )}
      {!!tableHeaderData && (
        <CustomTable
          title="Player stats"
          headerData={['Starters', ...(tableHeaderData || [])]}
          data={tableData}
          titleStyle={styles.tableTitle}
          tableContainerStyle={styles.tableContainer}
        />
      )}
      {!!tableHeaderData && (
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.6}
          onPress={onPressShowAdvanceStatsHandler}>
          <Text regular-400 style={styles.advancedStats}>
            Advanced Stats
          </Text>
          <Image source={appImages.dropdown} style={styles.dropdownIcon} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: hp(2), paddingBottom: hp(5) },
  tableTitle: { paddingHorizontal: wp(4) },
  tableContainer: { paddingHorizontal: wp(1) },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  dropdownIcon: {
    height: wp(5),
    width: wp(5),
    marginLeft: wp(0.5),
    tintColor: customTheme.colors.light + '80',
  },
  advancedStats: {
    textDecorationLine: 'underline',
    color: customTheme.colors.light + '80',
  },
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_22,
    textAlign: 'center',
    marginVertical: hp(4),
  },
});
