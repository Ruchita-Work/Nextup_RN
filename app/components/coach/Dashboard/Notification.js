import React from 'react';
import { Avatar, Button, Text, View } from 'react-native-ui-lib';
import { hp, wp } from '../../../utils/responsive';
import { Colors } from '../../../constants';
import { StyleSheet } from 'react-native';
import { MyColors } from '../../../constants/colors';
import { FontSize } from '../../../views/GlobalStyles';
export default function Notification({ containerStyle = {}, close }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.bodyStyle}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Avatar source={require('../../../assets/avatar3.png')} size={40} />
          <Text style={styles.textStyle}>
            {
              'Amit Pal is on NextUp. Please confirm if this player is on your team.'
            }
          </Text>
        </View>
        <View
          style={{
            padding: wp(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button label="Accept" size="xSmall" />
            <Button
              label="Decline"
              backgroundColor="red"
              onPress={close}
              size="xSmall"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {    
    // top: -100,
    position: 'absolute',
    width: '100%',
  },
  bodyStyle: {
    flex: 1,
    // flexDirection: 'row',
    zIndex: 100,
    padding: wp(2),
    marginHorizontal: wp(3),
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    height: 'auto',
  },
  textStyle: {
    width: '90%',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: wp(2),
    color: MyColors.light,
  },
});
