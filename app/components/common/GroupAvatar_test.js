import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-ui-lib';

const overlap = 12;

const GroupAvatar = ({ avatarUrls }) => {
  return (
    <View style={styles.container}>
      {avatarUrls.map((url, index) => (
        <Avatar
          key={index}
          source={url}
          containerStyle={{ right: index * overlap }}
          size={40}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { GroupAvatar };
