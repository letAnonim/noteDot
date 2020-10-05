import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';

import {
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Image,
    Modal,
    TouchableHighlight,
    StyleSheet,
    Text,
    Alert, 
    ImageBackground
} from 'react-native';
import {RadioButton} from 'react-native-paper'
import {styles} from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client'

export default function Authorisation({navigation}){
    // useEffect(()=>{

    // })
    const socket = socketIOClient('http://10.10.10.10:6666', {      
    transports: ['websocket'], jsonp: false });   
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        socket.connect();  
        socket.emit('getUsers');
        socket.on('users', msg=>{
            setUsers(msg)
        })
    }, []);

    
    const pressHandler=()=>{
        if(loginValue!=''&&passwordValue!=''){
            if(users.map((item)=>{return (item.name==loginValue)}).includes(true)){
                const index = users.map((item)=>{return (item.name==loginValue)}).indexOf(true);
                if(users[index].password == passwordValue){
                    navigation.navigate('home',{
                        screen: 'notes',
                        params: { aUser:users[index], Asocket: socket},
                        // aUser:  users[index], 
                        // socket: socket
                    })
                }
                else {
                    alert('Wrong login or password!');
                    setPasswordValue('')
                }
            }
            else alert('Wrong login or password!');
            setPasswordValue('')   
        }
        else alert('Pleace fill all fields!')
    }  
   
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
 
    return(
        <View style={{flex:1}}>
            <ImageBackground source={require('../img/paperShadowBackground.png')} style={styles.image}>
                <View style={styles.logInContainer}>
                    <Text style={styles.higlightText}>Hello!</Text>
                    <Text style={styles.logText}> Pleace authorise to start working :)</Text>
                    <View style={styles.logRow}>
                        <Text style={styles.rowText}>Login:</Text>
                        <TextInput style={styles.rowInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false}  
                            placeholder='Write name or email...'
                            value={loginValue}
                            onChangeText={setLoginValue}
                        ></TextInput>
                    </View>
                    <View style={styles.logRow}>
                        <Text style={styles.rowText}>Password:</Text>
                        <TextInput style={styles.rowInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false} 
                            secureTextEntry={true}
                            placeholder='Write password...'
                            value={passwordValue}
                            onChangeText={setPasswordValue}
                        ></TextInput>
                    </View>
                    <View style={{margin: 20}}>
                        <Button title='Log in!'
                        color='orange'
                        onPress={()=>pressHandler()}
                        />
                    </View>
                    <View style={{margin: 20}}>
                        <Button title='Register!'
                        color='orange'
                        onPress={()=>{          
                           navigation.navigate('registration', {aUsers: users, socket: socket})
                        }}
                        />
                    </View>
                    
                </View>
                <View style={styles.registerContainer}>

                </View>
            </ImageBackground>
        </View>
    )   
}