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

// import Profile from './src/screens/drawer/Profile';
import Authorisation from './src/screens/Authorisation';
import Registration from './src/screens/Registaration';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Note from './src/screens/Note';
import QRCodeScanner from './src/screens/drawer/qrCodeScanner'
import SplashScreen from 'react-native-splash-screen';
import {Provider, connect} from 'react-redux';
import store from './src/redux/store/store';
import FlashMessage from "react-native-flash-message";

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
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="authorisation" component={Authorisation} />
            <Stack.Screen name="registration" component={Registration} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="chat" component={Chat} />
            <Stack.Screen name="note" component={Note} />
            <Stack.Screen name="qrscanner" component={QRCodeScanner}/>
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top"/>
      </Provider>
    );
  }
}
