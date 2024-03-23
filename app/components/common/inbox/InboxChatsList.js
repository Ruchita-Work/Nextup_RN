import { FlatList, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import InboxChatItem from './InboxChatItem';
import { hp, wp } from '../../../utils/responsive';
import { Text, View,Image } from 'react-native-ui-lib';
import bgImg from '../../../assets/group-1000002833.png';
import { FontSize } from '../../../views/GlobalStyles';
import { Colors } from '../../../constants';

const InboxChatsList = ({ containerStyle = {}, channelData = [] }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ListEmptyComponent={
          <View center flex>
             <Image
          source={bgImg}
          style={{
            height: wp(60),
            width: wp(60),
          }}
        />
            <Text style={styles.textContainer}>
              No Chats Found
            </Text>
          </View>
        }
        data={channelData}
        renderItem={({ item }) => <InboxChatItem chatInfo={item} />}
      />
    </View>
  );
};

export default memo(InboxChatsList);

const styles = StyleSheet.create({
  container: { paddingTop: hp(10), flex: 1 },
  textContainer: {
    textAlign: 'center',
    fontSize: FontSize.size_mini,
    color: Colors.light,
    marginVertical: hp(2)
  },
});
