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

export default function Registration({route, navigation}){
    const { Asocket } = route.params;
    const [users, setUsers] = useState([]);
    async function addUser(name, age, password) {
        Asocket.emit('regUser',{name, age, password} )
    }
    const pressHandler=()=>{
        if(nameValue == ''||ageValue ==''||passwordValue == ''||confirmPassword==''){
            alert('pleace fill all fields')
        }
        else if(users.map((item)=>{return (item.name==nameValue)}).includes(true)){
            alert('This name is occuped, choose another!')
        }
        else if(passwordValue!==confirmPassword){
            alert('passwords dont match each other!!')
            setPasswordValue(''); 
            setConfirmPassword('')
        }
        else{
            addUser(nameValue, ageValue, passwordValue );
            navigation.navigate('authorisation')
        } 
    }  
    const [nameValue, setNameValue] = useState('')
    const [ageValue, setAgeValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    useEffect(() => {
            Asocket.connect();  
            Asocket.emit('getUsers');
            Asocket.on('users', msg=>{
                setUsers(msg)
            })
    }, []);

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
                    <View style={{margin: 20}}>
                        <Button title='Register!'
                        color='orange'
                        onPress={()=>pressHandler()}
                        />
                    </View>
                    <View style={{margin: 20}}>
                        <Button title='Log in!'
                        color='orange'
                        onPress={()=>{   
                            navigation.navigate('authorisation')
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