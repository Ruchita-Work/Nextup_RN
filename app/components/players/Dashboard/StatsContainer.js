/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import * as React from 'react';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Color, FontFamily, Padding } from '../../../views/GlobalStyles';
import { SectionHeader } from '../../common/SectionHeader';
import { NoDataView } from '../../common/NoDataView';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';

const StatsContainer = ({
  statsFilterOptions = [],
  processGraphData = null,
  statsType = 'Season',
  onChangeStatsType = () => {},
}) => {
  const getWidth = width => {
    return typeof width === 'string' ? wp(parseInt(width)) : width;
  };
  function _renderNoDataView() {
    if (processGraphData?.data?.length) return;
    return <NoDataView />;
  }
  function _renderLayout() {
    if (!processGraphData?.data.length) return;
    return (
      <>
        {_.map(processGraphData?.data ?? [], (item, index) => {
          return (
            <View row key={index} style={{ alignItems: 'center' }} marginB-18>
              <View width={wp(20)}>
                <Text small-400>{item?.name}</Text>
              </View>
              <View centerH>
                {getWidth(item?.coloredValue) > 0 && (
                  <View
                    row
                    style={{ alignItems: 'center', alignSelf: 'flex-start' }}>
                    <View
                      width={getWidth(item?.coloredValue)}
                      backgroundColor={Color.goldenrod_100}
                      height={hp(1)}
                    />
                    <Text
                      small-400
                      style={{ color: Color.goldenrod_100 }}
                      marginL-12>
                      {item?.coloredValue}
                    </Text>
                  </View>
                )}
                {getWidth(item?.unColoredValue) > 0 && (
                  <View
                    row
                    style={{ alignItems: 'center', alignSelf: 'flex-start' }}>
                    <View
                      width={getWidth(item?.unColoredValue)}
                      backgroundColor={customTheme.colors.emptyBar}
                      height={hp(1)}
                    />
                    <Text small-400 marginL-12>
                      {item?.unColoredValue}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
        <View row center marginT-18>
          <View row marginR-12 style={{ alignItems: 'center' }}>
            <View
              width={wp(8)}
              height={hp(1)}
              backgroundColor={customTheme.colors.emptyBar}
            />

            <Text small-600 marginL-8>
              {' '}
              {processGraphData?.firstGraphName}
            </Text>
          </View>
          <View row marginR-12 style={{ alignItems: 'center' }}>
            <View
              width={wp(8)}
              height={hp(1)}
              backgroundColor={Color.goldenrod_100}
            />

            <Text
              small-600
              marginL-8
              style={{
                color: Color.goldenrod_100,
              }}>
              {' '}
              {processGraphData?.secondGraphName}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <SectionHeader
        title={'Player Stats'}
        showFilter
        filterProps={{
          options: statsFilterOptions,
          label: statsType,
          onValueChange: onChangeStatsType,
          value: statsType,
        }}
      />
      {_renderNoDataView()}
      <View style={styles.data}>{_renderLayout()}</View>
    </>
  );
};

export default StatsContainer;
const styles = StyleSheet.create({
  data: {
    // alignSelf: 'center',
    paddingHorizontal: Padding.p_11xl,
    marginTop: 16,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  label: {
    color: Color.othersWhite,
    fontFamily: FontFamily.robotoBold,
    fontWeight: 400,
  },
});
