import React from 'react';
import { customTheme } from '../../../constants';
const { View, Text } = require('react-native');
const { default: styles } = require('./styles');
const { default: GameHeaderTeamItem } = require('./GameHeaderTeamItem');

const GameHeader = ({
  containerStyle = {},
  leftTeaminfo = {
    name: 'Copper Kings',
    color: customTheme.colors.lightBlue,
    subTitle: '',
    image: null,
  },
  rightTeamInfo = {
    name: 'Falcons',
    color: customTheme.colors.lightRed,
    subTitle: '',
    image: null,
  },
}) => {
  return (
    <View style={[styles.gameHeader, containerStyle]}>
      <GameHeaderTeamItem
        name={leftTeaminfo.name}
        color={leftTeaminfo.color}
        subTitle={leftTeaminfo.subTitle}
        image={leftTeaminfo.image}
      />
      <Text style={styles.gameHeaderVSText}>VS</Text>
      <GameHeaderTeamItem
        name={rightTeamInfo.name}
        color={rightTeamInfo.color}
        subTitle={rightTeamInfo.subTitle}
        image={rightTeamInfo.image}
        isReverse
      />
    </View>
  );
};

export default GameHeader;
