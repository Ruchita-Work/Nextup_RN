import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Layout, customTheme } from '../../../../constants';
import MatchUpBoard from './MatchUpBoard';
import { useNavigation } from '@react-navigation/native';
import { SectionHeader } from '../../../common/SectionHeader';
import { hp } from '../../../../utils/responsive';
import { StyleSheet } from 'react-native';

const wide = Layout.width;

function MatchUp({ data = [] }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SectionHeader title={'Player Matchup'} onPressSeeAll={() => {}} />
      {!!(!data || data?.length === 0) && (
        <Text style={styles.noDataText}>No data available</Text>
      )}
      {!!data && (
        <View>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: wide * 0.02, overflow: 'visible' }}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <MatchUpBoard
                key={index}
                onPress={() => {
                  navigation.navigate('PlayerCompare', {
                    homePlayer: item.homePlayer,
                    secondPlayer: item.secondPlayer,
                    isSingle: false,
                  });
                }}
                item={item}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
export default MatchUp;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
    width: '92%',
    alignSelf: 'center',
  },
  noDataText: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontWeight: '600',
    color: customTheme.colors.light,
    fontSize: customTheme.fontSizes.size_20,
    textAlign: 'center',
    marginVertical: hp(2),
  },
});
