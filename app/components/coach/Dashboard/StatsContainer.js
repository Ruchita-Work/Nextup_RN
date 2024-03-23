import * as React from 'react';
import _ from 'lodash';
import { Text, StyleSheet, View } from 'react-native';
import { Picker } from 'react-native-ui-lib';
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../../views/GlobalStyles';

const StatsContainer = () => {
  const items = [
    {
      label: 'Player Stats',
      id: '12',
      value: 'Player Stats',
    },
  ];
  const getWidth = width => {
    return 100 * 0.5;
  };
  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: FontSize.size_3xl,
            color: Color.othersWhite,
            lineHeight: 22,
            textAlign: 'left',
            fontFamily: FontFamily.robotoBold,
            fontWeight: '600',
          }}>
          Player Stats
        </Text>
        <Picker
          value={'Player Stats'}
          fieldType="filter"
          placeholder={'Last 5 games'}
          onChange={e => {}}
          style={{
            fontSize: FontSize.bodyMediumSemibold_size,
            color: Color.othersWhite,
            lineHeight: 22,
            textAlign: 'left',
            fontFamily: FontFamily.robotoBold,
            fontWeight: '600',
          }}
          customPickerProps={{}}>
          {_.map(items, (item, index) => {
            return <Picker.Item key={index} value={item} />;
          })}
        </Picker>
      </View>
      <View style={styles.data}>
        {_.map([...new Array(5)], (item, index) => {
          return (
            <View key={index} style={[styles.group]}>
              <Text style={[styles.label]}>
                PTS -{item} {index + 1}
              </Text>
              <View
                style={{
                  marginLeft: Padding.p_xl,
                }}>
                <Text
                  style={{
                    color: Color.othersWhite,
                  }}>
                  <View
                    style={{
                      width: 100 * 0.5,
                      backgroundColor: Color.goldenrod_100,
                      height: 8,
                    }}
                  />{' '}
                  <Text>{getWidth(index + 1)}</Text>
                </Text>
                <Text
                  style={{
                    color: Color.darkgray_100,
                  }}>
                  <View
                    style={{
                      width: 200,
                      backgroundColor: Color.darkgray_100,
                      height: 8,
                    }}
                  />{' '}
                  <Text>{getWidth(index + 1)}</Text>
                </Text>
              </View>

              <View style={[styles.groupItem, styles.groupPosition1]} />
            </View>
          );
        })}
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginHorizontal: 8,
            }}>
            <View
              style={{
                width: 25,
                backgroundColor: Color.darkgray_300,
                height: 8,
              }}
            />

            <Text
              style={{
                color: Color.othersWhite,
                marginLeft: Padding.p_12xs,
                fontFamily: FontFamily.robotoBold,
                fontWeight: 600,
              }}>
              {' '}
              Overall Game
            </Text>
          </Text>
          <Text>
            <View
              style={{
                width: 25,
                backgroundColor: Color.goldenrod_100,
                height: 8,
              }}
            />

            <Text
              style={{
                color: Color.goldenrod_100,
                marginLeft: Padding.p_12xs,
              }}>
              {' '}
              Last Game
            </Text>
          </Text>
        </View>
      </View>
    </View>
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
