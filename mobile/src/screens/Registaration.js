import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';

import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import {RadioButton} from 'react-native-paper'
import {styles} from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import socketIOClient from 'socket.io-client';

export default function Registration({navigation}){
    const socket = socketIOClient('http://192.168.1.100:6666', {      
        transports: ['websocket'], jsonp: false }); 
    async function addUser() {
        if(nameValue == ''||ageValue ==''||passwordValue == ''||confirmPassword==''){
            alert('pleace fill all fields')
        }
        else{
            await socket.emit('regUser',{name:nameValue, age:ageValue, password:passwordValue, conPassword:confirmPassword})
            await socket.on('answerReg',(data)=>{
                if(data ==1) alert('This name is already in use!');
                else if(data == 2) alert('Incorrect age value!');
                else if(data == 3) alert('Passwords dont match each other!');
                else navigation.navigate('authorisation')
                
            })    
        }
    } 
    const [nameValue, setNameValue] = useState('')
    const [ageValue, setAgeValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // useEffect(() => {
    // }, []);

    return(
        <View style={{flex:1}}>
            <ImageBackground source={require('../img/paperShadowBackground.png')} style={styles.image}>
                <View style={styles.logInContainer}>
                    <View style={styles.authTextContainer}>
                        <Text style={styles.higlightText}>Registaration!</Text>
                        <Text style={styles.regText}>Create a new account:)</Text>
                    </View>
                    <View style={styles.logRow}>
                        <Text style={styles.rowText}>Your name:</Text>
                        <TextInput style={styles.rowInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false}  
                            value={nameValue}
                            onChangeText={setNameValue}
                        ></TextInput>
                    </View>
                    <View style={styles.logRow}>
                        <Text style={styles.rowText}>age:</Text>
                        <TextInput style={styles.rowInput}
                            keyboardType="email-address"
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false} 
                            value={ageValue}
                            onChangeText={setAgeValue} 
                        ></TextInput>
                    </View>
                    <View style={styles.logRow}>
                        <Text style={styles.rowText}>Password:</Text>
                        <TextInput style={styles.rowInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false} 
                            secureTextEntry={true} 
                            value={passwordValue}
                            onChangeText={setPasswordValue}
                        ></TextInput>
                    </View>
                    <View style={styles.logRow}>
                        <Text style={styles.rowText}>Confirm password:</Text>
                        <TextInput style={styles.rowInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            autoCorrect={false} 
                            secureTextEntry={true} 
                        ></TextInput>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.defaultButton} onPress={addUser}
                        ><Text style={styles.mainText}>Register</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.defaultButton} onPress={()=>{        
                            navigation.navigate('authorisation')
                        }}><Text style={styles.mainText} >log in</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.registerContainer}>

                </View>
            </ImageBackground>
        </View>
    )   
}