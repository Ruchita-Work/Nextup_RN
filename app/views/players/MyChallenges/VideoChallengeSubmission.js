import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from 'react-native-ui-lib';

const VideoChallengeSubmit = ({ navigation, route }) => {
  const data = route?.params?.data;
  const { user } = useAuth();
  return (
    <ScrollView>
      <View>
        <Image
          style={{ height: 300, width: '105%', position: 'absolute' }}
          source={require('../../../assets/new/backImgVideo.png')}
        />

        <View
          style={{
            height: 60,
            width: '95%',

            flexDirection: 'row',
            alignSelf: 'center',
            gap: 20,
            alignItems: 'center',
            marginTop: 40,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/new/back.png')}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500' }}>
            Challenges submission
          </Text>
        </View>

        <View style={{ paddingHorizontal: 30 }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 32,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Dribble Challenge
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Lorem Ipsum is simply dummy text of the ahhgdiijajah printing and
            typesetting industry. Lorem Ipsumaj isahh.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              marginTop: 40,
            }}>
            <Avatar
              containerStyle={styles.avatar}
              source={{ uri: user.personalInfo.profilePictureURL }}
              size={61}
            />
            <View>
              <Text
                style={{ color: '#B7B7B7', fontSize: 12, fontWeight: '500' }}>
                {user.typeOfUser}
              </Text>
              <Text
                style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>
                {user.personalInfo.firstName + ' ' + user.personalInfo.lastName}
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: '#B7B7B7',
              fontSize: 17,
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Total Point
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 37,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            2250
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              borderWidth: 1,
              borderColor: '#B7B7B7',
              borderRadius: 10,
              borderStyle: 'dashed',
              padding: 20,
            }}>
            <Image
              style={{ height: 34, width: 34 }}
              source={require('../../../assets/new/uploadIcon.png')}
            />
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }}>
              Select a video
            </Text>
            <Text style={{ color: '#B7B7B7', fontSize: 12, fontWeight: '400' }}>
              MP4 file size no more than 10MB
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#545556',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <Text
                style={{ color: '#B7B7B7', fontSize: 10, fontWeight: '500' }}>
                SELECT FILE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Image
              style={{ height: 193, width: 248 }}
              source={require('../../../assets/new/videoPic.png')}
            />
            {/* <Video source={{uri: data.uri}}/> */}
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: '#EE1F1F',
                borderRadius: 35,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: -10,
                top: -10,
              }}>
              <View
                style={{
                  width: 12,
                  height: 2,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 35,
                }}></View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Challenges');
          }}
          style={{
            height: 55,
            width: '90%',
            backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 30,
            backgroundColor: 'rgba(36, 107, 253, 1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default VideoChallengeSubmit;
const styles = StyleSheet.create({
  avatar: {
    width: 51,
    height: 51,
  },
});
