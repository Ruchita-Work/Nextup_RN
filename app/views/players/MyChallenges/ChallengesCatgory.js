import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllChallenges from './AllChalenges';
import { CustomTabView } from '../../../components/common/CustomTabView';
import { ViewContainer } from '../../../components/common/ViewConatiner';
import { View } from 'react-native-ui-lib';
import ReadyToProp from './ReadyToPro';
const TopTab = createMaterialTopTabNavigator();



export default function ChallengesCatgory() {
    return <View useSafeArea flex marginT-16>
        <TopTab.Navigator tabBar={props => <CustomTabView {...props} />}>
            <TopTab.Screen options={{
                tabBarLabel: 'Ready To Pro',
            }} name="ReadyToPro" component={ReadyToProp} />
            <TopTab.Screen options={{
                tabBarLabel: 'Challenges',
            }} name="Challenges" component={AllChallenges} />


        </TopTab.Navigator>
    </View>
}