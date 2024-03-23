import React, { useCallback, useContext } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import StaffItem from '../../../components/common/StaffItem';
import { hp, wp } from '../../../utils/responsive';
import HeaderGreyComponent from '../../../components/common/HeaderGreyComponent';
import AddButtonWithIcon from '../../../components/common/AddButtonWithIcon';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { MyTeamsContext } from '../../../context/MyTeamsProvider';
import { useDeleteStaff, useGetRoleTabData } from '../../../api/myteam.api';
import { errorToast } from '../../../utils/toast';
import { customTheme } from '../../../constants';
import AppLoader from '../../../utils/Apploader';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';

const Roles = () => {
  const { isCoach, user } = useAuth();
  const navigation = useNavigation();

  const { selectedTeam, selectedSeason } = useContext(MyTeamsContext);
  const { data, refetch: refetchRoleTabData } = useGetRoleTabData({
    season: selectedSeason,
    userId: user?.id,
    teamId: selectedTeam?.teamId,
    onError: () => {
      errorToast({
        title: 'Error',
        body: 'Failed to get data! Please try again after some time',
      });
    },
    enabled: !!(selectedSeason && user?.id && selectedTeam?.teamId),
  });

  useRefreshOnFocus(refetchRoleTabData);

  const { isLoading: isLoadingDeleteStaff, mutateAsync: deleteStaffMutation } =
    useDeleteStaff();

  const roleData = data?.data || null;

  const renderRightContent = role => {
    const handleOnPressInvite = () => {
      navigation.navigate('InvitePlayers', {
        role,
        isAddStaff: true,
      });
    };
    return isCoach ? <AddButtonWithIcon onPress={handleOnPressInvite} /> : null;
  };

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyComponentView}>
        <Text style={styles.emptyText}>No Data Found</Text>
      </View>
    );
  }, []);

  const deleteStaffHandler = useCallback(
    async staffItem => {
      try {
        await deleteStaffMutation({
          teamId: selectedTeam?.teamId,
          coachId: staffItem?.coachId,
        });

        refetchRoleTabData();
      } catch (error) {
        errorToast({
          title: 'Fail',
          body: 'Failed to delete staff! Please try again after sometime',
        });
      }
    },
    [selectedTeam, deleteStaffMutation, refetchRoleTabData],
  );

  const StaffList = useCallback(
    ({ listData }) => {
      return (
        <FlatList
          scrollEnabled={false}
          data={listData}
          keyExtractor={(item, index) => `${item?.coachId}-${index}`}
          renderItem={({ item }) => (
            <StaffItem
              containerStyle={{ marginTop: hp(2) }}
              name={item?.name}
              email={item?.email}
              profilePic={item?.profilePictureUrl}
              onPressDelete={() => deleteStaffHandler(item)}
            />
          )}
          ListEmptyComponent={renderEmptyComponent}
        />
      );
    },
    [renderEmptyComponent, deleteStaffHandler],
  );

  return (
    <View style={{ paddingHorizontal: wp(4.5) }}>
      {isLoadingDeleteStaff && <AppLoader />}
      <ScrollView
        contentContainerStyle={styles.scroll}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <HeaderGreyComponent
          title="Coaches"
          containerStyle={{ marginTop: hp(2.5) }}
          rightContent={renderRightContent.bind(null, 'COACH')}
        />
        <StaffList listData={roleData?.coachRoleList} />
        <HeaderGreyComponent
          title="Stat Keeper"
          containerStyle={{ marginTop: hp(4) }}
          rightContent={renderRightContent.bind(null, 'STATS_KEEPER')}
        />
        <StaffList listData={roleData?.stackLoggers} />
        <HeaderGreyComponent
          title="Trainers"
          containerStyle={{ marginTop: hp(4) }}
          rightContent={renderRightContent.bind(null, 'TRAINER')}
        />
        <StaffList listData={roleData?.trainers} />
      </ScrollView>
    </View>
  );
};

export default Roles;

const styles = StyleSheet.create({
  emptyComponentView: {
    alignItems: 'center',
    marginTop: wp(5),
  },
  emptyText: {
    color: customTheme.colors.white,
    fontFamily: customTheme.fontFamily.robotoMedium,
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_16,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },
});
