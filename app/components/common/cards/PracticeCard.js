
import { Image, View, Text } from "react-native-ui-lib"
import { customTheme, Layout } from "../../../constants"
import { appImages } from "../../../constants/appImages"

export const PracticeCard = ({
    children,
    onPress = () => null,
    title,
    subTitle,
    ...props
}) => {
    const imgSrc = props?.src ? ({
        uri: props?.src
    }) : appImages.practiceCardImage
    return <View backgroundColor={customTheme.colors.primary} padding-12
        style={{
            borderRadius: customTheme.spacings.spacing_16
        }}
    >
        <Image
            width={'200'}
            style={{
                borderRadius: customTheme.spacings.spacing_24
            }}
            height={Layout.height * 0.2}
            source={imgSrc}
        />
        <View marginT-16>
            <Text medium-700>{title ?? ''}</Text>
            <Text medium-700 marginT-8>{subTitle ?? ''}</Text>
        </View>


    </View>
}
