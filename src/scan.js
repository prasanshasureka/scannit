/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Contacts from 'react-native-contacts';

const screenHeight = Dimensions.get('window').height;
export default class Scan extends Component {
  newPerson = {
    displayName: ' ',
    company: ' ',
    emailAddresses: [
      {
        label: 'work',
        email: ' ',
      },
    ],
    title: ' ',
    urlAddresses: [
      {
        label: 'home',
        url: ' ',
      },
    ],
    phoneNumbers: [
      {
        label: 'mobile',
        number: ' ',
      },
      {
        label: 'work',
        number: ' ',
      },
    ],
    /* postalAddresses: [
      {
        street: '123 Street',
        city: 'City',
        state: 'CAS',
        region: 'CAS',
        postCode: '700011',
        country: 'US',
        label: 'work',
      },
    ],
    birthday: {year: 1998, month: 1, day: 1}, */
  };
  onSuccess = e => {
    if (e.data.startsWith('BEGIN')) {
      const field = e.data.split('\n');
      //console.log(field);
      var vcard = {};
      var i;
      const len = field.length;

      for (i = 0; i < len; i++) {
        var temp = field[i].split(':');
        vcard[temp[0]] = temp[1];
      }
      if (vcard.ORG) {
        this.newPerson.company = vcard.ORG;
      }
      if (vcard.FN) {
        this.newPerson.displayName = vcard.FN;
      }
      if (vcard.TITLE) {
        this.newPerson.title = vcard.TITLE;
      }
      if (vcard['EMAIL;TYPE=internet,home']) {
        this.newPerson.emailAddresses[0].email =
          vcard['EMAIL;TYPE=internet,home'];
      }
      if (vcard['TEL;TYPE=home']) {
        this.newPerson.phoneNumbers[0].number = vcard['TEL;TYPE=home'];
      }
      if (vcard['TEL;TYPE=work']) {
        this.newPerson.phoneNumbers[1].number = vcard['TEL;TYPE=work'];
      }
      if (vcard['URL;TYPE=home']) {
        this.newPerson.urlAddresses[0].url = vcard['URL;TYPE=home'];
      }
      Contacts.openContactForm(this.newPerson, (err, contact) => {
        if (err) {
          ToastAndroid.show(err, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        // contact has been saved
      });
      //this.newPerson.postalAddresses[0].street = vcard['ADR;TYPE=work'];
      //console.log(this.newPerson);
    } else {
      ToastAndroid.show(
        'QR Code not a VCard',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#484848'}}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <QRCodeScanner
          onRead={this.onSuccess}
          reactivate={true}
          //showMarker={true}
          //markerStyle={{borderColor: 'black'}}
          cameraStyle={{height: screenHeight}}
        />
      </View>
    );
  }
}

console.disableYellowBox = true;
