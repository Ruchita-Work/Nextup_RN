import { Colors, ThemeManager } from 'react-native-ui-lib';
import { customTheme } from './theme';

ThemeManager.setComponentTheme('Button', (props, context) => {
  return {
    backgroundColor: props.outline
      ? customTheme.colors.background
      : customTheme.colors.blue10,
    color: props.outline ? customTheme.colors.light : customTheme.colors.light,
    labelStyle: {
      fontSize: customTheme.spacings.spacing_16,
      fontWeight: 'bold',
      fontFamily: customTheme.fontFamily.robotoRegular,
    },
  };
});

// ThemeManager.setComponentForcedTheme('Text', (props, context) => {
//   return {
//     color: customTheme.colors.light,
//   };
// });

// ThemeManager.setComponentForcedTheme('Icon', (props, context) => {
//   return { tintColor: customTheme.colors.light };
// });

// need this to fix searchinput background color issue in Picker component in SelectionDropdown File.
Colors.loadColors({ $backgroundDefault: customTheme.colors.background });
