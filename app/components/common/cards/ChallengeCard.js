import { ImageBackground, StyleSheet } from "react-native"
import { View, Text, Image } from "react-native-ui-lib"
import LinearGradient from "react-native-linear-gradient"
import { appImages } from "../../../constants/appImages"
import { Layout, customTheme } from "../../../constants"
export function ChallengeCard({ children, onPress = () => null, title, subTitle, ...props }) {
    return (
        <View marginV-16 {...props} >
            <ImageBackground source={appImages.practiceCardImage} blurRadius={2} borderRadius={customTheme.spacings.spacing_20}>
                <LinearGradient
                    colors={[customTheme.colors.primary, customTheme.colors.primary, 'transparent']}
                    start={{ x: 0, y: 0.5 }} // Start from the left side
                    end={{ x: 1, y: 0.5 }}   // End at the right side
                    style={{ flex: 1, borderRadius: customTheme.spacings.spacing_20 }}
                >
                    {/* Your content here */}
                    <View flex paddingH-16 paddingV-32>
                        <Text medium-700 >Gradient View</Text>
                        <Text small-x-600 style={{ opacity: 0.8 }} >3 days left</Text>
                        <Text medium-700 marginT-17>Submit Video </Text>
                    </View>

                </LinearGradient>
            </ImageBackground >
        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        flex: 1,
        height: 200,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // You can adjust the background color and opacity here
    },
    overlayText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
});