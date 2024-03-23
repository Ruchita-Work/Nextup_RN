import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  FlatList,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import { Colors, Layout, Fonts } from '../../../constants';
import { FontSize } from '../../GlobalStyles';
import { hp } from '../../../utils/responsive';
import { appImages } from '../../../constants/appImages';
const wide = Layout.width;
const high = Layout.height;
export default function SelectionHeader({
  season,
  allSeason,
  selectSeason,
  selectPlayer,
  homePlayerData,
  awayPlayerData,
}) {

  const [isExpanded, setExpand] = useState(false);
  const renderSeasonList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          marginTop: 10,
          // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        onPress={() => {
          selectSeason(item?.item);
          setExpand(false);
        }}>
        <Text
          style={{
            color: Colors.light,
            fontSize: 15,
            lineHeight: 16,
            fontFamily: Fonts.Bold,
          }}>
          {item.item}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderLeftSide = data => (
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
          source={data?.profileImg}
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
        }}>
        {data?.name}
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
        }}>{`Rank #${data?.rank !== undefined ? data?.rank : 0}`}</Text>

      <View
        style={{
          width: wide * 0.09,
          height: wide * 0.09,
          borderRadius: (wide * 0.09) / 2,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: wide * 0.01,
        }}>
        <FastImage
          style={{
            width: '98%',
            height: '98%',
            // borderRadius: wide * 0.09 / 2
          }}
          source={data?.teamProfileImg}
          resizeMode={'cover'}
        />
      </View>
    </View>
  );
  const renderRightSide = data => (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }} onPress={selectPlayer}>
      {renderLeftSide(data)}
      <Image
        style={{
          width: wide * 0.04,
          height: wide * 0.04,
          marginLeft: wide * 0.01,
          position: 'absolute',
          transform: [{ translateX: 60 }],
        }}
        source={require('../../../assets/images/dropDownIcon.png')}
      />
    </TouchableOpacity>
  );
  const renderAddIcon = () => (
    <View style={{flex: 1, alignItems: "center", marginTop: hp(2)}}>
      <TouchableOpacity
        style={{
          width: wide * 0.2,
          height: wide * 0.2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={selectPlayer}>
        <Image
          source={require('../../../assets/add.png')}
          style={{
            color: Colors.btnBg,
            fontFamily: Fonts.Medium,
            fontSize: FontSize.size_13xl,
            lineHeight: 19,
            fontWeight: '500',
            height: '50%',
            width: '50%',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View
      style={{
        width: '88%',
        alignSelf: 'center',
        height: wide * 0.55,
        backgroundColor: Colors.recentGameCardColor,
        borderRadius: 8,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '50%',
          alignSelf: 'center',
          height: wide * 0.08,
          justifyContent: 'center',
          marginTop: wide * 0.025,
        }}
        activeOpacity={0.7}
        onPress={() => setExpand(true)}>
        <Text
          style={{
            color: Colors.light,
            fontFamily: Fonts.Medium,
            fontSize: 14,
            lineHeight: 16,
            fontWeight: '500',
          }}>
          {season}
        </Text>
        <Image
          style={{
            width: wide * 0.045,
            height: wide * 0.045,
            marginLeft: wide * 0.01,
            tintColor: Colors.light,
          }}
          source={require('../../../assets/images/dropDownIcon.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          height: 0.5,
          backgroundColor: Colors.light,
          opacity: 0.6,
          alignSelf: 'center',
          marginTop: wide * 0.02,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginTop: wide * 0.05,
          justifyContent: 'space-start',
          alignItems: 'center',
        }}>
        <View style={{ width: '40%' }}>{renderLeftSide(homePlayerData)}</View>
        <View
          style={{
            width: '20%',
            height: wide * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: wide * 0.1,
            // backgroundColor: 'red'
          }}>
          <Image
            style={{ width: '95%', height: '95%' }}
            source={require('../../../assets/images/playerCompareVS.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={{ width: '40%' }}>
          {awayPlayerData ? renderRightSide(awayPlayerData) : renderAddIcon()}
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={isExpanded}>
        <TouchableOpacity
          onPress={() => setExpand(false)}
          style={{
            width: wide,
            height: high,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BlurView
            style={{
              width: wide,
              height: high,
              position: 'absolute',
              // justifyContent: 'center', alignItems: 'center'
            }}
            blurAmount={10}
            blurRadius={10}
          />
          <TouchableOpacity
            style={{
              width: '60%',
              height: wide * 0.5,
              backgroundColor: Colors.ractangelCardColor,
              marginTop: 20,
              borderRadius: 20,
              alignItems: 'center',
            }}
            activeOpacity={1}>
            <View
              style={{
                width: '100%',
                height: '15%',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
              }}>
              <Text
                style={{
                  color: Colors.light,
                  fontFamily: Fonts.Bold,
                  fontSize: 14,
                  lineHeight: 16,
                }}>
                Select
              </Text>
            </View>

            <View style={{ width: '60%', height: '80%' }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1 }}
                data={allSeason}
                renderItem={(item, index) => renderSeasonList(item, index)}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
