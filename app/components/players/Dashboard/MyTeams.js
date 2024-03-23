/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react';
import { View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TeamItem from '../../common/TeamItem';
import { hp, wp } from '../../../utils/responsive';
import { customTheme } from '../../../constants';
import { useAuth } from '../../../hooks/useAuth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export const TeamsBar = ({
  showDropDown = true,
}) => {
  const navigation = useNavigation();
  const { isCoach } = useAuth();

  return (
    <View style={styles.myTeamsParent}>
      <View style={styles.myTeamChildView}>
        <Text style={[styles.myTeams, styles.vamTypo1]}>My Teams</Text>
        {
          showDropDown && <View style={styles.chevronIconView}>

            <Text style={styles.yearText}>2020-21</Text>
            <Image
              source={require('../../../assets/chevrondown5.png')}
              style={styles.chevronIcon}
            />
          </View>
        }
      </View>
      <View style={styles.teamNamesRow}>
        {isCoach && (
          <View>
            <TouchableOpacity
              style={styles.plusView}
              onPress={() => navigation.navigate('AddNewTeam')}>
              <View style={styles.plusIconView}>
                <Image
                  style={[styles.plusIcon]}
                  source={require('../../../assets/plus.png')}
                  tintColor={customTheme.colors.btnBg}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.plusIconAddText}>Add</Text>
          </View>
        )}
        <TeamItem
          imageSource={require('../../../assets/frame9.png')}
          name="O’Dea HS"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vamTypo1: {
    fontFamily: customTheme.fontFamily.robotoBold,
    fontWeight: '600',
  },
  myTeams: {
    fontSize: customTheme.fontSizes.size_22,
    color: customTheme.colors.light,
  },
  plusIconView: {
    borderWidth: 1.5,
    borderColor: customTheme.colors.btnBg,
    alignSelf: 'center',
    padding: wp(0.8),
    borderRadius: wp(2.5),
  },
  plusIcon: {
    width: wp(5),
    height: wp(5),
  },
  plusView: {
    borderWidth: 2,
    width: wp(18),
    height: wp(18),
    borderColor: customTheme.colors.btnBg,
    justifyContent: 'center',
    borderRadius: wp(10),
    alignItems: 'center',
    marginTop: wp(2),
  },
  plusIconAddText: {
    color: customTheme.colors.btnBg,
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoRegular,
    paddingBottom: hp(1),
    paddingTop: hp(1.5),
    textAlign: 'center',
  },
  teamNamesRow: {
    marginTop: hp(1.2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  myTeamsParent: { marginTop: hp(2.5) },
  myTeamChildView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  chevronIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(4),
  },
  chevronIcon: {
    height: wp(4),
    width: wp(4),
  },
  yearText: {
    fontSize: customTheme.fontSizes.size_13,
    color: customTheme.colors.light,
  },
});
