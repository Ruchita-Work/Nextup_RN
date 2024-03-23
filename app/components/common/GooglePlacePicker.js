import React, { Component, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Layout, Colors, Fonts } from '../../constants';
import { MapKey, Country, Lang } from '../../constants/constant';

let wide = Layout.width;
let high = Layout.height;

export class GooglePlacePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // selectedLatLong: null,
      isTxtValue: false,
    };
  }

  renderCloseBtn = () => {
    const { isTxtValue } = this.state;
    return (
      <Pressable
        style={{
          width: wide * 0.095,
          height: wide * 0.09,
          position: 'absolute',
          backgroundColor: '#f8f8f8',
          right: wide * 0.015,
          top: wide * 0.035,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() =>
          this.setState(
            {
              isTxtValue: false,
              // selectedLatLong: null,
            },
            () => this._txtInput.clear()
          )
        }
      >
        {isTxtValue == true ? (
          <Text style={{ fontSize: 16, fontWeight: '700' }}>X</Text>
        ) : (
          <></>
        )}
      </Pressable>
    );
  };

  handlleSelectedAddress = (data) => {
    this.props.onAddressSelected(data);
    //// console.log("Selected Locccc", data)
    // this.setState({
    //   selectedLatLong: {
    //     latitude: data.geometry.location.lat,
    //     longitude: data.geometry.location.lng,
    //   },
    // })
  };

  handleTextChange = (val) => {
    if (val != '') {
      this.setState({ isTxtValue: true });
    } else {
      this.setState({
        isTxtValue: false,
        // selectedLatLong: null,
      });
    }
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}
      >
        <SafeAreaView style={{ backgroundColor: customTheme.colors.base }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}
          >
            <Text style={{ color: Colors.white_08, fontSize: 20 }}>
              Choose Address
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 20,
                top: 10,
              }}
              onPress={() => this.props.onClose()}
            >
              <View>
                <Text
                  style={{
                    color: Colors.white_08,
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                >
                  X
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wide,
              height: high,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '90%',
                height: wide,
                position: 'absolute',
                top: 10,
                alignSelf: 'center',
              }}
            >
              <GooglePlacesAutocomplete
                ref={(ref) => (this._txtInput = ref)}
                placeholder="Start typing an address"
                onPress={(data, details) =>
                  this.handlleSelectedAddress(details)
                }
                fetchDetails={true}
                query={{
                  key: 'AIzaSyANXCb9C_4TvGhm65kWbZmQZRYuUklJhtU',
                  language: Lang,
                  components: Country,
                }}
                styles={{
                  textInputContainer: {
                    // backgroundColor: Colors.lightGray,
                  },
                  textInput: {
                    height: 45,
                    color: '#5d5d5d',
                    fontSize: 16,
                    backgroundColor: '#f8f8f8',
                    paddingHorizontal: 10,
                    top: 10,
                    borderRadius: 10,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                renderRightButton={() => this.renderCloseBtn()}
                textInputProps={{
                  onChangeText: (txt) => {
                    this.handleTextChange(txt);
                  },
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
