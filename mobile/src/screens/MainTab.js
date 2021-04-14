import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notes from './drawer/Notes';
import Calendar from './Calendar';

export default function MainTab({navigation, route}){
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator >
        <Tab.Screen name="notes" component={Notes}/>
        <Tab.Screen name="calendar" component={Calendar}/>
    </Tab.Navigator>
  )      
}