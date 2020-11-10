import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
// } from 'react-native';


import Authorisation from './src/screens/Authorisation'
import Registration from './src/screens/Registaration';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Note from './src/screens/Note';
const Stack = createStackNavigator();
import socketIO from 'socket.io-client';
import SplashScreen from 'react-native-splash-screen';


export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render(){  
    return (
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen 
            name ='authorisation' 
            component={Authorisation}
          />
          <Stack.Screen 
            name ='registration' 
            component={Registration}
          />
          <Stack.Screen 
            name ='home' 
            component={Home}
          />
          <Stack.Screen
            name ='chat'
            component={Chat}
          />
          <Stack.Screen
            name ='note'
            component={Note}
          />

        </Stack.Navigator>
      </NavigationContainer>
  )}
}