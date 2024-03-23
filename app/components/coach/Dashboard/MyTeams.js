import * as React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { FontSize, FontFamily, Color } from '../../../views/GlobalStyles';
import TeamItem from '../../common/TeamItem';
import { hp, wp } from '../../../utils/responsive';
import { ScrollView } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';

export const TeamsBar = ({
  handleAddTeam,
  onSelect,
  current,
  teams = [],
  containerStyle,
}) => {
  const { isCoach } = useAuth();
  return (
    <View style={[styles.myTeamsParent, containerStyle]}>
      <Text style={[styles.myTeams, styles.vamTypo1]}>My Teams</Text>
      <ScrollView
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.teamNamesRow}>
        {teams.map((el, index) => (
          <TeamItem
            key={`TeamsBar-${index}`}
            onPress={() => onSelect(index)}
            imageSource={{ uri: el.teamLogoUrl }}
            name={el.name}
            isActive={current === index}
            containerStyle={{ width: wp(28) }}
          />
        ))}
        {teams.length < 3 && !!isCoach && (
          <TeamItem
            imageSource={require('../../../assets/images/CoachDasAddTeamIcon.png')}
            name="Add Team"
            imageContainerStyle={{ borderRadius: 0 }}
            onPress={handleAddTeam}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  vamTypo1: {
    fontFamily: FontFamily.robotoBold,
    fontWeight: '600',
  },
  myTeams: {
    fontSize: FontSize.size_3xl,
    color: Color.othersWhite,
    lineHeight: 22,
    textAlign: 'left',
  },
  teamNamesRow: {
    marginTop: hp(2),
    flexDirection: 'row',
    columnGap: wp(4),
  },
  myTeamsParent: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
});
