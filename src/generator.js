/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

//import RNFS from 'react-native-fs';
//import {CameraRoll} from '@react-native-community/cameraroll';

export default class Generator extends Component {
  constructor(props) {
    super(props);
    this.svg = {};
    this.state = {
      first_name: '',
      last_name: '',
      birthday: '',
      gender: '',
      mobile: 0,
      work_mobile: 0,
      email: '',
      home_address: '',
      org_address: '',
      org: '',
      linkedin: '',
      gen: false,
      error: '',
      jobitle: '',
    };
    //console.log(this.props.navigation.state.params);
  }
  change() {
    this.vcard = '';
    if (!this.state.first_name && !this.state.last_name && !this.state.mobile) {
      this.setState({error: 'Enter Name fields', gen: false});
    } else {
      this.foo();
      this.setState({gen: true, error: ''});
    }
    // this.generate();
  }
  foo() {
    this.vcard += 'BEGIN:VCARD\nVERSION:3.0\n';
    this.vcard +=
      'N:' +
      this.state.last_name +
      ';' +
      this.state.first_name +
      '\n' +
      'FN:' +
      this.state.first_name +
      ' ' +
      this.state.last_name;

    if (this.state.birthday) {
      this.vcard += '\nBDAY:' + this.state.birthday;
    }
    if (this.state.gender) {
      this.vcard += '\nX-GENDER:' + this.state.gender;
    }
    if (this.state.home_address) {
      this.vcard += '\nADR;TYPE=home:;;' + this.state.home_address;
    }
    if (this.state.org_address) {
      this.vcard += '\nADR;TYPE=work:;;' + this.state.org_address;
    }
    if (this.state.mobile) {
      this.vcard += '\nTEL;TYPE=home:' + this.state.mobile;
    }
    if (this.state.work_mobile) {
      this.vcard += '\nTEL;TYPE=work:' + this.state.work_mobile;
    }
    if (this.state.email) {
      this.vcard += '\nEMAIL;TYPE=internet,home:' + this.state.email;
    }
    if (this.state.linkedin) {
      this.vcard += '\nURL;TYPE=home:' + this.state.linkedin;
    }
    if (this.state.org) {
      this.vcard += '\nORG:' + this.state.org;
    }
    if (this.state.jobitle) {
      this.vcard += '\nTITLE:' + this.state.jobitle;
    }
    this.vcard += '\nEND:VCARD';
    //console.log(this.vcard);
    //console.log(this.state.gen);
  }
  generate() {
    if (this.state.error && !this.state.gen) {
      ToastAndroid.show(
        'Enter Name and Contact',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      this.setState({error: ''});
      /* return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            height: 100,
            marginLeft: 90,
            marginTop: 0,
          }}>
          <Text style={{color: 'red', fontSize: 20}}>{this.state.error}</Text>
        </View>
      ); */
    } else if (this.state.gen) {
      this.setState({gen: false});
      this.props.navigation.navigate('QR', {
        vcard: this.vcard,
        displayName: this.state.first_name + ' ' + this.state.last_name,
        mobile: this.state.mobile,
      });
    }
  }
  clear() {
    this.setState({
      first_name: '',
      last_name: '',
      birthday: '',
      gender: '',
      mobile: 0,
      work_mobile: 0,
      email: '',
      home_address: '',
      org_address: '',
      org: '',
      linkedin: '',
      gen: false,
      error: '',
      jobitle: '',
    });
  }
  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#484848'}}>
        {/* <View style={{margin: 5}} /> */}
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({first_name: text})}
          value={this.state.first_name}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({last_name: text})}
          value={this.state.last_name}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Birthday"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({birthday: text})}
          value={this.state.birthday}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({gender: text})}
          value={this.state.gender}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({mobile: text})}
          value={this.state.mobile}
          keyboardType={'numeric'}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Work Mobile Number"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({work_mobile: text})}
          value={this.state.work_mobile}
          keyboardType={'phone-pad'}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Email Id"
          placeholderTextColor="#9e9e9e"
          keyboardType={'email-address'}
          onChangeText={text => this.setState({email: text})}
          value={this.state.email}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Home Address"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({home_address: text})}
          value={this.state.home_address}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Organisation Address"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({org_address: text})}
          value={this.state.org_address}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Organisation"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({org: text})}
          value={this.state.org}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="Job Title"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({jobitle: text})}
          value={this.state.jobitle}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <TextInput
          placeholder="URL"
          placeholderTextColor="#9e9e9e"
          onChangeText={text => this.setState({linkedin: text})}
          value={this.state.linkedin}
          //keyboardType={'url'}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15,
            marginTop: 5,
            marginBottom: 5,
            color: 'white',
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={{
              margin: 60,
              backgroundColor: '#212121',
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
              marginTop: 10,
              height: 50,
              marginBottom: 5,
              width: 130,
            }}
            onPress={() => {
              this.clear();
            }}>
            <Text style={{color: '#b9b9b9', fontSize: 18}}>Clear Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 60,
              backgroundColor: '#212121',
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
              marginTop: 10,
              height: 50,
              marginBottom: 5,
              width: 130,
            }}
            onPress={() => {
              this.change();
            }}>
            <Text style={{color: '#b9b9b9', fontSize: 18}}>Generate</Text>
          </TouchableOpacity>
        </View>
        {this.generate()}
      </ScrollView>
    );
  }
}

/* requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'My App Storage Permission',
          message:
            'My App needs access to your storage ' +
            'so you can save your photos',
        },
      );
      return granted;
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  };

  saveQrToDisk() {
    this.requestExternalStoragePermission();
    this.svg.toDataURL(data => {
      RNFS.writeFile(RNFS.PicturesDirectoryPath + '/name.png', data, 'base64')
        .then(() => {
          CameraRoll.saveToCameraRoll(
            RNFS.PicturesDirectoryPath + '/name.png',
            'photo',
          );
        })
        .then(() => {
          this.setState({busy: false, imageSaved: true});
          ToastAndroid.show('Saved to gallery!', ToastAndroid.SHORT);
        });
    });
    this.svg.toDataURL(data => {
      const shareImageBase64 = {
        title: 'QR',
        message: 'Ehi, this is my QR code',
        url: `data:image/png;base64,${data}`,
      };
      Share.open(shareImageBase64);
    });
  } */
