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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props){
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerMainContainer}>
                <View style={styles.closeDrawerContainer}>
                    <TouchableOpacity onPress={()=>{props.navigation.closeDrawer()}}>
                        <Image style={styles.smallButton} source={require('../img/menu.png')}/>
                        
                    </TouchableOpacity>
                </View>
                <Drawer.Section>
                    <DrawerItem 
                        // icon={({color, size}) => (
                        //     <Icon 
                        //     // style={styles.smallButton} 
                        //     // source={require('../img/defauldUser.png')}
                        //     color={color}
                        //     size={size}
                        //     />
                        // )}
                        label="Notes"
                        onPress={() => {props.navigation.navigate('notes')}}
                    />
                    <DrawerItem 
                        // icon={({color, size}) => (
                        //     <Icon 
                        //     // style={styles.smallButton} 
                        //     // source={require('../img/defauldUser.png')}
                        //     color={color}
                        //     size={size}
                        //     />
                        // )}
                        label="Profile"
                        onPress={() => {props.navigation.navigate('profile')}}
                    />
                    <DrawerItem 
                        // icon={({color, size}) => (
                        //     <Icon 
                        //     style={styles.smallButton} 
                        //     source={require('../img/defauldUser.png')}
                        //     color={color}
                        //     size={size}
                        //     />
                        // )}
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