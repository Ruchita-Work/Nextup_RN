import * as React from 'react';
import {hp, wp} from '../../../../utils/responsive';
import {Color, FontSize} from '../../../GlobalStyles';
import {MyColors} from '../../../../constants/colors';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const CustomTabView = props => {
  const routeNames = props.navigationState.routeNames || [];

  const onPressTabhandler = (route, isFocused) => {
    const event = props.navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      props.navigation.navigate({name: route.name, merge: true});
    }
  };

  return (
    <View style={styles.tabContainer}>
      {routeNames.map((item, index) => {
        const isActive = props.navigationState.index === index;
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() =>
              onPressTabhandler(props.state.routes[index], isActive)
            }>
            <Text
              numberOfLines={1}
              style={[styles.tabItemText, isActive && styles.activeTabItemtext]}
              key={index}>
              {item}
            </Text>
            {/* {isActive && <View style={styles.underline} />} */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginTop: hp(2),
  },
  tabItemText: {
    textTransform: 'capitalize',
    fontSize: FontSize.bodyMediumSemibold_size,
    fontWeight: '400',
    color: Color.darkgray_100,
  },
  activeTabItemtext: {
    color: MyColors.light,
    fontWeight: '600',
    borderBottomColor: MyColors.white_08,
    borderBottomWidth: 2,
  },
  underline: {
    height: 2,
    backgroundColor: MyColors.white_08,
    position: 'absolute',
    bottom: 0,
    width: 60,
  },
});

export default CustomTabView;
