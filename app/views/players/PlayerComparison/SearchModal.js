import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import { Colors, Layout, Fonts } from '../../../constants';
import { SearchInput } from '../../../components/common/customTextInput';
import { wp, hp } from '../../../utils/responsive';
import { FontSize } from '../../GlobalStyles';
const wide = Layout.width;

function Player({ name, profileImg }) {
  return (
    <View
      style={{
        width: '25%',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <FastImage source={profileImg} style={{ width: 50, height: 50 }} />
      <Text style={{ color: Colors.light, fontWeight: '600' }}>{name}</Text>
    </View>
  );
}
function Team({ name, profileImg, location }) {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
      }}>
      <Image source={profileImg} style={{ width: '40%', height: 70 }} />
      <View
        style={{
          display: 'flex',
          padding: 15,
          flexDirection: 'col',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: Colors.light,
            fontSize: FontSize.size_base,
            fontWeight: '600',
          }}>
          {name}
        </Text>
        <Text
          style={{
            color: Colors.white_08,
            fontSize: FontSize.size_xs,
          }}>
          {location}
        </Text>
      </View>
    </View>
  );
}

export default function SearchModal({ isOpen, close }) {
  const [searchText, setSearchText] = useState('');
  const arrPlayers = [
    {
      name: 'A. McCoy',
      profileImg: require('../../../assets/ellipse-7562.png'),
    },
    {
      name: 'A. McCoy',
      profileImg: require('../../../assets/ellipse-6892.png'),
    },
    {
      name: 'A. McCoy',
      profileImg: require('../../../assets/ellipse-6902.png'),
    },
    {
      name: 'A. McCoy',
      profileImg: require('../../../assets/ellipse-7562.png'),
    },
    {
      name: 'A. McCoy',
      profileImg: require('../../../assets/ellipse-7562.png'),
    },
    {
      name: 'A. McCoy',
      profileImg: require('../../../assets/ellipse-7562.png'),
    },
  ];
  const teams = [
    {
      profileImg: require('../../../assets/team1.png'),
      name: 'Rainier Beach',
      location: 'Seattle, WA',
    },
    {
      profileImg: require('../../../assets/team2.png'),
      name: 'Garfield High',
      location: 'Seattle, WA',
    },
    {
      profileImg: require('../../../assets/team3.png'),
      name: 'Eastlake HS',
      location: 'Redmond, WA',
    },
  ];
  return (
    <Modal visible={isOpen} animationType={'slide'}>
      <View
        style={{
          backgroundColor: Colors.base,
          height: '100%',
          paddingVertical: 10,
        }}>
        <View
          style={{
            marginHorizontal: 15,
            alignItems: 'center',
            marginTop: wide * 0.05,
            marginBottom: wide * 0.02,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <SearchInput
            onChange={text => setSearchText(text)}
            style={{
              borderRadius: 40,
              borderWidth: 0,
              width: '80%',
              height: hp(30),
              backgroundColor: Colors.neutral,
            }}
            placeholder={'What are you looking for?'}
            preIcon={
              <Image
                source={require('../../../assets/images/search.png')}
                style={styles.searchIcon}
              />
            }
          />

          <Button
            round
            onPress={close}
            style={{ width: 44, height: 44, margin: 10 }}
            size={'large'}
            backgroundColor={Colors.neutral}>
            <FontAwesomeIcon icon={faClose} size={20} color={Colors.light} />
          </Button>
        </View>

        <ScrollView
          style={{ height: 'auto' }}
          horizontal={false}
          //   showsHorizontalScrollIndicator={false}
          //   bounces={false}
          contentContainerStyle={{ marginBottom: wide * 0.05 }}>
          <View
            style={{
              width: '88%',
              alignSelf: 'center',
              // height: wide * 0.47,
              backgroundColor: Colors.recentGameCardColor,
              borderRadius: 8,
              padding: 15,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: FontSize.size_5xl,
                color: Colors.light,
              }}>
              Top Players
            </Text>
            <View
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {arrPlayers.map(el => (
                <Player name={el.name} profileImg={el.profileImg} />
              ))}
            </View>
          </View>
          <View
            style={{
              width: '88%',
              alignSelf: 'center',
              // height: wide * 0.47,
              backgroundColor: Colors.recentGameCardColor,
              borderRadius: 8,
              padding: 15,
            }}>
            <Text
              style={{
                fontSize: FontSize.size_5xl,
                color: Colors.light,
              }}>
              Trending Teams
            </Text>
            <View>
              {teams.map(el => (
                <Team
                  name={el.name}
                  profileImg={el.profileImg}
                  location={el.location}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    // height: 45,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // borderColor: Colors.lightshade,
    // color: Colors.lightshade,

    borderWidth: 2,
    borderColor: Colors.newGrayFontColor,
    fontFamily: Fonts.Bold,
    height: 45,
    // width: '90%',
    paddingLeft: 10,
    paddingRight: wide * 0.1,
    borderRadius: 5,
    color: Colors.light,
    fontSize: 16,
  },
  searchIcon: { height: wp(5), width: wp(5) },
});
