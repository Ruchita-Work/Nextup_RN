/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { View, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { ViewContainer } from '../../../components/common/ViewConatiner';
import { Layout, Colors, Fonts, customTheme } from '../../../constants';
import AppLoader from '../../../utils/Apploader';
import { TouchableOpacity, Text } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import { TeamsBar } from '../../../components/players/Dashboard/MyTeams';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { hp, wp } from '../../../utils/responsive';
import { ScreenHeader } from '../../../components/common/ScreenHeader';
import { appImages } from '../../../constants/appImages';
import ChallengesCatgory from './ChallengesCatgory';
const wide = Layout.width
const teamData = [
    { name: "Team 1", index: 1 },
    { name: "Team 2", index: 2 },
    { name: "Team 3", index: 3 },
    { name: "Team 4", index: 4 },
    { name: "Team 5", index: 5 },
    { name: "Team 6", index: 6 },
    { name: "Team 7", index: 7 },
    { name: "Team 8", index: 8 },
    { name: "Team 9", index: 9 },
    { name: "Team 10", index: 10 },
    { name: "Team 11", index: 11 },
    { name: "Team 12", index: 12 },
    { name: "Team 13", index: 13 },
    { name: "Team 14", index: 14 },
    { name: "Team 15", index: 15 },
    { name: "Team 16", index: 16 },
    { name: "Team 17", index: 17 },
    { name: "Team 18", index: 18 },
]

const CustomTabView = props => {
    const routeNames = props.navigationState.routeNames || [];
    // console.log("console routenames  ====", routeNames);
const data = [{
    name:"Ai Coach",
    img:require('../../../assets/new/ai.png'),
},{
    name:"Rotary AAU 17",
    img:require('../../../assets/new/aau.png'),
},
{
    name:"O’Dea HS",
    img:require('../../../assets/new/us.png'),
}
]
    const onPressTabhandler = (route, isFocused) => {
        const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            props.navigation.navigate({ name: route.name, merge: true });
        }
    };

    return (
        <View>
            <ScrollView
                contentContainerStyle={styles.tabContainer}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => {
                    const isActive = props.navigationState.index === index;
                    return (
                        <TouchableOpacity
                            key={index}
                            center
                            activeOpacity={0.5}
                            onPress={() =>
                                onPressTabhandler(props.state.routes[index], isActive)
                            }>
                            <View style={{
                                borderBottomColor: customTheme.colors.light,
                                borderBottomWidth: isActive ? 2 : 0,
                            }}>
                                <Image
                                    style={{
                                        height: wide * 0.18,
                                        width: wide * 0.18,
                                        borderRadius: wide * 0.18 / 2,

                                    }}
                                    source={item?.img}
                                />

                                <Text center marginT-12 medium-600>{item?.name}</Text>

                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
const Challenges = (props) => {
    const [loading, setLoading] = useState(false)
    const [selectedTab, setSelectedtab] = useState("first")
    const [teamData, setTeamData] = useState([])
    const [teamId, setTeamID] = useState()
    const [selectTeam, setSelectTeam] = useState(0)
    const TopTab = createMaterialTopTabNavigator();
    let wide = Layout.width;
    return (
        <ViewContainer isView={false}>
            <ScreenHeader title={"My Challenges"} />
            <TopTab.Navigator tabBar={props => <CustomTabView {...props} />}>
                {[...new Array(3).keys()].map((item, index) => {
                    return (
                        <TopTab.Screen
                            key={index}
                            name={'Ai Coach ' + (index + 1)}
                            component={ChallengesCatgory}
                        />
                    );
                })}
            </TopTab.Navigator>

        </ViewContainer>

    )
}

export default Challenges


const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        marginTop: hp(2),
        gap: wp(10),
    },
    tabItemText: {
        textTransform: 'capitalize',
        fontSize: customTheme.fontSizes.size_14,
        fontWeight: '400',
        color: customTheme.colors.darkgray_100,
    },
    activeTabItemtext: { color: customTheme.colors.light, fontWeight: '600' },
});