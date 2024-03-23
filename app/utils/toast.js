import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import { getDesiredNumber } from "./helper";
import { customTheme } from "../constants";
/*
  1. Create the config
*/
export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: customTheme.colors.blue20,
                backgroundColor: customTheme.colors.background
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: getDesiredNumber(12),
                fontWeight: '400',
                color: customTheme.colors.success
            }}
            text2Style={{
                fontSize: getDesiredNumber(12),
                color: customTheme.colors.light

            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            style={
                {
                    borderLeftColor: customTheme.colors.red10,
                    backgroundColor: customTheme.colors.background
                }
            }
            text1Style={{
                fontSize: getDesiredNumber(12),
                fontWeight: '400',
                color: customTheme.colors.red10
            }}
            text2Style={{
                fontSize: 15,
                color: customTheme.colors.light
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};
export const successToast = ({
    title = ' Toast title',
    body = 'Toast body'
}) => {
    Toast.show({
        type: 'success',
        text1: title,
        text2: body
    })
}
export const errorToast = ({
    title = ' Toast title',
    body = 'Toast body'
}) => {
    Toast.show({
        type: 'error',
        text1: title,
        text2: body
    })
}