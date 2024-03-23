import {View, Text, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../constants';
import SideBySideBarGraph from '../../../components/common/SideBySideBar';
import {FontSize} from '../../GlobalStyles';
const wide = Layout.width;
const high = Layout.height;
export default function OverallStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Overall Stats</Text>
      <View style={styles.graphContainer}>
        <SideBySideBarGraph
          pgsData={[
            {name: 'PST', value: [12.7, 10.7]},
            {name: 'AST', value: [7.7, 8.7]},
            {name: 'RPG', value: [10.9, 11.9]},
            {name: 'BPG', value: [12.7, 10.7]},
            {name: 'STL', value: [7.7, 8.7]},
            {name: 'FG%', value: [10.9, 11.9]},
            {name: '2PT', value: [7.7, 8.7]},
            {name: '3PT', value: [10.9, 11.9]},
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphContainer: {
    marginTop: wide * 0.05,
    marginBottom: wide * 0.06,
  },
  container: {
    marginTop: high * 0.05,
    paddingHorizontal: wide * 0.05,
  },
  textLabel: {
    color: Colors.white_08,
    fontSize: FontSize.size_xl,
    fontWeight: '500',
  },
});
