import { Image, StyleSheet } from 'react-native';
import React from 'react';
import Back from '../../../utils/HeaderButtons/Back';
import { hp, wp } from '../../../utils/responsive';
import { appImages } from '../../../constants/appImages';
import StandingsTable from '../../../components/games/Standings/StandingsTable';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllStandings = () => {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View row centerV spread style={styles.header}>
        <Back title="Standings" />
        <TouchableOpacity row centerV>
          <Text regular-500 style={styles.dropdownTitle}>
            Division
          </Text>
          <Image source={appImages.dropdown} style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>
      <StandingsTable />
    </SafeAreaView>
  );
};

export default AllStandings;

const styles = StyleSheet.create({
  dropdownIcon: { height: wp(4), width: wp(4), marginLeft: wp(1) },
  header: { marginTop: hp(3), marginHorizontal: wp(10) },
});
