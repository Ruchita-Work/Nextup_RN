import { faArrowTurnRight, faChevronCircleRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { customTheme } from "../../../constants";

export function CardSectionTitle({ title, onPress, ...props }) {
    return <View marginB-12 marginT-28 row spread>
        {
            title && <Text large-xl-600 >{title ?? ''}</Text>
        }
        {
            onPress && <TouchableOpacity row centerV onPress={onPress}>

                <Text small-x-600 color={customTheme.colors.blue20}>See All
                </Text>
                <FontAwesomeIcon size={customTheme.fontSizes.size_14} style={{
                    color: customTheme.colors.blue20,
                }} icon={faChevronRight} />
            </TouchableOpacity>
        }

    </View>
}