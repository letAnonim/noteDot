import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notes from './drawer/Notes';
import {DrawerContent} from './DrawerContent'
import Calendar from './Calendar';

export default function MainTab({navigation, route}){
  const Tab = createMaterialTopTabNavigator();
  return(
    <Tab.Navigator tabBarPosition='bottom'>
        <Tab.Screen name="notes" component={Notes}/>
        <Tab.Screen name="calendar" component={Calendar}/>
    </Tab.Navigator>
  )      
}