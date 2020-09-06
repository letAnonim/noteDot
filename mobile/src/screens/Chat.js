import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import {styles} from '../styles'


export default function Chat({route, navigation}){
    const { aNote } = route.params;
    const { User } = route.params;
    return(
        <ImageBackground source={require('../img/paperBackground.png')} style={styles.image}>
            <View style={{backgroundColor:`rgba(${aNote.color}, 1)`, 
                height:50,
                flexDirection:'row'}}>
                <View style={styles.nawbarContainerLeft}>
                    <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.navigate('note')}}>
                        <Image style={styles.addSmallButton} source={require('../img/menu.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.nawbarTitle}>Chat</Text>   
                </View>
                {/* <View style={styles.nawbarContainerRight}>
                    <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{pressHendler()}}>
                        <Image style={styles.addSmallButton} source={require('../img/edit.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{navigation.navigate('chat')}}>
                        <Image style={styles.addSmallButton} source={require('../img/chat.png')}/>
                    </TouchableOpacity>
                </View> */}
                </View>
        </ImageBackground>
        
    )      
}