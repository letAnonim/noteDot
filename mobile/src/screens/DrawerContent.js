import React from 'react';
import {
    View,
    Text,
    Image
}from 'react-native'
import{
    DrawerContentScrollView, 
    DrawerItem
}from '@react-navigation/drawer'
import {styles}from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export function DrawerContent(props){
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerMainContainer}>
                <View style={styles.closeDrawerContainer}>
                    <TouchableOpacity onPress={()=>{props.navigation.closeDrawer()}}>
                        <Icon name="indent" color='grey' size={30} style={{margin: 5}}/>
                    </TouchableOpacity>
                </View>
                <Drawer.Section>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon
                            // style={styles.smallButton} 
                            name="list"
                            color="grey"
                            size={30}
                            />
                        )}
                        // icon = 'menu'
                        label="Notes"
                        onPress={() => {props.navigation.navigate('notes')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="user-circle"
                            color='grey'
                            size={30}
                            />
                        )}
                        label="Profile"
                        onPress={() => {props.navigation.navigate('profile')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="gears"
                            color='grey'
                            size={30}
                            />
                        )}
                        label="Settings"
                        onPress={() => {props.navigation.navigate('settings')}}
                    />
                            {/* <Image style={styles.smallButton} source={require('../img/defauldUser.png')}/>
                            <Text>Profile</Text> */}
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    )
}