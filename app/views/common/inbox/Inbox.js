import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import TeamItem from '../../../components/common/TeamItem';
import { hp, wp } from '../../../utils/responsive';
import { SearchInput } from '../../../components/common/searchbar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { customTheme } from '../../../constants';
import InboxChatsList from '../../../components/common/inbox/InboxChatsList';
import { Text, View } from 'react-native-ui-lib';
import { useInbox } from '../../../hooks/useInbox';
import { ViewContainer } from '../../../components/common/ViewConatiner';

const InboxTopTabs = createMaterialTopTabNavigator();

const Inbox = () => {
  const {
    allChatChannelsData,
    coachChatList,
    onChangeTeamHandler,
    onSearchTextChangeHandler,
    selectedTeamId,
    setActiveIndex,
    teamChatList,
  } = useInbox();

  const tabScreenOptions = useMemo(
    () => ({
      headerShown: true,
      tabBarIndicatorStyle: { backgroundColor: customTheme.colors.light },
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarStyle: styles.tabBar,
    }),
    [],
  );

  const teamInbox = useMemo(
    // eslint-disable-next-line react/no-unstable-nested-components
    () => () => <InboxChatsList channelData={teamChatList} />,
    [teamChatList],
  );

  const coachInbox = useMemo(
    // eslint-disable-next-line react/no-unstable-nested-components
    () => () => <InboxChatsList channelData={coachChatList} />,
    [coachChatList],
  );

  return (
    <ViewContainer style={{ paddingHorizontal: 0 }}>
      {allChatChannelsData?.length ? (
        <View row center style={styles.headerTeamsContainer}>
          {allChatChannelsData?.map(item => (
            <TouchableOpacity
              key={item?.teamId}
              onPress={() => onChangeTeamHandler(item)}>
              <TeamItem
                imageSource={{ uri: item?.teamLogoUrl }}
                name={item.teamName}
                isActive={item?.teamId === selectedTeamId}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View center height={hp(16)}>
          <Text large-3xl-700>No Teams Found</Text>
        </View>
      )}
      <SearchInput
        style={styles.searchInput}
        placeholder={'Search Players and Coach'}
        onChange={onSearchTextChangeHandler}
      />
      <InboxTopTabs.Navigator screenOptions={tabScreenOptions}>
        <InboxTopTabs.Screen
          name="Team"
          listeners={{ focus: () => setActiveIndex(0) }}>
          {teamInbox}
        </InboxTopTabs.Screen>
        <InboxTopTabs.Screen
          name="Coaches"
          listeners={{ focus: () => setActiveIndex(1) }}>
          {coachInbox}
        </InboxTopTabs.Screen>
      </InboxTopTabs.Navigator>
    </ViewContainer>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  headerTeamsContainer: {
    marginTop: hp(2),
    paddingHorizontal: wp(4.5),
    alignSelf: 'center',
    width: '100%',
    columnGap: wp(9),
  },
  searchInput: { marginHorizontal: wp(4), marginTop: hp(2) },
  tabBar: {
    backgroundColor: customTheme.colors.background,
    width: '75%',
    alignSelf: 'center',
    elevation: 0,
  },
  tabBarLabel: { color: customTheme.colors.light, textTransform: 'capitalize' },
});
