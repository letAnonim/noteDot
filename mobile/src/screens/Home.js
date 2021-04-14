import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from './drawer/Profile';
import Settings from './drawer/Settings';
import {DrawerContent} from './DrawerContent';
import MainTab from './MainTab';

export default function Home() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="main" component={MainTab} />
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="settings" component={Settings} />
    </Drawer.Navigator>
  );
}
