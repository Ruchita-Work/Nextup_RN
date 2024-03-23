import * as React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Layout, Colors, Fonts } from '../../../../constants';
import bgImg from '../../../../assets/images/playerMatchUpCard.png';
const wide = Layout.width;
function MatchUpBoard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={bgImg} style={styles.backgroundContainer} />

      <View style={styles.vsImgContainer}>
        <View style={styles.img1Container}>
          <FastImage style={styles.image} source={item.homePlayer.imgUrl} />
        </View>

        <View style={styles.img2Container}>
          <FastImage style={styles.image} source={item.secondPlayer.imgUrl} />
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label} numberOfLines={2}>
          {item?.homePlayer.name}
        </Text>

        <Text style={styles.label} numberOfLines={2}>
          {item?.secondPlayer.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default MatchUpBoard;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wide * 0.05,
    borderRadius: 8,
    width: wide * 0.6,
    height: wide * 0.3,
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    position: 'absolute',
  },
  vsImgContainer: {
    marginTop: wide * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: "green",
    width: '78%',
    justifyContent: 'space-between',
  },
  img1Container: {
    width: wide * 0.16,
    height: wide * 0.16,
    backgroundColor: Colors.light,
    borderRadius: (wide * 0.16) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#565B68',
    marginLeft: wide * 0.004,
  },
  img2Container: {
    width: wide * 0.16,
    height: wide * 0.16,
    backgroundColor: Colors.light,
    borderRadius: (wide * 0.16) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#565B68',
  },
  labelContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wide * 0.01,
  },
  label: {
    color: Colors.light,
    fontSize: 12,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
    lineHeight: 16,
    width: '37%',
    textAlign: 'center',
  },
  image: {
    width: wide * 0.15,
    height: wide * 0.15,
    borderRadius: (wide * 0.15) / 2,
  },
});
