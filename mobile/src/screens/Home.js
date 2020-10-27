import React from 'react';
import {
  View,
  Text,

} from 'react-native';
import {styles} from '../styles'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Notes from './drawer/Notes';
import Profile from './drawer/Profile';
import Settings from './drawer/Settings';
import {DrawerContent} from './DrawerContent'
import Note from './Note';


export default function Home({navigation}){
  // const { aUser } = route.params;
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
        <Drawer.Screen name="notes" component={Notes}/>
        <Drawer.Screen name="profile" component={Profile}/>
        <Drawer.Screen name="settings" component={Settings}/>
    </Drawer.Navigator>
  )      
}
