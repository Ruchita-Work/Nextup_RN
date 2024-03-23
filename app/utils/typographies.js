/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
const { Typography } = require('react-native-ui-lib');
const { customTheme } = require('../constants');

Typography.loadTypographies({
  tiny: {
    fontSize: customTheme.fontSizes.size_10,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'tiny-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_8,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'small-400': {
    fontWeight: '400',
    fontSize: customTheme.fontSizes.size_12,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'small-500': {
    fontWeight: '500',
    fontSize: customTheme.fontSizes.size_12,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'small-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_12,
    fontFamily: customTheme.fontFamily.robotoMedium,
    color: customTheme.colors.light,
  },
  'small-700': {
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_12,
    fontFamily: customTheme.fontFamily.robotoBold,
    color: customTheme.colors.light,
  },
  'small-x': {
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'small-x-500': {
    fontWeight: '500',
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoMedium,
    color: customTheme.colors.light,
  },
  'small-x-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  medium: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontSize: customTheme.fontSizes.size_16,
    color: customTheme.colors.light,
  },
  'medium-500': {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontSize: customTheme.fontSizes.size_16,
    fontWeight: '500',
    color: customTheme.colors.light,
  },
  'medium-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_16,
    fontFamily: customTheme.fontFamily.robotoMedium,
    color: customTheme.colors.light,
  },
  'medium-700': {
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_16,
    fontFamily: customTheme.fontFamily.robotoBold,
    color: customTheme.colors.light,
  },
  'medium-x-400': {
    fontWeight: '400',
    fontSize: customTheme.fontSizes.size_17,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'medium-xl-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_18,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'large-x-500': {
    fontWeight: '500',
    fontSize: customTheme.fontSizes.size_20,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'large-x-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_20,
    fontFamily: customTheme.fontFamily.robotoMedium,
    color: customTheme.colors.light,
  },
  'large-x-700': {
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_20,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'large-xl-600': {
    fontWeight: '600',
    fontSize: customTheme.fontSizes.size_22,
    fontFamily: customTheme.fontFamily.robotoMedium,
    color: customTheme.colors.light,
  },
  'large-3xl-400': {
    fontWeight: '400',
    fontSize: customTheme.fontSizes.size_24,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'large-3xl-600': {
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_22,
    fontFamily: customTheme.fontFamily.robotoBold,
    color: customTheme.colors.light,
  },
  'large-3xl-700': {
    fontWeight: '700',
    fontSize: customTheme.fontSizes.size_24,
    fontFamily: customTheme.fontFamily.robotoBold,
    color: customTheme.colors.light,
  },
  'regular-400': {
    fontWeight: '400',
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'regular-500': {
    fontWeight: '500',
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'regular-700': {
    fontWeight: '700',
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'header-400': {
    fontWeight: '400',
    fontSize: customTheme.fontSizes.size_32,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
  },
  'header-bold': {
    fontWeight: 'bold',
    fontSize: customTheme.fontSizes.size_32,
    fontFamily: customTheme.fontFamily.robotoBold,
    lineHeight: 40,
    color: customTheme.colors.light,
  },
  'subheader-light': {
    fontWeight: 'bold',
    fontSize: customTheme.fontSizes.size_14,
    fontFamily: customTheme.fontFamily.robotoRegular,
    color: customTheme.colors.light,
    opacity: 0.6,
  },
  'input-label': {
    opacity: 0.6,
    marginBottom: customTheme.spacings.spacing_16,
    textTransform: 'uppercase',
    fontSize: customTheme.fontSizes.size_12,
    color: customTheme.colors.light,
    fontWeight: '700',
    fontFamily: customTheme.fontFamily.robotoBold,
  },
  'link-text': {
    color: customTheme.colors.blue10,
    fontSize: customTheme.fontSizes.size_12,
    fontFamily: customTheme.fontFamily.robotoBold,
    fontWeight: '700',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  // need this to fix searchinput issue in Picker component in SelectionDropdown File.
  text70: {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontSize: customTheme.fontSizes.size_16,
    fontWeight: '400',
  },
  'text-error': {
    fontFamily: customTheme.fontFamily.robotoRegular,
    fontSize: customTheme.fontSizes.size_12,
    color: customTheme.colors.red10,
  },
});
