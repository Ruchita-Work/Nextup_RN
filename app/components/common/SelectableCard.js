import { Dimensions, ImageBackground, Pressable, Text } from "react-native"
import { Checkbox, TouchableOpacity, View } from "react-native-ui-lib"
import { customTheme } from "../../constants"

export const SelectableCard = ({
    title,
    onPress,
    isSelected = false,
    conatinerStyle,
    imgSrc
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flex: 1 / 2,
            height: 200
        }}>
            <ImageBackground
                resizeMode="cover"
                source={imgSrc ?? null}
                style={{
                    // flex: 1, // Make the ImageBackground take half of the screen width
                    height: 200,
                    borderWidth: 2,
                    borderColor: customTheme.colors.light,
                    borderRadius: 16,
                    padding: customTheme.spacings.spacing_12,
                    overflow: 'hidden',
                    opacity: isSelected ? 1 : 0.4,
                    ...conatinerStyle,
                }}
            >
                <View

                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // Custom style for the card container
                    }}
                >
                    <Text style={
                        {
                            color: customTheme.colors.light,
                            fontSize: customTheme.fontSizes.size_16,
                            fontFamily: customTheme.fontFamily.robotoBold,
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            opacity: isSelected ? 1 : 0.8
                        }
                    }>{title}</Text>
                    {
                        isSelected &&
                        <Checkbox
                            style={{
                                elevation: 1,
                                shadowColor: customTheme.colors.tertiary,

                                shadowRadius: 2,
                                shadowOpacity: 0.9

                            }}

                            iconColor={customTheme.colors.background} color={customTheme.colors.light} borderRadius={customTheme.spacings.spacing_16} value={isSelected} />
                    }

                </View>
            </ImageBackground>
        </TouchableOpacity>

    )
}