/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

/**
 *  @author Piyush Prashant 
 *  @email piyushprashnt93@gmail.com
 * @@description This hook can be used to get the tab view options for the custom tab view.Options like name , isActive and navigation event
 */

import PropTypes from 'prop-types';

/**
 * Generates a tab view based on the provided state, descriptors, navigation, and position.
 *
 * @param {Object} options - The options object containing the state, descriptors, navigation, and position.
 * @param {Object} options.state - The state object containing the routes.
 * @param {Array} options.descriptors - The descriptors array containing options for each route.
 * @param {Object} options.navigation - The navigation object.
 * @param {Object} options.position - The position object.
 * @return {Array} An array of tab view objects.
 */
export function useTabView({ state, descriptors, navigation, position }) {
    return state?.routes?.map((route, index) => {
        const { options, params } = descriptors[route.key];
        const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : route.name;
        const isFocused = state.index === index;
        /**
         * Executes the onPress event handler.
         *
         * @return {void} No return value.
         */
        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, {
                    ...options
                });
            }
        };
        /**
         * Executes when a long press event occurs.
         *
         * @param {void} 
         * @return {void}
         */
        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };
        const inputRange = state.routes.map((_, i) => i);
        const opacity = inputRange.length > 1 ? position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        }) : 1;

        return {
            label,
            options,
            isFocused,
            opacity,
            inputRange,
            onPress,
            onLongPress,
        }
    })
}

useTabView.prototypes = {
    state: PropTypes.object.isRequired,
    descriptors: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired
}