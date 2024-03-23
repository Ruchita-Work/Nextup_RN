import React, { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import _, { uniqueId } from 'lodash';
import backImg from '../../../assets/images/coatbg.png';
import { hp, wp } from '../../../utils/responsive';
import { FontSize } from '../../GlobalStyles';
import { Colors } from '../../../constants';
import { LiveGameContext } from '.';
import FastImage from 'react-native-fast-image';
import { appImages } from '../../../constants/appImages';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

function Position({ x, y, children }) {
  const style = { transform: [{ translateX: x }, { translateY: y }] };
  return <View style={[style, styles.positionContainer]}>{children}</View>;
}
function Player({ name = '', imageUrl, color }) {
  return (
    <View style={styles.playerContainer}>
      <FastImage
        source={imageUrl}
        defaultSource={appImages.defaultAvatarImage}
        style={styles.playerImage}
      />
      <View
        style={[
          styles.playerName,
          { width: name.length * 10, maxWidth: wp(32) },
        ]}>
        <Text
          numberOfLines={2}
          style={[styles.playerNameText, { backgroundColor: color }]}>
          {name}
        </Text>
      </View>
    </View>
  );
}

/** Basketball Court
 *
 */

export default function LineUp() {
  const { isCoach } = useAuth();
  const navigation = useNavigation();
  const { data } = useContext(LiveGameContext);

  const defenderTeamPlayers = useMemo(() => {
    if (data?.defenderTeamInfo?.lineup?.playerPositionsList) {
      const playersList = data?.defenderTeamInfo?.lineup?.playerPositionsList;
      let newData = {};
      playersList.forEach(i => {
        newData[i.teamPosition] = i.availablePlayersList;
      });
      return [...newData.GUARD, ...newData.CENTER, ...newData.FORWARD];
    } else {
      return [];
    }
  }, [data]);

  const challengerTeamPlayers = useMemo(() => {
    if (data?.challengerTeamInfo?.lineup?.playerPositionsList) {
      const playersList = data?.challengerTeamInfo?.lineup?.playerPositionsList;
      let newData = {};
      playersList.forEach(i => {
        newData[i.teamPosition] = i.availablePlayersList;
      });
      return [...newData.GUARD, ...newData.CENTER, ...newData.FORWARD];
    } else {
      return [];
    }
  }, [data]);

  const players =
    !!defenderTeamPlayers && !!challengerTeamPlayers
      ? [
          // Defender Team Lineup
          {
            id: `defender-${defenderTeamPlayers[0]?.playerId || uniqueId()}`,
            name: defenderTeamPlayers[0]?.playerName,
            image: { uri: defenderTeamPlayers[0]?.playerProfilePictureUrl },
            isHome: true,
            x: -60,
            y: -100,
          },
          {
            id: `defender-${defenderTeamPlayers[1]?.playerId || uniqueId()}`,
            name: defenderTeamPlayers[1]?.playerName,
            image: { uri: defenderTeamPlayers[1]?.playerProfilePictureUrl },
            isHome: true,
            x: 60,
            y: -100,
          },
          {
            id: `defender-${defenderTeamPlayers[2]?.playerId || uniqueId()}`,
            name: defenderTeamPlayers[2]?.playerName,
            image: { uri: defenderTeamPlayers[2]?.playerProfilePictureUrl },
            isHome: true,
            x: -60,
            y: -60,
          },
          {
            id: `defender-${defenderTeamPlayers[3]?.playerId || uniqueId()}`,
            name: defenderTeamPlayers[3]?.playerName,
            image: { uri: defenderTeamPlayers[3]?.playerProfilePictureUrl },
            isHome: true,
            x: 60,
            y: -60,
          },
          {
            id: `defender-${defenderTeamPlayers[4]?.playerId || uniqueId()}`,
            name: defenderTeamPlayers[4]?.playerName,
            image: { uri: defenderTeamPlayers[4]?.playerProfilePictureUrl },
            isHome: true,
            x: 0,
            y: -20,
          },
          // Challenger Team Lineup
          {
            id: `challenger-${
              challengerTeamPlayers[0]?.playerId || uniqueId()
            }`,
            name: challengerTeamPlayers[0]?.playerName,
            image: { uri: challengerTeamPlayers[0]?.playerProfilePictureUrl },
            isHome: false,
            x: -60,
            y: 100,
          },
          {
            id: `challenger-${
              challengerTeamPlayers[1]?.playerId || uniqueId()
            }`,
            name: challengerTeamPlayers[1]?.playerName,
            image: { uri: challengerTeamPlayers[1]?.playerProfilePictureUrl },
            isHome: false,
            x: 60,
            y: 100,
          },
          {
            id: `challenger-${
              challengerTeamPlayers[2]?.playerId || uniqueId()
            }`,
            name: challengerTeamPlayers[2]?.playerName,
            image: { uri: challengerTeamPlayers[2]?.playerProfilePictureUrl },
            isHome: false,
            x: -60,
            y: 60,
          },
          {
            id: `challenger-${
              challengerTeamPlayers[3]?.playerId || uniqueId()
            }`,
            name: challengerTeamPlayers[3]?.playerName,
            image: { uri: challengerTeamPlayers[3]?.playerProfilePictureUrl },
            isHome: false,
            x: 60,
            y: 60,
          },
          {
            id: `challenger-${
              challengerTeamPlayers[4]?.playerId || uniqueId()
            }`,
            name: challengerTeamPlayers[4]?.playerName,
            image: { uri: challengerTeamPlayers[4]?.playerProfilePictureUrl },
            isHome: false,
            x: 0,
            y: 20,
          },
        ]
      : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.field}>
        <ImageBackground
          style={{ height: wp(120) }}
          source={backImg}
          resizeMode="contain">
          {_.map(players, player => (
            <Position
              key={player.id}
              x={(player.x / 100) * wp(30) + wp(38)}
              y={(player.y / 100 + 1) * wp(50)}>
              <Player
                name={player.name}
                imageUrl={player.image}
                color={player.isHome ? Colors.violet : Colors.btnRed}
              />
            </Position>
          ))}
        </ImageBackground>
      </View>
      {!!isCoach && (
        <Button
          label="Edit Lineup"
          onPress={() => {
            navigation.navigate('CoachStack', {
              screen: 'MyTeam',
              params: {
                screen: 'MyTeams',
                params: { screen: 'Lineup' },
              },
            });
          }}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  field: {
    paddingVertical: hp(2),
  },
  playerContainer: {
    alignItems: 'center',
  },
  playerNameText: {
    color: Colors.light,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    fontSize: FontSize.size_sm_3,
  },
  playerName: {
    backgroundColor: Colors.transparent,
    position: 'absolute',
    transform: [{ translateY: wp(10) }],
    width: 'auto',
    alignItems: 'center',
    textAlign: 'center',
  },
  playerImage: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(6),
    bottom: hp(0.8),
  },
  positionContainer: {
    position: 'absolute',
  },
});
