/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';
import { Text } from 'react-native-ui-lib';

const CourtChartSVG = props => {
  const redColor = '#FF5E5E';

  const blueColor = '#85ADFF';

  const yellowColor = '#E0BD90';

  const HORIZONTAL_OFFSET = { 1: 6.5, 2: 30, 3: 70, 4: 168 };
  const VERTICAL_OFFSET = {
    1: 16,
    2: 36,
    3: 70,
    4: 97,
    5: 182,
    6: 188,
    7: 224,
  };

  const courtData = props.data;

  return (
    <>
      <Svg
        width={354}
        height={258}
        viewBox="0 0 354 258"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Rect x={32} y={1} width={92} height={50} fill={blueColor} />
        <Rect x={125} width={108} height={134} fill={blueColor} />
        <Path
          d="M0.5 257V102.5H31.5C52.9998 146.797 71.8873 165.074 112.5 191L80.5 257H0.5Z"
          fill={redColor}
          stroke="black"
        />
        <Path
          d="M353 257V103H322.83C301.906 147.153 283.525 165.372 244 191.214L275.143 257H353Z"
          fill={blueColor}
          stroke="black"
        />
        <Path
          d="M125 51H32.5L32 101.5L49.5 134.5L67 156.5L94 179L112.5 190.5L139.5 134H125.5L125 51Z"
          fill={redColor}
          stroke="black"
        />
        <Path
          d="M229.567 52H322.498L323 102.319L305.419 135.201L287.837 157.122L260.712 179.541L242.126 191L215 134.703H229.065L229.567 52Z"
          fill={blueColor}
          stroke="black"
        />
        <Path
          d="M139.394 137L113 190.612L139.394 201.532L161.22 206H180V174.727L162.235 172.245L150.561 164.799L143.455 153.878L139.394 137Z"
          fill={redColor}
        />
        <Path
          d="M216.97 137L241 190.612L216.97 201.532L197.098 206H180V174.727L196.174 172.245L206.803 164.799L213.273 153.878L216.97 137Z"
          fill={redColor}
        />
        <Path
          d="M214 134H140V145.642L144.215 157.79L152.177 167.914L166.228 173.988L183.557 175L196.671 170.951L205.57 162.852L212.595 148.173L214 134Z"
          fill={redColor}
          stroke="black"
        />
        <Path
          d="M112.5 191L81 257H178.5V207L162 206L134.5 200.5L112.5 191Z"
          fill={redColor}
        />
        <Path
          d="M244 191L275.5 257H178V207L194.5 206L222 200.5L244 191Z"
          fill={redColor}
        />
        <G clipPath="url(#clip0_3_2794)">
          <Rect
            y={0.581177}
            width={31.9643}
            height={101.123}
            fill={blueColor}
          />
          <Path
            d="M32.2549 0H0V101.414M32.2549 0V50.707M32.2549 0H125.532M32.2549 101.414H0M32.2549 101.414V50.707M32.2549 101.414C51.5287 143.987 68.3045 163.093 112.421 190.914M0 101.414V257.167H80.7825M32.2549 50.707H125.532M125.532 50.707V0M125.532 50.707V134.25H139.481M125.532 0H139.481M139.481 0H179V29.0584M139.481 0V134.25M139.481 134.25H179M139.481 134.25C139.481 160.112 151.685 174.641 179 174.641M139.481 134.25L112.421 190.914M179 134.25V174.641M179 134.25V29.0584M80.7825 257.167H179V206.606M80.7825 257.167L112.421 190.914M179 174.641V206.606M159.821 29.0584H179M112.421 190.914C137.446 202.537 150.817 206.203 179 206.606"
            stroke="#363A47"
            strokeWidth={4}
          />
          <Path
            d="M177.709 29.9307C176.399 29.9307 175.143 30.4511 174.216 31.3775C173.29 32.304 172.77 33.5605 172.77 34.8706C172.77 36.1808 173.29 37.4373 174.216 38.3637C175.143 39.2901 176.399 39.8105 177.709 39.8105L177.709 34.8706V29.9307Z"
            fill="#363A47"
          />
          <Path
            d="M149.942 29.9298C149.942 33.7458 150.693 37.5245 152.154 41.05C153.614 44.5756 155.754 47.7789 158.453 50.4773C161.151 53.1756 164.354 55.316 167.88 56.7763C171.406 58.2367 175.184 58.9883 179 58.9883V57.0353C175.441 57.0353 171.916 56.3342 168.627 54.9721C165.339 53.6099 162.351 51.6133 159.834 49.0963C157.317 46.5793 155.32 43.5913 153.958 40.3027C152.596 37.0141 151.895 33.4894 151.895 29.9298H149.942Z"
            fill="#363A47"
          />
          <Path
            d="M139.48 133.959C139.48 106.063 158.659 93.2773 179 93.2773"
            stroke="#363A47"
            strokeWidth={4}
            strokeDasharray="16 6"
          />
        </G>
        <Rect x={230} width={96} height={50} fill={blueColor} />
        <G clipPath="url(#clip1_3_2794)">
          <Rect
            width={31.9643}
            height={101.123}
            transform="matrix(-1 0 0 1 354 0.581177)"
            fill={yellowColor}
          />
          <Path
            d="M321.745 0H354V101.414M321.745 0V50.707M321.745 0H228.468M321.745 101.414H354M321.745 101.414V50.707M321.745 101.414C302.471 143.987 285.696 163.093 241.579 190.914M354 101.414V257.167H273.218M321.745 50.707H228.468M228.468 50.707V0M228.468 50.707V134.25H214.519M228.468 0H214.519M214.519 0H175V29.0584M214.519 0V134.25M214.519 134.25H175M214.519 134.25C214.519 160.112 202.315 174.641 175 174.641M214.519 134.25L241.579 190.914M175 134.25V174.641M175 134.25V29.0584M273.218 257.167H175V206.606M273.218 257.167L241.579 190.914M175 174.641V206.606M194.179 29.0584H175M241.579 190.914C216.554 202.537 203.183 206.203 175 206.606"
            stroke="#363A47"
            strokeWidth={4}
          />
          <Path
            d="M176.291 29.9307C177.601 29.9307 178.857 30.4511 179.784 31.3775C180.71 32.304 181.23 33.5605 181.23 34.8706C181.23 36.1808 180.71 37.4373 179.784 38.3637C178.857 39.2901 177.601 39.8105 176.291 39.8105L176.291 34.8706V29.9307Z"
            fill="#363A47"
          />
          <Path
            d="M204.058 29.9298C204.058 33.7458 203.307 37.5245 201.846 41.05C200.386 44.5756 198.246 47.7789 195.547 50.4773C192.849 53.1756 189.646 55.316 186.12 56.7763C182.594 58.2367 178.816 58.9883 175 58.9883V57.0353C178.559 57.0353 182.084 56.3342 185.373 54.9721C188.661 53.6099 191.649 51.6133 194.166 49.0963C196.683 46.5793 198.68 43.5913 200.042 40.3027C201.404 37.0141 202.105 33.4894 202.105 29.9298H204.058Z"
            fill="#363A47"
          />
          <Path
            d="M214.52 133.959C214.52 106.063 195.341 93.2773 175 93.2773"
            stroke="#363A47"
            strokeWidth={4}
            strokeDasharray="16 6"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_3_2794">
            <Rect width={177} height={257} fill="white" />
          </ClipPath>
          <ClipPath id="clip1_3_2794">
            <Rect
              width={177}
              height={257}
              fill="white"
              transform="matrix(-1 0 0 1 354 0)"
            />
          </ClipPath>
        </Defs>
      </Svg>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[1],
          top: VERTICAL_OFFSET[2],
        }}>
        {courtData?.COURT_1}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[2],
          top: VERTICAL_OFFSET[6],
        }}>
        {courtData?.COURT_2}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[3],
          top: VERTICAL_OFFSET[1],
        }}>
        {courtData?.COURT_3}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[4],
          top: VERTICAL_OFFSET[3],
        }}>
        {courtData?.COURT_5}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          right: HORIZONTAL_OFFSET[3],
          top: VERTICAL_OFFSET[1],
        }}>
        {courtData?.COURT_8}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          right: HORIZONTAL_OFFSET[1],
          top: VERTICAL_OFFSET[2],
        }}>
        {courtData?.COURT_10}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          right: HORIZONTAL_OFFSET[2],
          top: VERTICAL_OFFSET[6],
        }}>
        {courtData?.COURT_11}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[4],
          top: VERTICAL_OFFSET[5],
        }}>
        {courtData?.COURT_6}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[4],
          top: VERTICAL_OFFSET[7],
        }}>
        {courtData?.COURT_7}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          right: HORIZONTAL_OFFSET[3],
          top: VERTICAL_OFFSET[4],
        }}>
        {courtData?.COURT_9}
      </Text>
      <Text
        small-400
        style={{
          position: 'absolute',
          left: HORIZONTAL_OFFSET[3],
          top: VERTICAL_OFFSET[4],
        }}>
        {courtData?.COURT_4}
      </Text>
    </>
  );
};

export default CourtChartSVG;
