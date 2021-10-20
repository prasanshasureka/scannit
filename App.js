/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import scan from './src/scan';
import generator from './src/generator';
import final from './src/finalqr';
import 'react-native-gesture-handler';

const GenQRNavigator = createStackNavigator(
  {
    Form: generator,
    QR: final,
  },
  {
    headerMode: 'none',
  },
);

const AppNavigator = createMaterialTopTabNavigator(
  {
    Scan: scan,
    Generate: GenQRNavigator,
  },
  {
    swipeEnabled: true,
    lazy: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#212121',
        height: 70,
        justifyContent: 'center',
      },
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: 'white',
        height: 1,
      },
      labelStyle: {
        fontSize: 20,
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;

/* export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Prasansha Sureka</Text>
      </View>
    );
  }
}
 */
