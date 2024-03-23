import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors, Layout } from '../../../constants';
import SideBySideBarGraph from '../../../components/common/SideBySideBar';
const wide = Layout.width;
export default function LastGames() {
  return (
    <View
      style={{
        width: '88%',
        alignSelf: 'center',
        marginTop: wide * 0.08,
      }}>
      <Text
        style={{
          color: Colors.light,
          fontFamily: Fonts.SemiBold,
          fontSize: 20,
          lineHeight: 22,
          fontWeight: '600',
          marginLeft: wide * 0.01,
        }}>
        Last 5 games
      </Text>
      <View
        style={{
          marginTop: wide * 0.04,
          marginBottom: wide * 0.05,
        }}>
        <SideBySideBarGraph
          pgsData={[
            { name: 'PST', value: [12.7, null] },
            { name: 'AST', value: [7.7, null] },
            { name: 'RPG', value: [10.9, null] },
            { name: 'BPG', value: [12.7, null] },
            { name: 'STL', value: [7.7, null] },
            { name: 'FG%', value: [10.9, null] },
            { name: '2PT', value: [7.7, null] },
            { name: '3PT', value: [10.9, null] },
          ]}
        />
      </View>
    </View>
  );
}
