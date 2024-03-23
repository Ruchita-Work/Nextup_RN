import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform, Image } from "react-native";
import Video from "react-native-video";
import MediaControls, {
    PLAYER_STATES,
} from "react-native-media-controls";
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import MoVideoPlayer from 'react-native-mo-video-player';

const { height, width } = Dimensions.get('window')
const dimension = Dimensions.get("window");
const noop = () => { };

let wide = Layout.width;

const VideoPlay = ({ source, sty, thumbnailUrl, onBackPress }) => {
    return (
        <View>

            <TouchableOpacity
                onPress={onBackPress}

                style={{
                    // flexDirection: 'row',
                    // marginTop: Platform.OS == 'ios' ? wide * 0.07 : wide * 0.02,
                    // top: Platform.OS == 'ios' ? isNotch ? 50 : 8 : 10,
                    top: 0,
                    zIndex: 1, position: 'absolute',

                    width: wide * 0.12, height: wide * 0.1,
                    marginLeft: 10,
                    alignItems: 'center', justifyContent: 'center'
                }}
            >
                <Image style={{
                    width: wide * 0.09, height: wide * 0.09,
                    borderRadius: wide * 0.03, borderWidth: 1,
                    borderColor: Colors.borderColor,
                    backgroundColor: customTheme.colors.base,

                }}
                    source={require('../../Images/back_ico.png')}
                />
            </TouchableOpacity>
            <MoVideoPlayer
                style={{ width: dimension.width, height: 300, }}
                source={source}
                poster={thumbnailUrl}
                // title='React Native MO-VIDEO-PLAYER'
                autoPlay={true}
                // playInBackground={false}
                // playList={[
                //   {
                //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
                //     poster: 'https://www.carage.net/media/halfhd/carage_fahrzeuge_square_8.jpg',
                //     title: 'Video 1'
                //   },
                //   {
                //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
                //     poster: 'https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/story/hero_image/1908-Ford-Model-T_0.jpg',
                //     title: 'Video 2'
                //   },
                //   {
                //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                //     poster: 'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/surfing-dog-photo-is-funner-or-funnest-a-real-word-5670-6d512231d0a52079b0c9fbf474f9a6c9@1x.jpg',
                //     title: 'Video 3'
                //   },
                //   {
                //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                //     poster: 'https://wikiimg.tojsiabtv.com/wikipedia/en/6/6f/War_official_poster.jpg',
                //     title: 'Video 4'
                //   },
                //   {
                //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                //     poster: 'https://www.alsharqtoday.com/wp-content/uploads/2020/09/%D8%A7%D9%84%D8%AC%D9%84%D9%8A%D8%AF.jpg',
                //     title: 'Video 5'
                //   },
                //   {
                //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                //     poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
                //     title: 'Video 6'
                //   },
                // ]}
                // showHeader={true}
                // showSeeking10SecondsButton={true}
                // showCoverButton={true}
                showFullScreenButton={true}
                // showSettingButton={true}
                showMuteButton={true}
            />
            {/* </View> */}

        </View>
    );
};



export default VideoPlay;