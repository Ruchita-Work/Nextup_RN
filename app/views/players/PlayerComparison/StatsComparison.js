import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Layout, Fonts} from '../../../constants';
import {FontSize} from '../../GlobalStyles';
import { appImages } from '../../../constants/appImages';
const wide = Layout.width;
function Player({name, image, position}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wide * 0.14,
          height: wide * 0.14,
          borderRadius: (wide * 0.14) / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FastImage
          style={{
            width: '95%',
            height: '95%',
            borderRadius: (wide * 0.14) / 2,
          }}
          source={image}
          resizeMode={'cover'}
          defaultSource={appImages.defaultAvatarImage}
        />
      </View>
      <Text
        style={{
          color: Colors.light,
          fontFamily: Fonts.SemiBold,
          fontSize: 12,
          lineHeight: 19,
          fontWeight: '600',
          marginTop: wide * 0.008,
          textAlign: "center"
        }}>
        {name}
      </Text>
      <Text
        style={{
          color: Colors.light,
          fontFamily: Fonts.Medium,
          fontSize: 12,
          lineHeight: 19,
          fontWeight: '500',
          opacity: 0.7,
          marginTop: wide * 0.002,
        }}>
        {position}
      </Text>
    </View>
  );
}
function EmptyPlayer() {
  return (
    <TouchableOpacity
      style={{
        width: wide * 0.2,
        height: wide * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          position: 'absolute',
          height: '70%',
          width: '70%',
        }}
        source={require('../../../assets/ellipse-6891.png')}
      />

      <Image
        style={{
          color: Colors.light,
          fontFamily: Fonts.Medium,
          fontSize: FontSize.size_13xl,
          lineHeight: 19,
          fontWeight: '500',
          height: '40%',
          width: '40%',
        }}
        resizeMode="contain"
        source={require('../../../assets/account.png')}
      />
    </TouchableOpacity>
  );
}

export default function StatsComparison({homePlayerData = {}, awayPlayerData = {}}) {
  return (
    <View
      style={{
        width: '88%',
        alignSelf: 'center',
        height: wide * 0.47,
        backgroundColor: Colors.recentGameCardColor,
        borderRadius: 8,
      }}>
      <View
        style={{
          alignItems: 'center',
          width: '60%',
          alignSelf: 'center',
          // height: wide * 0.08,
          justifyContent: 'center',
          marginTop: wide * 0.04,
        }}>
        <Text
          style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold,
            fontSize: 20,
            lineHeight: 22,
            fontWeight: '600',
          }}>
          Stats Comparison
        </Text>
        <Text
          style={{
            color: Colors.light,
            fontFamily: Fonts.Medium,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: '500',
            opacity: 0.5,
          }}>
          16-Game 30-point Streak
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '85%',
          alignSelf: 'center',
          marginTop: wide * 0.04,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '40%'}}>
          <Player
            name={homePlayerData.name}
            position={'Power Forward'}
            image={homePlayerData.profileImg}
          />
        </View>
        <View
          style={{
            width: '20%',
            height: wide * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: wide * 0.05,
            // backgroundColor: 'red'
          }}>
          <Image
            style={{width: '95%', height: '95%'}}
            source={require('../../../assets/images/playerCompareVS.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={{width: '40%'}}>
          {awayPlayerData ? (
            <Player
              name={awayPlayerData.name}
              position={'Point Guard'}
              image={awayPlayerData.profileImg}
            />
          ) : (
            <EmptyPlayer />
          )}
        </View>
      </View>
    </View>
  );
}
