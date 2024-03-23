import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import Svg, { G, Path, Polyline } from 'react-native-svg';
import _ from 'lodash';
export default function DuelChart({
  graphSize,
  scaleCount,
  numberInterval,
  data,
  xthreshold,
  ythreshold,
  options,
}) {
  const boxSize = graphSize * 4;
  const centerPos = boxSize / 2;

  // Top start pos -90 degree
  const posX = (angle, distance) =>
    Math.cos(angle - Math.PI / 2) * distance * graphSize;
  const posY = (angle, distance) =>
    Math.sin(angle - Math.PI / 2) * distance * graphSize;

  const initPath = points => {
    let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
    for (let i = 1; i < points.length; i++) {
      d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
    }
    return d + 'z';
  };

  const scaleShape = (columns, i) => {
    return (
      <Path
        key={`shape-${i}`}
        d={initPath(
          columns.map(column => {
            return [
              posX(column.angle, i / scaleCount),
              posY(column.angle, i / scaleCount),
            ];
          }),
        )}
        stroke={'#FFFFF0'}
        strokeOpacity={'.0'}
        fill={'#FFFFFF'}
        fillOpacity=".0"
      />
    );
  };

  const shape = (columns, units) => (chartData, i) => {
    const data = chartData;
    const colorCode = options.colorList[i];
    const dot = options.dotList[i] == true ? '20,20' : '0,0';
    return (
      <Path
        key={`shape-${i}`}
        d={initPath(
          columns.map(column => {
            return [
              posX(column.angle, data[column.key] / units[column.key]),
              posY(column.angle, data[column.key] / units[column.key]),
            ];
          }),
        )}
        strokeDasharray={dot}
        stroke={colorCode}
        strokeWidth="7"
        fill={colorCode}
        fillOpacity=".25"
      />
    );
  };

  const points = points => {
    return points
      .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
      .join(' ');
  };

  const axis = () => (column, i) => {
    return (
      <Polyline
        key={`poly-axis-${i}`}
        points={points([
          [0, 0],
          [posX(column.angle, 1.1), posY(column.angle, 1.1)],
        ])}
        stroke="#000000"
        strokeWidth=".5"
      />
    );
  };

  const label = (data, colorList) => column => {
    return (
      <View
        style={{
          position: 'absolute',
          transform: [
            {
              translateX: posX(column.angle, 0.45) + graphSize / 2 - xthreshold,
            },
            {
              translateY: posY(column.angle, 0.45) + graphSize / 2 - ythreshold,
            },
          ],
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          {column.key}
        </Text>
        <Text
          style={{
            color: 'white',
          }}>
          <Text style={{ color: colorList[0] }}>{data[0][column.key]}</Text>/
          <Text style={{ color: colorList[1] }}>{data[1][column.key]}</Text>
        </Text>
      </View>
    );
  };

  const textIndicator = i => {
    return (
      <Text
        x={-20}
        y={-((i / scaleCount) * graphSize)}
        fill="#444"
        fontWeight="bold"
        fontSize="30"
        textAnchor="middle">
        {i}
      </Text>
    );
  };

  const groups = [];
  const labels = Object.keys(data[0]);
  const units = {};
  labels.forEach(
    el => (units[el] = Math.max(_.get(data[0], el), _.get(data[1], el))),
  );
  const columns = labels.map((key, i, arr) => {
    return {
      key,
      angle: (Math.PI * 2 * (i + 0.5)) / arr.length,
    };
  });

  for (let i = scaleCount; i >= 0; i--) {
    groups.push(<G>{scaleShape(columns, i)}</G>);
  }

  groups.push(<G key={'groups}'}>{data.map(shape(columns, units))}</G>);
  groups.push(
    <G key={'group-captions'}>{columns.map(label(data, options.colorList))}</G>,
  );

  if (options.showAxis) {
    groups.push(<G key={'group-axes'}>{columns.map(axis())}</G>);
  }

  if (options.showIndicator) {
    for (let i = 0; i <= scaleCount; i++) {
      if (i % numberInterval == 0) {
        groups.push(<G key={'group-eiei'}>{textIndicator(i)}</G>);
      }
    }
  }
  return (
    <Svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={graphSize}
      height={graphSize}
      viewBox={`0 0 ${boxSize} ${boxSize}`}>
      <G transform={`translate(${centerPos},${centerPos})`}>{groups}</G>
    </Svg>
  );
}
