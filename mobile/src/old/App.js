import 'react-native-gesture-handler';
import React, {Component , useEffect, Fragment} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';


// import Screen1 from './src/screens/drawer/screen1'
// import Screen2 from './src/screens/drawer/screen2'
import Authorisation from './src/screens/Authorisation'
import {styles} from './src/styles'
import firestore, { firebase } from '@react-native-firebase/firestore'
import Registration from './src/screens/Registaration';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Note from './src/screens/Note';

// const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();

export default class App extends Component {
  
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