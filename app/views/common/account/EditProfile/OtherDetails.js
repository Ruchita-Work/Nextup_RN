import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../../../utils/responsive';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { MyColors } from '../../../../constants/colors';
import { FontFamily, FontSize } from '../../../GlobalStyles';
import { Colors } from '../../../../constants';
import SelectionDropdown from '../../../../components/common/SelectionDropdown';

const OtherDetails = () => {
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState('highSchool');

  const HighSchoolForm = useCallback(() => {
    return (
      <>
        <SelectionDropdown
          containerStyle={{ marginTop: hp(4) }}
          title={'Select Coaching'}
          value={'ABC School'}
        />
        <SelectionDropdown
          containerStyle={{ marginTop: hp(3) }}
          title={'Select Team'}
          value={'2019'}
        />
      </>
    );
  }, []);

  const TravelTeamForm = useCallback(() => {
    return (
      <>
        <SelectionDropdown
          containerStyle={{ marginTop: hp(4) }}
          title={'Name'}
          value={'ABC School'}
        />
        <View style={styles.rowCenterSpaceBetween}>
          <SelectionDropdown
            containerStyle={styles.dropdownWithLimitedWidth}
            title={'State'}
            value={'ABC School'}
          />
          <SelectionDropdown
            containerStyle={styles.dropdownWithLimitedWidth}
            title={'City'}
            value={'Albemarle School'}
          />
        </View>
        <SelectionDropdown
          containerStyle={styles.dropdownWithLimitedWidth}
          title={'Age'}
          value={'25'}
        />
      </>
    );
  }, []);

  return (
    <View style={styles.selectOptionsContainer}>
      <Text style={styles.selectOptionText}>Option</Text>
      <RadioGroup
        style={styles.radioGroup}
        initialValue={selectedOption}
        onValueChange={setSelectedOption}>
        <RadioButton
          value={'highSchool'}
          label={'High School'}
          color={MyColors.btnBg}
          size={wp(5)}
          labelStyle={
            selectedOption === 'highSchool'
              ? styles.selectedRadioButtonLabel
              : styles.radioButtonLabel
          }
        />
        <RadioButton
          value={'travelTeam'}
          label={'Travel Team'}
          color={MyColors.btnBg}
          size={wp(5)}
          labelStyle={
            selectedOption === 'travelTeam'
              ? styles.selectedRadioButtonLabel
              : styles.radioButtonLabel
          }
        />
      </RadioGroup>

      {selectedOption === 'highSchool' ? (
        <HighSchoolForm />
      ) : (
        <TravelTeamForm />
      )}
    </View>
  );
};

export default OtherDetails;

const styles = StyleSheet.create({
  selectOptionsContainer: {
    marginHorizontal: wp(2),
    marginTop: hp(2),
  },
  selectOptionText: {
    marginVertical: hp(1.5),
    color: MyColors.txtFieldPlaceHolder,
    textTransform: 'uppercase',
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.robotoRegular,
    fontWeight: '700',
  },
  selectedRadioButtonLabel: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.bodyLargeBold_size,
    fontWeight: '600',
    color: Colors.light,
  },
  radioButtonLabel: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.bodyLargeBold_size,
    color: Colors.light + '70',
    fontWeight: '600',
  },
  radioGroup: { flexDirection: 'row', gap: wp(7) },
  rowCenterSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownWithLimitedWidth: { marginTop: hp(3), width: wp(39) },
});
