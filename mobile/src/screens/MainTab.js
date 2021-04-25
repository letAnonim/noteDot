import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notes from './drawer/Notes';
import CalendarComponenet from './Calendar';
import AddButton from './components/AddButton.js';
import Icon from 'react-native-vector-icons/FontAwesome';


const nullFuction = () => null
export default function MainTab({navigation, route}) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="notes" component={Notes} options={{ title: () => <Icon style={{marginBottom:10}} size={30} name='list' />}}/>
      <Tab.Screen name="add" component={nullFuction} options={{ title: () => <AddButton/>}}/>
      <Tab.Screen name="calendar" component={CalendarComponenet} options={{ title: () => <Icon style={{marginBottom:10}} size={30} name='calendar' />}}/>
    </Tab.Navigator>
  );
}
