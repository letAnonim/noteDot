import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import { NetworkInfo } from "react-native-network-info";
import{ bindActionCreators } from 'redux'
import {getNotes} from '../redux/actions/notes.actions'

import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles';
import socketIOClient from 'socket.io-client';

import { useSelector, useDispatch } from 'react-redux'

export default function Authorisatio({navigation}){
    // NetworkInfo.getIPV4Address().then(ipv4Address => {
    //   console.log(ipv4Address);
    // });
    const socket = socketIOClient('http://192.168.1.100:6666', {      
    transports: ['websocket'], jsonp: false });   
    const user = useSelector(state => state.users)
    const notes = useSelector(state => state.notes)
    const dispatch = useDispatch()
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('isLoggedIn', jsonValue);
        } catch (e) {
            console.error(e);
        }
      }
      const readData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('isLoggedIn');
            if(jsonValue != null){
                if(JSON.parse(jsonValue).isLogged == true) navigation.navigate('home',{
                    screen: 'notes',
                    params: { UserId:JSON.parse(jsonValue).userData.userId}
                })

            }
        } catch (e) {
            console.erro(e);
        }
      };
    // useEffect(() => {
    //     socket.connect();  
        
    //     socket.on('users', msg=>{
    //         setUsers(msg)
    //     })
    // }, []);
    const pressHandler=()=>{
        if(loginValue!=''&&passwordValue!=''){
            socket.connect();  
            socket.emit('checkLog', loginValue, passwordValue )
            socket.on('answerLog', (data, user)=>{
                if(data== true){
                    saveData({isLogged: true, userData:{userId: user._id, userName: user.name, userAge: user.age, userRegDate: user.createdAt, photo:user.photo}})
                    navigation.navigate('home',{
                        screen: 'notes',
                        params: { UserId:user._id}
                    })
                    setPasswordValue('');
                    setLoginValue('');
                }
                else{
                    alert('Wrong login or password!');
                    setPasswordValue('')
                } 
            })
        }
        else alert('Pleace fill all fields!')
    }  
    readData()
    return(
        <View style={{flex:1}}>
            <ImageBackground source={require('../img/paperShadowBackground.png')} style={styles.image}>
                <View style={styles.logInContainer}>
                    <View style={styles.logInContainer}>    
                        <Text style={styles.higlightText}>Hello!</Text>
                        <Text style={styles.logText}> Pleace authorise to start working :)</Text>
                        <View style={styles.logRow}>
                            <Text style={styles.rowText}>Login:</Text>
                            <TextInput style={styles.rowInput}
                                allowFontScaling={false}
                                autoCapitalize='none'
                                autoCorrect={false}  
                                placeholder='Write your name...'
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
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.defaultButton} onPress={pressHandler}
                        ><Text style={styles.mainText}>Log in</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.defaultButton} onPress={()=>{        
                            navigation.navigate('registration')
                        }}><Text style={styles.mainText} >Register</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.registerContainer}>

                </View>
            </ImageBackground>
        </View>
    )   
}
// function mapStateToProps(state){
//     return {
//       users: state.users,
//       notes: state.notes
//     }
//   }
//   function mapDispatchToProps(dispatch){
//     return bindActionCreators({getNotes}, dispatch)
//   }
//   export default connect(mapStateToProps, mapDispatchToProps)(Authorisation);