import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

import Profile from './src/screens/drawer/Profile';
import Authorisation from './src/screens/Authorisation';
import Registration from './src/screens/Registaration';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Note from './src/screens/Note';
import SplashScreen from 'react-native-splash-screen';
import socketIO from 'socket.io-client';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import store from './src/redux/store/store';
import {StackNavigator, TabNavigator} from 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const Stack = createStackNavigator();
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName={(isLog.isLogged == false)?('authorisation'):('home')}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="authorisation" component={Authorisation} />
            <Stack.Screen name="registration" component={Registration} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="chat" component={Chat} />
            <Stack.Screen name="note" component={Note} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
