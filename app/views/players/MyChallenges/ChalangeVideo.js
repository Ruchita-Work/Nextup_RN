import { ScreenHeader } from '../../../components/common/ScreenHeader';
import { ImageBackground, ScrollView } from 'react-native';
import { Layout, customTheme } from '../../../constants';
import { View, Image, Card, Text, Button } from 'react-native-ui-lib';
import { appImages } from '../../../constants/appImages';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faFlag,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { hp } from '../../../utils/responsive';
import PrimaryButton from '../../../components/common/PrimaryButton';
export default function ChallengeVideo({ route }) {
  const data = route?.params?.data;
  const navigation = useNavigation();
  const videoRecorder = useRef();
  const start = () => {
    navigation.navigate('StartRecording', { data: data });
    // if (videoRecorder && videoRecorder.current) {
    //     videoRecorder.current.open({ maxLength: 30 }, (data) => {
    //         console.log('captured data', data);
    //     })
    // }
  };
  return (
    <>
      <ScrollView>
        <Image
          source={appImages.playerPlaying}
          resizeMode="cover"
          style={{
            width: Layout.width,
            height: 300, // Set a fixed height for the image or adjust it as needed.
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: hp(2.7),
            left: hp(2.5),
          }}>
          <ScreenHeader />
        </View>

        <View center>
          <View
            padding-16
            style={{
              backgroundColor: customTheme.colors.primary,
              width: Layout.width * 0.9,
              minHeight: Layout.width * 0.4,
              borderRadius: Layout.width * 0.04,
              marginTop: -Layout.width * 0.2,

              justifyContent: 'center',
            }}>
            <Text large-xl-600>Dribble Challenge</Text>
            <Text subheader-light marginV-8>
              Navigate varying obstacles, sharpen control, and elevate your
              court command. Ready to elevate your game?
            </Text>
            <View
              row
              padding-8
              style={{
                backgroundColor: '#2C2E33',
                width: Layout.width * 0.2,
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <FontAwesomeIcon icon={faRepeat} color="white" />
              <Text centerH white marginR-8>
                {' '}
                3 Sets
              </Text>
            </View>
          </View>

          <View
            padding-12
            style={{
              backgroundColor: customTheme.colors.primary,
              width: Layout.width * 0.9,
              minHeight: Layout.width * 0.4,
              borderRadius: Layout.width * 0.04,
              marginTop: Layout.width * 0.1,
              justifyContent: 'center',
            }}>
            <Text subheader-light>Instruction</Text>
            <View marginT-24 row spread>
              <View
                marginR-8
                style={{
                  backgroundColor: '#2C2E33',
                  width: Layout.width * 0.09,
                  height: Layout.width * 0.09,
                  borderRadius: Layout.width * 0.04,
                  padding: Layout.width * 0.02,
                }}>
                <FontAwesomeIcon icon={faFlag} color="blue" />
              </View>
              <Text
                medium
                white
                marginL-8
                style={{
                  width: Layout.width * 0.7,
                }}>
                Maintain a controlled and rhythmic dribble as you navigate the
                obstacles. Focus on keeping the ball close to your hand to
                minimize turnovers.
              </Text>
            </View>
            <View marginT-24 row spread>
              <View
                marginR-8
                style={{
                  backgroundColor: '#2C2E33',
                  width: Layout.width * 0.09,
                  height: Layout.width * 0.09,
                  borderRadius: Layout.width * 0.04,
                  padding: Layout.width * 0.02,
                }}>
                <FontAwesomeIcon icon={faArrowAltCircleUp} color="blue" />
              </View>
              <Text
                medium
                white
                marginL-8
                style={{
                  width: Layout.width * 0.7,
                }}>
                Keep your head up and eyes forward while dribbling. This helps
                you anticipate upcoming obstacles and make quick decisions on
                the court.
              </Text>
            </View>
            <View marginT-24 row spread>
              <View
                marginR-8
                style={{
                  backgroundColor: '#2C2E33',
                  width: Layout.width * 0.09,
                  height: Layout.width * 0.09,
                  borderRadius: Layout.width * 0.04,
                  padding: Layout.width * 0.02,
                }}>
                <FontAwesomeIcon icon={faArrowAltCircleDown} color="blue" />
              </View>
              <Text
                medium
                white
                marginL-8
                style={{
                  width: Layout.width * 0.7,
                }}>
                Practice dribbling at different speeds, from slow to fast. This
                will improve your ability to change direction quickly and
                maintain control under various game scenarios.
              </Text>
            </View>
          </View>
        </View>
        <View paddingH-16 paddingV-16>
          <PrimaryButton onPress={start} title={`Lets Get It`} />
        </View>

        {/* <VideoRecorder ref={videoRecorder} compressQuality={'medium'} /> */}
      </ScrollView>
    </>
  );
}
