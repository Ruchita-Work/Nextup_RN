import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput } from '../../../components/common/searchbar';
import { hp, wp } from '../../../utils/responsive';
import { FontFamily } from '../../GlobalStyles';
import Back from '../../../utils/HeaderButtons/Back';
import { Colors } from '../../../constants';
import { useGetTeamList } from '../../../api/compare.api';
import { useAuth } from '../../../hooks/useAuth';
import { debounce } from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';

const SearchTeamItem = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.searchTeamItem} onPress={onPress}>
      <FastImage
        source={{ uri: data?.pictureUrl, priority: 'high' }}
        style={styles.searchTeamImage}
        defaultSource={require('../../../Images/noImage.png')}
        resizeMode="stretch"
      />
      <View style={styles.searchTeamBody}>
        <Text style={styles.searchTeamName} numberOfLines={2}>
          {data?.name || 'N/A'}
        </Text>
        <Text style={styles.searchTeamCity} numberOfLines={2}>
          Seattle, WA
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NoDataText = () => <Text style={styles.nodataText}>No teams found</Text>;

const SearchTeams = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: teamListResponse } = useGetTeamList({
    userId: user?.id,
    search: searchTerm,
  });

  const onPressSearchTeamItem = item => {
    params?.onSelectTeam?.(item);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Back />
        <SearchInput
          onChange={text => debounce(() => setSearchTerm(text), 500)()}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.pageTitle}>Trending Teams</Text>
        <FlatList
          data={teamListResponse?.data || []}
          renderItem={({ item }) => (
            <SearchTeamItem
              data={item}
              onPress={onPressSearchTeamItem.bind(null, item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={NoDataText}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchTeams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  pageTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: FontFamily.robotoRegular,
    marginVertical: hp(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(4),
  },
  searchInput: { flex: 1 },
  body: {
    backgroundColor: Colors.playerCategoryBg,
    paddingHorizontal: wp(4),
    marginVertical: hp(2),
    borderRadius: wp(2),
  },
  listContent: {
    rowGap: hp(2.5),
    paddingVertical: hp(1.5),
  },
  searchTeamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(2),
  },
  searchTeamImage: {
    height: hp(7),
    width: wp(28),
    borderRadius: wp(1.5),
  },
  searchTeamBody: {
    flex: 1,
    rowGap: hp(0.7),
  },
  searchTeamName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: FontFamily.robotoBold,
  },
  searchTeamCity: {
    fontSize: 13,
    color: '#777B84',
    fontFamily: FontFamily.robotoRegular,
  },
  nodataText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginBottom: hp(2),
  },
});
