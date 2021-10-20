/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

export default class final extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vcard: this.props.navigation.state.params.vcard,
      name: this.props.navigation.state.params.displayName,
      mobile: this.props.navigation.state.params.mobile,
    };
    console.log(this.state.name);
  }
  callback(dataURL) {
    //console.warn(dataURL);
    let shareImageBase64 = {
      title: 'React Native',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    Share.open(shareImageBase64).catch(error => console.log(error));
  }
  getDataURL() {
    this.svg.toDataURL(this.callback);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#484848',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{color: 'white', margin: 25, fontSize: 20, marginBottom: 5}}>
          {this.state.name}
        </Text>
        <Text
          style={{
            color: 'white',
            margin: 5,
            fontSize: 15,
            marginBottom: 15,
            marginTop: 0,
          }}>
          {this.state.mobile}
        </Text>
        <QRCode
          value={this.state.vcard}
          getRef={c => (this.svg = c)}
          size={250}
          logoBorderRadius={5}
        />
        <TouchableOpacity
          style={{
            margin: 60,
            backgroundColor: '#212121',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 20,
            marginTop: 20,
            height: 50,
            marginBottom: 5,
            width: 200,
          }}
          onPress={() => {
            this.getDataURL();
          }}>
          <Text style={{color: '#b9b9b9', fontSize: 20}}>Share QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 60,
            backgroundColor: '#212121',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 20,
            marginTop: 10,
            height: 50,
            marginBottom: 5,
            width: 200,
          }}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Text style={{color: '#b9b9b9', fontSize: 20}}>Edit Form</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
