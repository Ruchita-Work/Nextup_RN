import { Image, Text, View, TouchableOpacity, ScrollBar } from "react-native-ui-lib";
import { ImageBackground, ScrollView } from "react-native"
import { ViewContainer } from "../../../components/common/ViewConatiner";
import { Layout, customTheme } from "../../../constants";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import { GroupAvatar } from "../../../components/common/GroupAvatar";
import { useNavigation } from "@react-navigation/native";
const wide = Layout.width
const Colors = customTheme.colors
const Fonts = customTheme.fontFamily
const roadToProData = [...new Array(3).keys()].map((item, index) => {
    return {
        index: index,
        name: 'Level ' + (index + 1)
    }
})
export default function ReadyToProp() {
    const navigation = useNavigation()
    const [selectedLevel, setSelectedLevel] = useState(0)
    const _renderPremiumCard = () => (
        <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{
                width: '98%',
                height: wide * 1.16,
                alignSelf: 'center',
                marginTop: wide * 0.06,
                borderRadius: wide * 0.03,
                // alignItems: 'center',

            }}>
                <Image
                    source={require('../../../Images/premiumCard.png')}
                    style={{
                        width: '100%', height: '100%', position: 'absolute',
                        borderRadius: wide * 0.03,
                    }}
                    resizeMode={'cover'}
                />
                <View style={{
                    marginTop: wide * 0.05,
                    flexDirection: "row", width: '95%',
                    alignSelf: 'center'
                }}>
                    <Image
                        source={require('../../../Images/premiumCard.png')}
                        style={{
                            width: wide * 0.09, height: wide * 0.09,
                            marginLeft: wide * 0.01,
                        }}
                        resizeMode={'cover'}
                    />
                    <View style={{
                        marginLeft: wide * 0.07, alignItems: 'center',
                        marginTop: wide * 0.02
                    }}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 15,
                            lineHeight: 22,
                            fontFamily: Fonts.Medium,
                            color: Colors.light
                        }}>GET THE</Text>

                        <Text style={{
                            fontWeight: "800",
                            fontSize: 26,
                            lineHeight: 28,
                            fontFamily: Fonts.XBold,
                            color: Colors.light
                        }}>NEXTUP PRIME</Text>
                    </View>
                </View>

                <View style={{
                    // alignItems: 'center',
                    marginTop: wide * 0.19,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginLeft: wide * 0.06,
                    }}>
                        {/* <Image source={require('./../../Images/premiumCardBulletIcon.png')}
                            style={{ width: 15, height: 15 }}
                        /> */}
                        <Text style={{
                            fontWeight: "600",
                            fontSize: 15,
                            lineHeight: 22,
                            fontFamily: Fonts.SemiBold,
                            color: Colors.light,
                            marginLeft: wide * 0.02
                        }}>Create Multiple Lineup</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginLeft: wide * 0.06,
                        marginTop: wide * 0.03
                    }}>
                        {/* <Image source={require('./../../Images/premiumCardBulletIcon.png')}
                            style={{ width: 15, height: 15 }}
                        /> */}
                        <Text style={{
                            fontWeight: "600",
                            fontSize: 15,
                            lineHeight: 22,
                            fontFamily: Fonts.SemiBold,
                            color: Colors.light,
                            marginLeft: wide * 0.02
                        }}>Road to Pro challenges</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginLeft: wide * 0.06,
                        marginTop: wide * 0.03
                    }}>
                        {/* <Image source={require('../../../Images/premiumCardBulletIcon.png')}
                            style={{ width: 15, height: 15 }}
                        /> */}
                        <Text style={{
                            fontWeight: "600",
                            fontSize: 15,
                            lineHeight: 22,
                            fontFamily: Fonts.SemiBold,
                            color: Colors.light,
                            marginLeft: wide * 0.02
                        }}>Asigned multiple challenges</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginLeft: wide * 0.06,
                        marginTop: wide * 0.03
                    }}>
                        {/* <Image source={require('../../../Images/premiumCardBulletIcon.png')}
                            style={{ width: 15, height: 15 }}
                        /> */}
                        <Text style={{
                            fontWeight: "600",
                            fontSize: 15,
                            lineHeight: 22,
                            fontFamily: Fonts.SemiBold,
                            color: Colors.light,
                            marginLeft: wide * 0.02
                        }}>See game advance statistics</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginLeft: wide * 0.06,
                        marginTop: wide * 0.04
                    }}>
                        {/* <Image source={require('../../../Images/premiumCardBulletIcon.png')}
                            style={{ width: 15, height: 15 }}
                        /> */}
                        <Text style={{
                            fontWeight: "600",
                            fontSize: 15,
                            lineHeight: 22,
                            fontFamily: Fonts.SemiBold,
                            color: Colors.light,
                            marginLeft: wide * 0.02
                        }}>See player advance statistics</Text>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center', alignItems: 'center',
                    marginTop: wide * 0.05,
                }}>
                    <Text style={{
                        fontWeight: "700",
                        fontSize: 37,
                        lineHeight: 40,
                        fontFamily: Fonts.Bold,
                        color: Colors.premiumPriceColor,
                        marginLeft: wide * 0.02
                    }}>$ 78.99</Text>
                </View>
                <View style={{
                    flexDirection: 'row', marginTop: wide * 0.05, alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontWeight: "700",
                        fontSize: 14,
                        lineHeight: 18,
                        fontFamily: Fonts.Bold,
                        color: Colors.light,
                        marginHorizontal: wide * 0.03
                    }}>Monthly</Text>
                    {/* <SwitchToggle
                        // switchOn={on}
                        containerStyle={{
                            // marginTop: 16,
                            width: wide * 0.18,
                            height: 38,
                            borderRadius: 25,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,

                        }}
                        // onPress={() => off(!on)}
                        circleColorOff={Colors.light}
                        circleColorOn={Colors.light}
                        backgroundColorOn='#444856'
                        backgroundColorOff='#444856'
                    /> */}

                    <Text style={{
                        fontWeight: "700",
                        fontSize: 14,
                        lineHeight: 18,
                        fontFamily: Fonts.Bold,
                        color: Colors.light,
                        marginHorizontal: wide * 0.03
                    }}>Yearly</Text>


                </View>
            </View>


        </View>
    )
    function _renderCard() {
        return <TouchableOpacity onPress={() => navigation.navigate('ChallengeVideo')}>
            <View style={{ marginTop: wide * 0.05 }}>
                <ImageBackground
                    source={require('../../../Images/challenge.png')}
                    style={{
                        width: '100%',
                        height: wide * 0.45,


                    }}
                    resizeMode={'stretch'}
                >
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ flex: 1 }}>
                            <Image
                                style={{
                                    marginLeft: wide * 0.05,
                                    marginTop: wide * 0.05,
                                }}
                                source={require('../../../Images/circle.png')}
                            />
                        </View>

                    </View>
                    <View style={{ marginLeft: wide * 0.04, marginTop: wide * 0.03 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: Colors.light,
                                fontWeight: '700',
                                fontSize: 17,
                                fontFamily: 'Metropolis',
                                fontSize: 17,



                            }}>
                                {'Dribble Challenge'}
                            </Text>

                        </View>

                        <Text
                            style={{
                                fontFamily: 'Metropolis',
                                fontSize: 12,
                                fontWeight: '600',
                                color: '#FFB920',
                                marginTop: wide * 0.01

                            }}
                        >08 Days Left</Text>
                        <View style={{
                            marginTop: wide * 0.08
                        }}>
                            <GroupAvatar avatarUrls={[
                                'https://example.com/avatar1.jpg',
                                'https://example.com/avatar2.jpg',
                                'https://example.com/avatar3.jpg',
                                // Add more avatar URLs as needed
                            ]} />
                        </View>


                    </View>
                </ImageBackground>

            </View>
        </TouchableOpacity>
    }
    return <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <FlatList
            data={roadToProData}

            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}

            legacyImplementation={false}

            keyExtractor={item => item.index}
            renderItem={({ item }) => (
                <View >
                    <TouchableOpacity onPress={() => { setSelectedLevel(item.index) }}>
                        <View style={{
                            width: wide * 0.23, height: wide * 0.32,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                            borderColor: Colors.borderColor,
                            backgroundColor: selectedLevel == item.index ? '#246BFD' : '#181A20',
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: item.index === 0 ? 0 : wide * 0.05

                        }}>
                            <Image style={{
                                width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
                                    item.index === 1 ?
                                        Colors.light : Colors.overlayWhite
                            }} resizeMode={'contain'}
                                source={require('../../../assets/images/level_gold.png')} />

                            <Text style={{
                                color: item.index === 1 || item.index === 0 ? Colors.light : Colors.overlayWhite, fontSize: 12, fontFamily: Fonts.Bold,
                                marginLeft: 5, marginTop: wide * 0.03
                            }}>
                                Level {item.index + 1}
                            </Text>

                        </View>
                    </TouchableOpacity>
                    <View style={{
                        height: wide * 0.1, width: '100%',
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <View style={{
                            width: '100%', height: wide * 0.02,
                            backgroundColor: Colors.borderColor,
                            justifyContent: 'center', alignItems: 'center',
                            borderTopLeftRadius: wide * 0.02 / 2,
                            borderBottomLeftRadius: wide * 0.02 / 2,
                            left: wide * 0.1 / 9,
                            borderTopRightRadius: wide * 0.02 / 2,
                            borderBottomRightRadius: wide * 0.02 / 2,
                            right: wide * 0.1,
                        }}>


                        </View>
                        <Image style={{
                            width: wide * 0.05,
                            height: wide * 0.05,
                            position: 'absolute',
                            left: wide * 0.14,
                            left: item.index === 0 ? wide * 0.1 : wide * 0.14,
                            tintColor: Colors.stars
                        }} resizeMode={'contain'}
                            // https://github.com/piyushprashant93/NextUp/blob/develop/app/assets/tick_selected.png
                            source={item.index === 0 || item.index === 1 ? require('../../../assets/images/level_gold.png') : require('../../../assets/images/level_gold.png')} />
                    </View>
                </View>
            )
            }
        />
        <View marginT-12>
            <Text center white  > Total Points</Text>
            <Text center white large-3xl-700  >2250 </Text>
        </View>
        {_renderCard()}


    </ScrollView>;
}