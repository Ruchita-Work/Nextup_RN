import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Fonts } from '../../../constants';
import SeasonSelectDropdown from '../../../components/common/SeasonSelectDropdown';
import { hp, wp } from '../../../utils/responsive';
import { appImages } from '../../../constants/appImages';

export default function SelectionHeader({
  season,
  allSeason,
  selectSeason,
  selectTeam,
  homeTeamData,
  awayTeamData,
}) {
  const renderLeftSide = data => (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.teamImageContainer}>
        <FastImage
          style={styles.teamImage}
          source={data?.logoUrl}
          defaultSource={appImages.defaultAvatarImage}
        />
      </View>
      <Text numberOfLines={3} style={styles.teamNameText}>
        {data?.name}
      </Text>
    </View>
  );

  const renderRightSide = data => (
    <TouchableOpacity style={styles.rightTeamContainer} onPress={selectTeam}>
      {renderLeftSide(data)}
      <Image
        style={styles.dropdownIcon}
        source={require('../../../assets/images/dropDownIcon.png')}
      />
    </TouchableOpacity>
  );

  const renderAddIcon = () => (
    <TouchableOpacity style={styles.addTeamButton} onPress={selectTeam}>
      <Image
        source={require('../../../assets/add.png')}
        style={{ height: '65%', width: '65%' }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!!allSeason && (
        <SeasonSelectDropdown
          seasons={allSeason}
          selectedSeason={season}
          onSelectSeason={e => selectSeason(e)}
          containerStyle={styles.seasonDropdownContainer}
        />
      )}
      <View style={styles.teamsRow}>
        <View style={styles.team}>{renderLeftSide(homeTeamData)}</View>
        <View style={styles.vsImageContainer}>
          <Image
            style={styles.vsImage}
            source={require('../../../assets/images/playerCompareVS.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.team}>
          {awayTeamData ? renderRightSide(awayTeamData) : renderAddIcon()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.recentGameCardColor,
    borderRadius: 8,
    width: wp(90),
  },
  teamsRow: {
    flexDirection: 'row',
    marginVertical: hp(1),
    marginHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  vsImageContainer: {
    width: '20%',
    height: hp(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsImage: {
    width: '95%',
    height: '95%',
  },
  teamImageContainer: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(8),
  },
  teamImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp(8),
  },
  teamNameText: {
    color: Colors.light,
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
    marginTop: hp(0.3),
    textAlign: 'center',
  },
  addTeamButton: {
    height: wp(20),
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  rightTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownIcon: {
    width: wp(5),
    height: wp(5),
    position: 'absolute',
    transform: [{ translateX: 60 }],
    top: '57%',
  },
  seasonDropdownContainer: {
    marginTop: hp(2),
    alignSelf: 'center',
    marginRight: 0,
  },
  team: {
    width: '35%',
    alignItems: 'center',
  },
});
