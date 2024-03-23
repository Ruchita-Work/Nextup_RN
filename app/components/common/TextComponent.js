import React from 'react'
import { Text } from 'react-native'


export default function TextComponent({
    ellipsizeMode = 'tail',
    allowFontScaling = false,
    numberOfLines,
    textStyle,
    children,
    adjustsFontSizeToFit = false
}) {
    return (
        <Text
            allowFontScaling={allowFontScaling}
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            style={textStyle}
        >
            {children}
        </Text>
    )
}
