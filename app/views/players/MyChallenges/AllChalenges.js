import React, { useState, useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Colors,
} from 'react-native-ui-lib';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import { Layout } from '../../../constants';
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../../views/GlobalStyles';
import { usePremiumChallenges } from '../../../api/players.api';
let wide = Layout.width;

export default function AllChallenges({ navigation }) {
  const [apiData, setApiData] = useState(null);

  const { data, isLoading, error } = usePremiumChallenges({
    challengeListId: 8989898,
  });

  // Handle loading and error states
  useEffect(() => {
    if (isLoading) {
      // Render loading state
    } else if (error) {
      // Render error state
    } else {
      // Render data
      setApiData(data);
    }
  }, [isLoading, error, data]);
  function _renderItem({ item }) {
    return (
      <View>
        {item?.typeOfChallenge === 'STATS' ? (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              if (item?.typeOfChallenge === 'QUESTION') {
                navigation.navigate('playerquestions', { data: item });
              } else if (item?.typeOfChallenge === 'VIDEO') {
                navigation.navigate('ChallengeVideo', { data: item });
              } else {
              }
            }}>
            <View style={[styles.shadowView]}>
              <ImageBackground
                source={{ uri: 'https://wallpaper.dog/large/10913047.jpg' }}
                style={[{ height: 200 }]}>
                <View style={[styles.overlay]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 24,
                    }}>
                    <View style={[styles.cardContentWrapper]}>
                      <View row>
                        <Text medium-700>{item?.name} </Text>
                        {item?.typeOfChallenge === 'STATS' ? (
                          <Image
                            style={{
                              marginLeft: wide * 0.015,
                              height: 20,
                              width: 20,
                              resizeMode: 'contain',
                            }}
                            source={require('../../../assets/images/Vector.png')}
                          />
                        ) : null}
                      </View>

                      <Text style={[styles.textGold, styles.bodyContentTitle]}>
                        {' '}
                        {item.description.substring(0, 15)}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#246BFD',
                        position: 'absolute',
                        height: 30,
                        width: 80,
                        right: 15,
                        top: -10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/new/active.png')}
                        style={{ height: 15, width: 15, resizeMode: 'contain' }}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 13,
                          fontWeight: '600',
                          paddingLeft: 3,
                        }}>
                        Active
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.cardFooter]}>
                    <Image
                      useBackgroundContainer
                      source={{
                        uri: 'https://github.com/wix/react-native-ui-lib/blob/master/demo/src/assets/images/card-example.jpg',
                      }}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 20,
                      }}>
                      {
                        Object.keys(item.statsBasedChallenge.stats).map(
                          (stat, index) => {
                            return (
                              <View
                                key={index}
                                style={{
                                  alignItems: 'center',
                                  width: 50,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View>
                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      fontSize: FontSize.size_lg,
                                      color: Colors.white,
                                      textAlign: 'center',
                                      width: 'auto',
                                    }}>
                                    {stat}
                                  </Text>
                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      fontSize: FontSize.size_xl,
                                      color: Colors.white,
                                    }}>
                                    {item.statsBasedChallenge.stats[stat]}
                                  </Text>
                                </View>
                                {/* {index !== playerScores.length - 1 && <View style={{ height: 36, width: 2, backgroundColor: Colors.white, marginLeft: 24 }} />} */}
                              </View>
                            );
                          },
                        )

                        // _.map(playerScores, (item, index) => {
                        //     return <View key={index} style={{
                        //         alignItems: 'center',
                        //         width: 40,
                        //         flexDirection: 'row',
                        //         justifyContent: 'space-between'

                        //     }}>
                        //         <View>
                        //             <Text style={{
                        //                 textAlign: 'center',
                        //                 fontSize: FontSize.size_3xl,
                        //                 color: Colors.white,
                        //                 textAlign: 'center'

                        //             }} t>{item.label}</Text>
                        //             <Text style={{
                        //                 textAlign: 'center',
                        //                 fontSize: FontSize.size_xl,
                        //                 color: Colors.white

                        //             }}>{item.value}</Text>

                        //         </View>
                        //         {index !== playerScores.length - 1 && <View style={{ height: 36, width: 2, backgroundColor: Colors.white, marginLeft: 24 }} />}
                        //     </View>
                        // })
                      }
                      <View></View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              if (item?.typeOfChallenge === 'QUESTION') {
                navigation.navigate('playerquestions', { data: item });
              } else if (item?.typeOfChallenge === 'VIDEO') {
                navigation.navigate('ChallengeVideo', { data: item });
              } else {
              }
            }}>
            <View style={[styles.shadowView]}>
              <ImageBackground
                source={{ uri: 'https://wallpaper.dog/large/10913047.jpg' }}
                style={[{ height: 200 }]}>
                <View style={[styles.overlay]}>
                  <View
                    style={{ marginTop: wide * 0.05, padding: wide * 0.03 }}>
                    <View
                      style={{
                        backgroundColor: '#246BFD',
                        position: 'absolute',
                        height: 30,
                        width: 80,
                        right: 15,
                        top: -10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/new/active.png')}
                        style={{ height: 15, width: 15, resizeMode: 'contain' }}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 13,
                          fontWeight: '600',
                          paddingLeft: 3,
                        }}>
                        Active
                      </Text>
                    </View>
                    <View row>
                      <Text medium-700>{item?.name} </Text>
                      {item?.typeOfChallenge === 'STATS' ? (
                        <Image
                          style={{
                            marginLeft: wide * 0.015,
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                          }}
                          source={require('../../../assets/images/Vector.png')}
                        />
                      ) : item?.typeOfChallenge === 'VIDEO' ? (
                        <Image
                          style={{
                            marginLeft: wide * 0.015,
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                          }}
                          source={require('../../../assets/new/video.png')}
                        />
                      ) : item?.typeOfChallenge === 'QUESTION' ? (
                        <Image
                          style={{
                            marginLeft: wide * 0.015,
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                          }}
                          source={require('../../../assets/new/small.png')}
                        />
                      ) : null}
                    </View>

                    <Text style={[styles.textGold, styles.bodyContentTitle]}>
                      {' '}
                      {item.description.substring(0, 15)}
                    </Text>
                    <View style={{ marginTop: wide * 0.03 }}>
                      <FlatList
                        data={item?.roadToProDetails?.questionnaireChallenge}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        pagingEnabled={true}
                        legacyImplementation={false}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              flex: 4,
                              flexDirection: 'row',
                              marginTop: wide * 0.02,
                            }}>
                            <Image
                              style={{
                                height: wide * 0.07,
                                width: wide * 0.07,
                                borderRadius: (wide * 0.07) / 2,
                              }}
                              source={{ uri: item?.imageUrl }}
                            />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ViewContainer includeStatusBar={false}>
      <SafeAreaView
        style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={45}
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{ marginLeft: wide * 0.003, marginRight: wide * 0.003 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => {
                return (
                  <Text
                    style={{
                      color: 'white',
                      marginTop: 10,
                      fontSize: 16,
                      fontWeight: '600',
                      textDecorationLine: 'underline',
                    }}>
                    Suggested
                  </Text>
                );
              }}
              data={apiData?.data?.suggestedByAi}
              contentContainerStyle={{ paddingBottom: 20 }}
              bounces={false}
              renderItem={_renderItem}
              ListFooterComponent={() => {
                return (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                      return (
                        <Text
                          style={{
                            color: 'white',
                            marginTop: 10,
                            fontSize: 16,
                            fontWeight: '600',
                            textDecorationLine: 'underline',
                          }}>
                          Trending
                        </Text>
                      );
                    }}
                    data={apiData?.data?.trending}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    bounces={false}
                    //   keyExtractor={(item) => item.index.toString()}
                    renderItem={_renderItem}
                  />
                );
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ViewContainer>
  );
}
const styles = StyleSheet.create({
  cardHeader: {
    backgroundColor: Colors.yellow30,
    height: 50,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  cardBody: {
    paddingHorizontal: Padding.p_8xs,
    backgroundColor: Colors.$backgroundDark,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  cardIcon: {
    position: 'absolute',
    top: -28,
    left: 20,
    backgroundColor: Colors.blue10,
  },
  cardActiveStatus: {
    marginTop: 16,
    alignSelf: 'flex-end',
    backgroundColor: Colors.blue30,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: 8,
  },
  cardCompletedStatus: {
    backgroundColor: Color.limegreen,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: 8,
  },
  cardContentWrapper: {
    marginTop: 16,
  },
  cardFooter: {
    marginTop: 'auto',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWhite: {
    color: Colors.white,
  },
  textGold: {
    color: Color.goldenrod_100,
  },
  bodyContentHeader: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 20,
    fontWeight: '700',
  },
  bodyContentTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: Padding.p_8xs,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 for 50% opacity) for the blur effect
    // borderRadius:40,
    // overflow:"hidden",
  },
  shadowView: {
    backgroundColor: 'white',
    borderRadius: wide * 0.05,
    overflow: 'hidden',
    marginVertical: 16,
    // Shadow styles for Android
    ...Platform.select({
      android: {
        elevation: 5,
      },
      // Shadow styles for iOS
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
    }),
  },
});
