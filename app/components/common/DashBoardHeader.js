import * as React from 'react';
import { View, Avatar, Button } from 'react-native-ui-lib';
import { StyleSheet, Text } from 'react-native';
import { FontSize, FontFamily, Color } from '../../views/GlobalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import { customTheme } from '../../constants';
import { hp, wp } from '../../utils/responsive';

export const DashBoardHeader = ({
  imgSrc = null,
  name = null,
  headerLabel = 'Coach',
  onClick,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Avatar source={{ uri: imgSrc }} size={wp(14)} onPress={onClick} />
        <View style={styles.infoContainer}>
          <Text style={[styles.welcomeMsg]}>
            <Text style={styles.welcomeText}>{headerLabel}</Text>
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.vaibhavChibbar1, styles.vamTypo1]}>
            {name ?? 'Unnamed User'}
          </Text>
        </View>
      </View>
      <View style={styles.trophyParent}>
        <Button
          round
          style={{ width: wp(11), height: wp(11), margin: wp(2.5) }}
          size={'large'}
          backgroundColor={customTheme.colors.overlay2}>
          <FontAwesomeIcon
            icon={faBell}
            size={20}
            color={customTheme.colors.light}
          />
        </Button>
        <Button
          round
          style={{ width: wp(11), height: wp(11) }}
          size={'large'}
          backgroundColor={customTheme.colors.overlay2}>
          <FontAwesomeIcon
            icon={faSearch}
            size={20}
            color={customTheme.colors.light}
          />
        </Button>
      </View>
    </View>
  );
};
export default DashBoardHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoContainer: {
    marginLeft: wp(4),
    rowGap: hp(0.5),
    flex: 1,
  },
  welcomeMsg: {
    color: Color.gray_200,
    textAlign: 'left',
    lineHeight: 14,
    fontSize: FontSize.bodyMediumSemibold_size,
  },
  welcomeText: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  welcomeHand: {
    fontFamily: FontFamily.robotoLight,
    fontWeight: '300',
  },
  vaibhavChibbar1: {
    fontSize: FontSize.size_lg,
    marginTop: 2,
    color: Color.othersWhite,
    lineHeight: 22,
    textAlign: 'left',
  },

  vamTypo1: {
    fontFamily: FontFamily.robotoBold,
    fontWeight: '600',
  },
  trophyParent: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIcon: {
    height: 50,
    width: 50,
  },
  magnifyingglassIcon: {
    height: 42,
  },
  iconLayout3: {
    width: 42,
    height: 42,
  },
});
