import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { customTheme } from '../../../constants';

const EventItemSubtractSVG = ({ height, width }) => {
  const finalWidth = width || '180';
  const finalHeight = height || '52';

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox={`0 0 ${finalWidth} ${finalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G filter="url(#filter0_d_3_1241)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d={`M0 8C0 3.58172 3.58172 0 8 0H172C176.418 0 ${finalWidth} 3.58172 ${finalWidth} 8V46C180 48.2091 178.209 50 176 50H169C166.791 50 165.028 48.1994 164.737 46.0095C162.786 31.3275 150.216 20 135 20C119.784 20 107.214 31.3275 105.263 46.0095C104.972 48.1994 103.209 50 101 50H79C76.7909 50 75.028 48.1994 74.7369 46.0095C72.7855 31.3275 60.2156 20 45 20C29.7844 20 17.2145 31.3275 15.2631 46.0095C14.972 48.1994 13.2091 50 11 50H4C1.79086 50 0 48.2091 0 46V8Z`}
          fill={customTheme.colors.steel_blue}
        />
      </G>
    </Svg>
  );
};

export default EventItemSubtractSVG;
