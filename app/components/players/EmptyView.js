import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, Text, Button } from 'react-native-ui-lib';
import bgImg from '../../assets/group-1000002833.png';
import { hp, wp } from '../../utils/responsive';
import { FontSize } from '../../views/GlobalStyles';
import { Colors } from '../../constants';
export default function EmptyView({title = 'No Data Found'}) {
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
          {title}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
    justifyContent:'center',
    alignItems:'center'
  },
  stateContainer: {
    paddingHorizontal: wp(10),
    marginBottom: hp(3),
  },
  textContainer: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: FontSize.size_mini,
    color: Colors.light,
    marginVertical: hp(2)
  },
});
