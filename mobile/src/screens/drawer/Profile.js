import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image, 
  ImageBackground
} from 'react-native';
import {styles} from '../../styles'


export default function Profile({navigation, route}){
    const { aUser } = route.params;
    const { Asocket } = route.params;
    return(
        <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
            <View style={{
                backgroundColor:`orange`, 
                height:50,
                flexDirection:'row'}}>
                <View style={styles.nawbarContainerLeft}>
                    <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.openDrawer()}}>
                        <Image style={styles.addSmallButton} source={require('../../img/menu.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.nawbarTitle}>Profile</Text>   
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.bigAvatar}>
                    <View style={{backgroundColor:'white',width:150, height:150, borderRadius:100}}>
                        <Image style={{width:150, height:150, borderRadius:100}} source={require('../../img/defaultUser.png')}/>
                    </View>
                </View>
                <View>
                    <Text style={styles.mainText}>Name:{aUser.name} </Text>
                </View>
            </View>
        </ImageBackground>
        
    )      
}