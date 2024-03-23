import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customTheme } from '../../../constants';
import EventCarousel from '../../../components/coach/Dashboard/EventsCarousel';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import { ChallengeCard } from '../../../components/common/cards/ChallengeCard';
import { hp } from '../../../utils/responsive';
import {
  useGetMonthlyScheduleData,
  useGetScheduleData,
} from '../../../api/myteam.api';
import { useAuth } from '../../../hooks/useAuth';
import PracticeScheduleItem from '../../../components/common/PracticeScheduleItem';
import { groupBy } from 'lodash';
import { SectionHeader } from '../../../components/common/SectionHeader';
import EmptyView from '../../../components/players/EmptyView';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function ScheduleCalendar() {
  const navigation = useNavigation();
  const { isPlayer, isCoach } = useAuth();
  const [calendarDate, setCalendarDate] = useState(moment());

  const currentTime = useMemo(
    () =>
      Math.round(
        calendarDate
          ?.utc()
          ?.set('hours', 0)
          .set('minutes', 0)
          .set('seconds', 0)
          .set('date', calendarDate.get('date'))
          .toDate()
          .getTime(),
      ),
    [calendarDate],
  );

  const { data: scheduleData } = useGetScheduleData({ currentTime });
  const { data: monthlyScheduleData, mutate: mutateMonthlyScheduleData } =
    useGetMonthlyScheduleData();

  const currentMonthYearStartEndDate = useMemo(() => {
    const momentDate = moment(calendarDate);
    const startDate = momentDate?.utc().startOf('month').toDate().getTime();
    const endDate = momentDate?.utc().endOf('month').toDate().getTime();
    return `${startDate},${endDate}`;
  }, [calendarDate]);

  useEffect(() => {
    const [startDate, endDate] = currentMonthYearStartEndDate.split(',');
    mutateMonthlyScheduleData({ startDate, endDate });
  }, [currentMonthYearStartEndDate, mutateMonthlyScheduleData]);

  const selectedDate = useMemo(() => {
    return {
      year: calendarDate.year(),
      month: months[calendarDate.month()],
      day: calendarDate.date(),
    };
  }, [calendarDate]);

  const handleCalendarClick = date => {
    setCalendarDate(date);
  };

  const markedDatesArray = useMemo(() => {
    if (!monthlyScheduleData?.data) {
      return [];
    }

    const res = groupBy(monthlyScheduleData?.data, i =>
      moment(i.scheduledAt).format('DD-MM-YYYY'),
    );

    return Object.keys(res).map(item => ({
      date: new Date(moment(item, 'DD-MM-YYYY').format('YYYY-MM-DD')),
      dots: res[item].map(i => ({
        color:
          i?.eventType === 'PRACTICE'
            ? customTheme.colors.yellow20
            : customTheme.colors.blue20,
        selectedColor:
          i?.eventType === 'PRACTICE'
            ? customTheme.colors.yellow20
            : customTheme.colors.blue20,
      })),
    }));
  }, [monthlyScheduleData?.data]);

  const gamesList = scheduleData?.data?.gamesList || [];
  const practiceList = scheduleData?.data?.practiceList || [];
  const challengeList = scheduleData?.data?.challengeList || [];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View paddingH-16>
        <Text header-bold>Calendar</Text>
        <View row spread centerV>
          <View marginT-24 marginB-8>
            <Text medium white>
              {selectedDate?.year}
            </Text>
            <Text header-bold>{selectedDate?.month}</Text>
          </View>
          <View style={{ rowGap: hp(0.5) }}>
            <Text centerH>
              <View
                width={customTheme.spacings.spacing_12}
                height={customTheme.spacings.spacing_12}
                style={{ borderRadius: customTheme.spacings.spacing_16 }}
                backgroundColor={customTheme.colors.blue20}
              />{' '}
              <Text medium-600> Game</Text>
            </Text>
            <Text centerH>
              <View
                width={customTheme.spacings.spacing_12}
                height={customTheme.spacings.spacing_12}
                style={{ borderRadius: customTheme.spacings.spacing_16 }}
                backgroundColor={customTheme.colors.yellow20}
              />{' '}
              <Text medium-600> My Practice</Text>
            </Text>
          </View>
        </View>
      </View>
      <CalendarStrip
        scrollable
        scrollToOnSetSelectedDate
        selectedDate={calendarDate}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        headerText={' '}
        onDateSelected={date => {
          handleCalendarClick(date);
        }}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 10,
          borderColor: customTheme.colors.primary,
        }}
        style={{ height: hp(9), paddingBottom: hp(2) }}
        calendarColor={customTheme.colors.primary}
        calendarHeaderStyle={styles.whiteText}
        dateNumberStyle={styles.whiteText}
        dateNameStyle={styles.whiteText}
        iconContainer={{ opacity: 0 }}
        iconLeft={null}
        iconRight={null}
        highlightDateContainerStyle={{
          borderColor: customTheme.colors.blue20,
        }}
        highlightDateNameStyle={styles.blueText}
        highlightDateNumberStyle={styles.blueText}
        dayContainerStyle={styles.stripDayContainer}
        markedDates={markedDatesArray}
      />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <ViewContainer includeStatusBar={false}>
          {!gamesList.length &&
            !practiceList.length &&
            !challengeList.length && (
              <View
                style={{
                  paddingHorizontal: customTheme.spacings.spacing_16,
                  paddingTop: hp(10)
                }}>
                <EmptyView />
              </View>
            )}
          {!!gamesList.length && (
            <EventCarousel title="Upcoming Games" data={gamesList} />
          )}
          {!!isPlayer && !!challengeList.length && (
            <>
              <SectionHeader
                title={'My Challenges'}
                containerStyle={{ marginBottom: hp(1.5) }}
                hideSeeAll={challengeList?.length <= 2}
                onPressSeeAll={() => navigation.navigate('MyChallenges')}
              />
              {!challengeList.length && (
                <Text style={styles.noDataText}>No data available</Text>
              )}
              {challengeList.map(item => (
                <ChallengeCard
                  title={'August 21, 2022'}
                  subTitle={'3-4:00 PM'}
                />
              ))}
            </>
          )}
          {!!practiceList.length && (
            <>
              <SectionHeader
                title={'My Practice'}
                containerStyle={{ marginBottom: hp(1.5) }}
                hideSeeAll={practiceList?.length <= 2}
                onPressSeeAll={() =>
                  navigation.navigate('SeeAllPractices', { practiceList })
                }
              />
              {!practiceList.length && (
                <Text style={styles.noDataText}>No data available</Text>
              )}
              {!!practiceList.length &&
                practiceList
                  .slice(0, 2)
                  .map(item => (
                    <PracticeScheduleItem
                      key={item?.practiceId}
                      data={item}
                      disabled={!!isCoach}
                    />
                  ))}
            </>
          )}
        </ViewContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
    textAlign: 'center',
    marginVertical: hp(2),
  },
  whiteText: { color: 'white' },
  blueText: { color: customTheme.colors.blue20 },
  stripDayContainer: {
    borderRadius: 10,
    borderColor: customTheme.colors.tertiary,
    borderWidth: 2,
    backgroundColor: customTheme.colors.background,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: hp(1.5),
  },
});
