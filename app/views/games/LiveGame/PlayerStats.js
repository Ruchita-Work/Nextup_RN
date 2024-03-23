import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import { Colors } from '../../../constants';
import { FontSize } from '../../GlobalStyles';
import { hp, wp } from '../../../utils/responsive';
import { MyColors } from '../../../constants/colors';
import { LiveGameContext } from '.';
import { CustomTable } from '../../../components/common/CustomTable';
import { flatten, isArray } from 'lodash';

function SubTitle({ imageUrl, title }) {
  return (
    <View
      style={[
        styles.horizontalRow,
        styles.gap10,
        styles.p10,
        { marginTop: hp(1.5), marginBottom: hp(1) },
      ]}>
      <View style={styles.imageWrapper}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <Text style={styles.header1}>{title}</Text>
    </View>
  );
}

export default function PlayerStats() {
  const { data } = useContext(LiveGameContext);

  const defenderPlayerStats = useMemo(() => {
    if (!data || !data?.defenderTeamInfo?.lineup?.playerPositionsList) {
      return null;
    }
    const playersList = data?.defenderTeamInfo?.lineup?.playerPositionsList;
    let newData = {};
    playersList.forEach(i => {
      newData[i.teamPosition] = i.availablePlayersList;
    });
    let finalData = {};
    Object.keys(newData).forEach(position => {
      let positionKpiList = newData[position].map(i => {
        const foundedKpiItem = data?.defenderTeamKpi?.find(
          ni => ni.id === i.playerId,
        );
        let list = [];
        if (foundedKpiItem?.kpi) {
          list = [
            i.playerName,
            ...data?.kpi?.map(ki => foundedKpiItem.kpi[ki] || '0'),
          ];
        }
        return list;
      });
      finalData[position] = positionKpiList.filter(row => row.length);
    });

    return finalData;
  }, [data]);

  const challengerPlayerStats = useMemo(() => {
    if (!data || !data?.challengerTeamInfo?.lineup?.playerPositionsList) {
      return null;
    }
    const playersList = data?.challengerTeamInfo?.lineup?.playerPositionsList;
    let newData = {};
    playersList.forEach(i => {
      newData[i.teamPosition] = i.availablePlayersList;
    });
    let finalData = {};
    Object.keys(newData).forEach(position => {
      let positionKpiList = newData[position].map(i => {
        const foundedKpiItem = data?.challengerTeamKpi?.find(
          ni => ni.id === i.playerId,
        );
        let list = [];
        if (foundedKpiItem?.kpi) {
          list = [
            i.playerName,
            ...data?.kpi?.map(ki => foundedKpiItem.kpi[ki] || '0'),
          ];
        }
        return list;
      });
      finalData[position] = positionKpiList.filter(row => row.length);
    });

    return finalData;
  }, [data]);

  if (!challengerPlayerStats && !defenderPlayerStats) {
    return null;
  }

  let isDefenderTableEmpty = true;
  let isChallengerTableEmpty = true;

  for (const defenderStatKey in defenderPlayerStats) {
    if (
      isArray(defenderPlayerStats[defenderStatKey]) &&
      flatten(defenderPlayerStats[defenderStatKey]).length
    ) {
      isDefenderTableEmpty = false;
    }
  }

  for (const defenderStatKey in challengerPlayerStats) {
    if (
      isArray(challengerPlayerStats[defenderStatKey]) &&
      flatten(challengerPlayerStats[defenderStatKey]).length
    ) {
      isChallengerTableEmpty = false;
    }
  }

  if (isDefenderTableEmpty && isChallengerTableEmpty) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Player Stats</Text>
      {!!defenderPlayerStats && !isDefenderTableEmpty && (
        <>
          <SubTitle
            title={data?.defenderTeamInfo?.name}
            imageUrl={{ uri: data?.defenderTeamInfo?.logoUrl }}
          />
          {Object.keys(defenderPlayerStats).map(i => {
            if (!defenderPlayerStats[i]?.length) {
              return null;
            }
            return (
              <CustomTable
                headerData={[i, ...(data?.kpi || [])]}
                data={defenderPlayerStats[i]}
                tableContainerStyle={styles.tableContainer}
                hideTitle
                widthArr={[wp(25), ...data?.kpi?.map(_ => wp(10.6))]}
              />
            );
          })}
        </>
      )}
      {!!challengerPlayerStats && !isChallengerTableEmpty && (
        <>
          <SubTitle
            title={data?.challengerTeamInfo?.name}
            imageUrl={{ uri: data?.challengerTeamInfo?.logoUrl }}
          />
          {Object.keys(challengerPlayerStats).map(i => {
            if (!challengerPlayerStats[i]?.length) {
              return null;
            }
            return (
              <CustomTable
                headerData={[i, ...(data?.kpi || [])]}
                data={challengerPlayerStats[i]}
                tableContainerStyle={styles.tableContainer}
                hideTitle
                widthArr={[wp(25), ...data?.kpi?.map(_ => wp(10.6))]}
              />
            );
          })}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
  },
  header: {
    color: Colors.light,
    fontSize: FontSize.size_3xl,
    fontWeight: '600',
  },
  tableContainer: {
    paddingVertical: hp(0.5),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp(10),
  },
  imageWrapper: {
    height: wp(8.5),
    width: wp(8.5),
    alignItems: 'center',
    borderRadius: wp(5),
    justifyContent: 'center',
    backgroundColor: MyColors.light,
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header1: {
    fontSize: FontSize.bodyMediumSemibold_size,
    color: Colors.light,
  },
  gap10: {
    gap: hp(1),
  },
  p10: {
    padding: 5,
  },
});
