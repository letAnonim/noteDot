import React from 'react';
import {
  View,
  Text,
  ImageBackground
} from 'react-native';
import {styles} from '../../styles'


export default function Settings(){
    return(
        <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
            <View style={styles.mainContainer}>
            <Text style={styles.mainText}>Settings</Text>
        </View>
        </ImageBackground>
        
    )      
}