import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, Text, Button } from 'react-native-ui-lib';
import bgImg from '../../../assets/group-1000002833.png';
import { hp, wp } from '../../../utils/responsive';
import { FontSize } from '../../../views/GlobalStyles';
import { Colors } from '../../../constants';
export default function Empty({ onAddTeam }) {
  return (
    <View style={styles.container}>
      <View style={styles.stateContainer}>
        <Image
          source={bgImg}
          style={{
            height: wp(60),
            width: wp(60),
          }}
        />
        <Text style={styles.textContainer}>
          Currently you don’t have any team. First you can add your team here
        </Text>
      </View>
      <Button label={'Add Your Team'} onPress={onAddTeam} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: hp(15),
    paddingHorizontal: wp(5),
  },
  stateContainer: {
    paddingHorizontal: wp(10),
    marginBottom: hp(3),
  },
  textContainer: {
    textAlign: 'center',
    fontSize: FontSize.size_mini,
    color: Colors.light,
  },
});
