import {View, Text, Platform, StyleSheet, ImageBackground} from 'react-native';
import _ from 'lodash';
import {SectionHeader} from '../../common/SectionHeader';
import {Colors, Avatar, Image} from 'react-native-ui-lib';
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../../views/GlobalStyles';
import {GroupAvatar} from '../../common/GroupAvatar';
const avatarUrls = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  // Add more avatar URLs as needed
];
const playerScores = [
  {
    label: 'PTS',
    id: '12',
    value: '35',
  },
  {
    label: 'REB',
    id: '12',
    value: '35',
  },
  {
    label: 'ATS',
    id: '12',
    value: '35',
  },
];;
const ActiveChallenges = () => {
  return (
    <View style={[styles.shadowView]}>
      <View style={[styles.cardHeader]} />

      <View style={[styles.cardBody]}>
        <Avatar
          backgroundColor={Colors.blue20}
          containerStyle={styles.cardIcon}
          size={60}
        />
        <View style={[styles.cardActiveStatus]}>
          <Text
            style={{
              fontFamily: FontFamily.robotoBold,
              fontWeight: 600,
              color: Colors.white,
              fontSize: FontSize.bodyMediumSemibold_size,
            }}>
            {' '}
            Active
          </Text>
        </View>
        <View style={[styles.cardContentWrapper]}>
          <Text style={[styles.textWhite, styles.bodyContentHeader]}>
            {' '}
            Dribble Challenge
          </Text>
          <Text style={[styles.textGold, styles.bodyContentTitle]}>
            {' '}
            08 days left
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
          }}>
          <GroupAvatar avatarUrls={avatarUrls} />
        </View>
      </View>
    </View>
  );
};;

const CompletedChallenges = () => {
  return (
    <View style={[styles.shadowView]}>
      <ImageBackground
        source={{uri: 'https://wallpaper.dog/large/10913047.jpg'}}
        style={[{height: 200, borderRadius: 16}]}>
        <View style={[styles.overlay]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 24,
            }}>
            <View style={[styles.cardContentWrapper]}>
              <Text style={[styles.textWhite, styles.bodyContentHeader]}>
                {' '}
                Dribble Challenge
              </Text>
              <Text style={[styles.textGold, styles.bodyContentTitle]}>
                {' '}
                08 days left
              </Text>
            </View>
            <View style={[styles.cardCompletedStatus]}>
              <Text
                style={{
                  fontFamily: FontFamily.robotoBold,
                  fontWeight: 600,
                  color: Colors.white,
                  fontSize: FontSize.size_mini,
                }}>
                {' '}
                Completed
              </Text>
            </View>
          </View>
          <View style={[styles.cardFooter]}>
            <Image
              useBackgroundContainer
              source={{
                uri: 'https://github.com/wix/react-native-ui-lib/blob/master/demo/src/assets/images/card-example.jpg',
              }}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
              }}>
              {_.map(playerScores, (item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems: 'center',
                      width: 40,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: FontSize.size_3xl,
                          color: Colors.white,
                          textAlign: 'center',
                        }}
                        t>
                        {item.label}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: FontSize.size_xl,
                          color: Colors.white,
                        }}>
                        {item.value}
                      </Text>
                    </View>
                    {index !== playerScores.length - 1 && (
                      <View
                        style={{
                          height: 36,
                          width: 2,
                          backgroundColor: Colors.white,
                          marginLeft: 24,
                        }}
                      />
                    )}
                  </View>
                );
              })}
              <View></View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};;

export const MyChallenges = () => {
  return (
    <>
      <SectionHeader title={'My Challenges'} />
      {/* Challenges Card List */}
      <ActiveChallenges />
      <CompletedChallenges />
      {/* End */}
    </>
  );
};;

const styles = StyleSheet.create({
  cardHeader: {
    backgroundColor: Colors.yellow30,
    height: 50,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  cardBody: {
    paddingHorizontal: Padding.p_8xs,
    backgroundColor: Colors.$backgroundDark,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  cardIcon: {
    position: 'absolute',
    top: -28,
    left: 20,
    backgroundColor: Colors.blue10,
  },
  cardActiveStatus: {
    marginTop: 16,
    alignSelf: 'flex-end',
    backgroundColor: Colors.blue30,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: 8,
  },
  cardCompletedStatus: {
    backgroundColor: Color.limegreen,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: 8,
  },
  cardContentWrapper: {
    marginTop: 16,
  },
  cardFooter: {
    marginTop: 'auto',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWhite: {
    color: Colors.white,
  },
  textGold: {
    color: Color.goldenrod_100,
  },
  bodyContentHeader: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 20,
    fontWeight: '700',
  },
  bodyContentTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: Padding.p_8xs,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 for 50% opacity) for the blur effect
  },
  shadowView: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 16,
    // Shadow styles for Android
    ...Platform.select({
      android: {
        elevation: 5,
      },
      // Shadow styles for iOS
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
    }),
  },
})
