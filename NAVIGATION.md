
# React Native Navigation Structure Explanation

This Markdown document provides an explanation of the React Native navigation structure you have implemented in your code.

## Code Overview

```jsx
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from 'react-native-splash-screen';
import { PlayerStack } from './PlayerStack';
import WelcomeScreen from '../views/common/welcome/WelcomeScreen';
export default function AppLoadingStack() {
    const Stack = createNativeStackNavigator();
    const userToken = null
    // useEffect(() => {
    //     SplashScreen.hide();
    // }, []);
    return <>
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
                padding: 20
            }
        }}>
            {
                userToken
                    ? <Stack.Screen name="PlayerStack" component={PlayerStack} />
                    : <Stack.Screen name='Welcome' component={WelcomeScreen} />
            }
        </Stack.Navigator>
    </>
}
```

## Explanation

- The code defines a React Native functional component called `AppLoadingStack`, which serves as the root component for your navigation structure.

- Inside the component, you import necessary modules and components.

### Stack Navigator

- The `createNativeStackNavigator` function is used to create a stack navigator called `Stack`. Stack navigators are typically used for managing a stack of screens with a back navigation mechanism.

### `userToken` Variable

- A variable `userToken` is declared and initialized to `null`. This variable is used to conditionally render different screens based on whether a user is authenticated or not.

### Navigator Configuration

- Inside the `return` statement, a `Stack.Navigator` component is rendered, which sets some screen options for the navigator:
  - `headerShown: false` hides the header in all screens within this navigator.
  - `cardStyle: { padding: 20 }` applies padding to all screens' content within this navigator.

### Conditional Rendering

- Within the navigator, there's a conditional rendering using the `userToken` variable:
  - If `userToken` is truthy, it renders a screen named "PlayerStack" with the `PlayerStack` component.
  - If `userToken` is falsy (e.g., `null` in this case), it renders a screen named "Welcome" with the `WelcomeScreen` component.

This navigation structure allows you to show different screens based on the user's authentication status.

