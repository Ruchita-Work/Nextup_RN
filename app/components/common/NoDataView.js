/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

import { View, Text } from 'react-native-ui-lib';
import { hp } from '../../utils/responsive';

// created by Piyush Prashant at 20231111 15:51.
// piyushprashant93@gmail.com

export function NoDataView({ children, ...rest }) {
  return (
    <View center height={hp(8)} {...rest}>
      <Text
        large-x-700
        style={{
          opacity: 0.5,
        }}>
        {children ?? 'Data not found'}
      </Text>
    </View>
  );
}
