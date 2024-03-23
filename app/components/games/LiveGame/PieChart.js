import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { VictoryAxis, VictoryChart, VictoryPie } from 'victory-native';

export default function PieChart({
  score1,
  score2,
  color1,
  color2,
  outerRadius,
  innerRadius,
  children,
}) {
  const startAngle = (90 * Math.abs(score1 - score2)) / (score2 + score1);

  return (
    <View style={styles.container}>
      <View style={styles.static}>
        <View style={[styles.caption]}>{children}</View>
      </View>
      <VictoryChart width={outerRadius * 2} height={outerRadius * 2}>
        <VictoryPie
          colorScale={[color1, color2]}
          standalone={false}
          startAngle={isNaN(startAngle) ? 0 : startAngle}
          radius={outerRadius}
          endAngle={(isNaN(startAngle) ? 0 : startAngle) + 360}
          innerRadius={innerRadius}
          data={[score2, score1]}
          style={{
            labels: { display: 'none' },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  static: {
    position: 'absolute',
    height: '100%',
    ustifyContent: 'center',
    flexDirection: 'row',
  },
  caption: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
