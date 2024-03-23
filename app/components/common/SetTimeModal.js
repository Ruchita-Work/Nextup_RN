import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dash, Dialog, Text } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { hp, wp } from '../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import times from 'lodash/times';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import PrimaryButton from './PrimaryButton';

export const getStaticTimeData = () => {
  return {
    hours: times(12).map(item => String(item + 1).padStart(2, '0')),
    minutes: times(60).map(item => String(item).padStart(2, '0')),
    seconds: times(60).map(item => String(item).padStart(2, '0')),
    timeTypes: ['PM', 'AM'],
  };
};

const SetTimeModal = ({
  isVisible = false,
  setIsVisible = () => {},
  onConfirmTime = () => {},
  initialData = {},
}) => {
  const { bottom } = useSafeAreaInsets();
  const [selectedTimeData, setSelectedTimeData] = useState(initialData);
  const timeData = useMemo(() => getStaticTimeData(), []);

  const hoursScrollRef = useRef(null);
  const minutesScrollRef = useRef(null);
  const secondsScrollRef = useRef(null);
  const timeTypeScrollRef = useRef(null);

  const onPressTimeItem = (key, data, index) => {
    onTimeValueChangeHandler(key, data, index);

    if (key === 'selectedHour') {
      hoursScrollRef?.current?.scrollToTargetIndex(index);
    }
    if (key === 'selectedMinute') {
      minutesScrollRef?.current?.scrollToTargetIndex(index);
    }
    if (key === 'selectedSecond') {
      secondsScrollRef?.current?.scrollToTargetIndex(index);
    }
    if (key === 'selectedTimeType') {
      timeTypeScrollRef?.current?.scrollToTargetIndex(index);
    }
  };

  const renderItem = useCallback((type, data, index, isSelected) => {
    return (
      <TouchableOpacity onPress={() => onPressTimeItem(type, data, index)}>
        <Text large-x-600 style={styles.timeItem(isSelected)}>
          {data}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  const commonScrollProps = useMemo(
    () => ({
      wrapperBackground: 'transparent',
      wrapperHeight: hp(21),
      highlightColor: customTheme.colors.light,
      itemHeight: hp(7),
    }),
    [],
  );

  useEffect(() => {
    setSelectedTimeData(initialData);
  }, [initialData]);

  const onTimeValueChangeHandler = (key, data, selectedIndex) => {
    setSelectedTimeData(prevValue => ({
      ...prevValue,
      [key]: { data, index: selectedIndex },
    }));
  };

  const onPressCancelHandler = () => {
    setIsVisible(false);
  };

  const onPressSaveHandler = () => {
    setIsVisible(false);
    onConfirmTime(selectedTimeData);
  };

  return (
    <Dialog
      width={wp(100)}
      visible={isVisible}
      overlayBackgroundColor={customTheme.colors.black + '70'}
      bottom
      onDismiss={() => setIsVisible(false)}
      panDirection={null}>
      <View style={styles.container(bottom)}>
        <Text medium-x-400 style={styles.title}>
          Set time
        </Text>
        <Dash
          length={wp(100)}
          color={customTheme.colors.light + '20'}
          thickness={1}
        />
        <View style={styles.timeSelectionContainer}>
          <ScrollPicker
            ref={hoursScrollRef}
            {...commonScrollProps}
            dataSource={timeData.hours}
            selectedIndex={initialData.selectedHour.index}
            onValueChange={onTimeValueChangeHandler.bind(this, 'selectedHour')}
            renderItem={renderItem.bind(this, 'selectedHour')}
          />
          <Text large-x-500 style={styles.timeSeparator(wp(18.5))}>
            :
          </Text>
          <ScrollPicker
            ref={minutesScrollRef}
            {...commonScrollProps}
            dataSource={timeData.minutes}
            selectedIndex={initialData.selectedMinute.index}
            onValueChange={onTimeValueChangeHandler.bind(
              this,
              'selectedMinute',
            )}
            renderItem={renderItem.bind(this, 'selectedMinute')}
          />
          <Text large-x-500 style={styles.timeSeparator(wp(37))}>
            :
          </Text>
          <ScrollPicker
            ref={secondsScrollRef}
            {...commonScrollProps}
            dataSource={timeData.seconds}
            selectedIndex={initialData.selectedSecond.index}
            onValueChange={onTimeValueChangeHandler.bind(
              this,
              'selectedSecond',
            )}
            renderItem={renderItem.bind(this, 'selectedSecond')}
          />
          <ScrollPicker
            ref={timeTypeScrollRef}
            {...commonScrollProps}
            dataSource={timeData.timeTypes}
            selectedIndex={initialData.selectedTimeType.index}
            onValueChange={onTimeValueChangeHandler.bind(
              this,
              'selectedTimeType',
            )}
            renderItem={renderItem.bind(this, 'selectedTimeType')}
          />
        </View>
        <View style={styles.footerButtonsContainer}>
          <PrimaryButton
            title="Cancel"
            style={styles.cancelButton}
            onPress={onPressCancelHandler}
          />
          <PrimaryButton
            title="Save"
            style={styles.saveButton}
            onPress={onPressSaveHandler}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default SetTimeModal;

const styles = StyleSheet.create({
  container: bottom => ({
    backgroundColor: customTheme.colors.background,
    height: hp(44) + bottom,
    paddingBottom: bottom,
    width: wp(100),
    borderTopRightRadius: wp(7.5),
    borderTopLeftRadius: wp(7.5),
  }),
  title: {
    alignSelf: 'center',
    paddingVertical: hp(2),
    color: customTheme.colors.txtFieldPlaceHolder,
  },
  timeItem: isSelected => ({
    color: isSelected
      ? customTheme.colors.light
      : customTheme.colors.charcoal_gray,
  }),
  timeSelectionContainer: {
    flexDirection: 'row',
    height: hp(21),
    width: wp(75),
    alignSelf: 'center',
    marginTop: hp(4),
  },
  timeSeparator: left => ({
    left,
    top: hp(9),
    position: 'absolute',
  }),
  cancelButton: {
    width: wp(40),
    borderRadius: wp(10),
    borderColor: customTheme.colors.steel_gray,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  saveButton: { width: wp(40), borderRadius: wp(10) },
  footerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: hp(2),
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
});
