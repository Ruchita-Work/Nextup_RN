import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Padding} from '../../../../views/GlobalStyles';
import {Layout, Colors, Fonts} from './../../../../constants';
import LastGameScoreTable from './ScoreTable';
let wide = Layout.width;
function PlayerSummary() {
  const data = {
    defenderName: ['Kalumet', 'Copper Kings'],
    teamSummary: true,
    columns: ['1', '2', '3', '4', 'T'],
    challengerName: ['Divine Child', 'Falcons'],
    challengerQuarterInfo: [1, 2, 3, 4, 5],
  };
  return (
    <>
      <Text style={styles.header}>Player Summary</Text>
      <TouchableOpacity

      //   onPress={onPress}
      >
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              marginTop: Padding.p_3xs,
              marginHorizontal: 5,
              paddingVertical: 15,
              paddingHorizontal: 8,
              backgroundColor: '#181A20',
              borderRadius: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 2,
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  borderRadius: 60 / 2,
                  backgroundColor: '#85ADFF',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: '400',
                    color: '#ffffff',
                    fontSize: 16,
                    lineHeight: 16,
                    fontFamily: Fonts.Regular,
                  }}>
                  {Array.from(data?.defenderName[1])[0].toUpperCase()}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 8,
                  // width: wide * 0.2,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 13,
                    fontFamily: Fonts.Light,
                    fontWeight: '400',
                    color: Colors.white_08,
                  }}>
                  {data?.defenderName[0]}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 13,
                    fontFamily: Fonts.Light,
                    fontWeight: '400',
                    color: Colors.lightBlue,
                  }}>
                  {data?.defenderName[1]}
                </Text>
              </View>
            </View>

            <View
              style={{
                color: '#ffffff',
                marginRight: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 22,
                  fontWeight: '400',
                  fontFamily: Fonts.Regular,
                  color: '#ffffff',
                  opacity: 0.6,
                }}>
                VS
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 2,
              }}>
              <View
                style={{
                  marginRight: 6,
                  // width: wide * 0.17,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 13,
                    fontFamily: Fonts.Light,
                    fontWeight: '400',
                    color: Colors.white_08,
                  }}>
                  {data?.challengerName[0]}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 13,
                    fontFamily: Fonts.Light,
                    fontWeight: '400',
                    color: Colors.lightRed,
                  }}>
                  {data?.challengerName[1]}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  borderRadius: 40 / 2,
                  backgroundColor: '#FF5E5E',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: '400',
                    color: '#ffffff',
                    fontSize: 16,
                    lineHeight: 16,
                    fontFamily: Fonts.Regular,
                  }}>
                  {Array.from(data?.challengerName[1])[0].toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginVertical: Padding.p_7xs,
        }}>
        <LastGameScoreTable />
      </View>
    </>
  );
}
export default PlayerSummary;
const styles = StyleSheet.create({
  header: {
    // paddingTop: Padding.p_7xs,
    color: Colors.light,
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    marginLeft: wide * 0.015,
    marginTop: wide * 0.06,
    width: '92%',
    alignSelf: 'center',
  },
});
