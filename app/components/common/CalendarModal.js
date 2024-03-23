import { StyleSheet, View } from 'react-native';
import React from 'react';
import { customTheme } from '../../constants';
import { Dialog } from 'react-native-ui-lib';
import { wp } from '../../utils/responsive';
import { Calendar } from 'react-native-calendars';

const CalendarModal = ({
  isVisible = false,
  setIsVisible = () => {},
  onSelectDate = date => {},
  selectedDate = '',
}) => {
  return (
    <Dialog
      width={wp(100)}
      visible={isVisible}
      overlayBackgroundColor={customTheme.colors.black + '70'}
      onDismiss={() => setIsVisible(false)}
      panDirection={null}>
      <View style={styles.container}>
        <Calendar
          onDayPress={onSelectDate}
          current={selectedDate}
          firstDay={1}
          style={styles.calendar}
          theme={{
            arrowColor: customTheme.colors.storm_gray,
            monthTextColor: customTheme.colors.pale_blue,
            calendarBackground: customTheme.colors.gray_500,
            textDisabledColor: customTheme.colors.dark_slate_gray,
            dayTextColor: customTheme.colors.slate_gray,
            selectedDayTextColor: customTheme.colors.light,
            selectedDayBackgroundColor: customTheme.colors.btnBg,
            textMonthFontFamily: customTheme.fontFamily.robotoRegular,
            textMonthFontSize: customTheme.fontSizes.size_16,
            textMonthFontWeight: '600',
            todayDotColor: customTheme.colors.btnBg,
            todayTextColor: customTheme.colors.pale_blue,
            textDayHeaderFontFamily: customTheme.fontFamily.robotoRegular,
            textDayHeaderFontSize: customTheme.fontSizes.size_12,
            textSectionTitleColor: customTheme.colors.storm_gray,
          }}
          markedDates={{ [selectedDate]: { selected: true } }}
        />
      </View>
    </Dialog>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: customTheme.colors.gray_500,
    width: wp(80),
    alignSelf: 'center',
    borderRadius: wp(4),
  },
  calendar: {
    backgroundColor: customTheme.colors.gray_500,
    borderRadius: wp(4),
    overflow: 'hidden',
  },
});
