/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { MyColors } from './colors';
import { Layout } from './dimensions';
import { Fonts } from './fonts';
import * as Base from './constant';
import CommonStyles from './styles';
import { customTheme } from './theme';

import SafeContainer from '../components/common/safeContainer';
const Colors = { ...MyColors };
export {
  Layout,
  Colors,
  Fonts,
  Base,
  CommonStyles,
  SafeContainer,
  customTheme,
};
