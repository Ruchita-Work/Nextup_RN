import { ImageBackground } from 'react-native';
import { Button, View, Text } from 'react-native-ui-lib';
import { appImages } from '../../../constants/appImages';
import { Layout } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faRepeat } from '@fortawesome/free-solid-svg-icons';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import { hp } from '../../../utils/responsive';
import { RecordingConfirmationDialog } from '../../../components/common/confirmationDialog';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RecorderScreen({ navigation, route }) {
  const data = route?.params?.data;
  const videoRecorder = useRef(null);
  const [dialog, showDialog] = React.useState(true);
  const [video, setVideo] = useState();
  function startRecorder() {
    if (videoRecorder && videoRecorder.current) {
      videoRecorder.current.open({ maxLength: 30 }, data => {
        // console.log('captured data', data);

        setVideo(data);
      });
    }
  }

  function onConfirm() {
    showDialog(false);
    startRecorder();
  }

  return (
    <>
      <ImageBackground
        source={appImages.recoderPlaceholder}
        style={{ flex: 1 }}
        imageStyle={{
          width: Layout.width,
          height: Layout.height,
        }}>
        <View
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#FFFFFF1A',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              marginBottom: 15,
            }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
              {data?.name}
            </Text>
          </View>

          <Text style={{ color: 'white', fontSize: 48, fontWeight: '600' }}>
            00:00:05
          </Text>
        </View>

        <LinearGradient
          style={{
            width: Layout.width,
            height: hp(8),
            justifyContent: 'center',
          }}
          colors={[
            'rgba(35, 38, 47, 1)',
            'rgba(35, 38, 47, 0.76)',
            'rgba(35, 38, 47, 0)',
          ]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.5, y: 1.0 }}>
          <View
            row
            spread
            style={{ alignItems: 'center' }}
            paddingH-16
            paddingV-8>
            <TouchableOpacity onPress={startRecorder}>
              <FontAwesomeIcon icon={faRepeat} color="white" />
            </TouchableOpacity>
            <Button
              onPress={() =>
                navigation.navigate('VideoChallengeSubmit', { data: video })
              }
              style={{
                width: Layout.width * 0.6,
              }}
              label={`Finish`}
              size={Button.sizes.large}
            />
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate('Challenges');
              }}>
              <FontAwesomeIcon icon={faClose} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <VideoRecorder ref={videoRecorder} compressQuality={'medium'} />
      <RecordingConfirmationDialog open={dialog} onConfirm={onConfirm} />
    </>
  );
}
