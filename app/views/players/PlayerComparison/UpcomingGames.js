import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Fonts, Layout } from '../../../constants';
const wide = Layout.width;
export default function UpcomingGames() {
  return (
    <View
      style={{
        marginTop: wide * 0.08,
        width: '88%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: Colors.light,
            fontFamily: Fonts.SemiBold,
            fontSize: 22,
            lineHeight: 22,
            fontWeight: '600',
            marginLeft: wide * 0.015,
          }}>
          Upcoming Games
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: wide * 0.01,
          }}>
          <Text
            style={{
              color: Colors.btnBg,
              fontFamily: Fonts.Medium,
              fontSize: 14,
              lineHeight: 16,
              fontWeight: '500',
            }}>
            See All
          </Text>
          <Image
            source={require('../../../assets/images/seeAll_Icon.png')}
            style={{ width: 14, height: 14 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>
        <FlatList
          data={[1, 2]}
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: wide * 0.02, overflow: 'visible' }}
          horizontal
          pagingEnabled={true}
          legacyImplementation={false}
          keyExtractor={item => item.index}
          renderItem={(item, index) => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wide * 0.05,
                borderRadius: 8,
                width: wide * 0.6,
                height: wide * 0.3,
              }}
              activeOpacity={1}
              // onPress={() => Navigation.navigate('GamesRecentTab', { 'gameId': item.id })}
            >
              <Image
                source={require('../../../assets/images/upcomming_gameCard.png')}
                style={{
                  width: '100%',
                  height: '100%',

                  borderRadius: 8,
                  position: 'absolute',
                }}
              />

              <View
                style={{
                  marginTop: wide * 0.055,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  // backgroundColor: "green",
                  width: '78%',
                  justifyContent: 'space-between',
                }}>
                {/* edit by keshav */}
                <View
                  style={{
                    width: wide * 0.16,
                    height: wide * 0.16,
                    backgroundColor: Colors.light,
                    borderRadius: (wide * 0.16) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 4,
                    borderColor: '#565B68',
                    marginLeft: wide * 0.004,
                  }}>
                  <FastImage
                    style={{
                      width: wide * 0.15,
                      height: wide * 0.15,
                      borderRadius: (wide * 0.15) / 2,
                    }}
                    // resizeMode={'contain'}
                    source={require('../../../assets/group-1000002856.png')}
                  />
                </View>

                <View
                  style={{
                    width: wide * 0.16,
                    height: wide * 0.16,
                    backgroundColor: Colors.light,
                    borderRadius: (wide * 0.16) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: wide * 0.002,
                    borderWidth: 4,
                    borderColor: '#565B68',
                  }}>
                  <FastImage
                    style={{
                      width: wide * 0.15,
                      height: wide * 0.15,
                      borderRadius: (wide * 0.15) / 2,
                    }}
                    // resizeMode={'contain'}
                    source={require('../../../assets/group-1000002857.png')}
                  />
                </View>
              </View>

              <Text
                style={{
                  color: Colors.light,
                  fontSize: 12,
                  fontFamily: Fonts.SemiBold,
                  fontWeight: '500',
                  lineHeight: 16,
                  // marginBottom: wide * 0.08,
                  marginTop: wide * 0.01,
                }}>
                44-29
                {/* {moment((new Date(item.scheduledAt))).format('DD')}  {moment((new Date(item.scheduledAt))).format('MMM')} */}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
