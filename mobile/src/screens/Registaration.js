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
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler';


export default function Registration({navigation}){
    const db = firestore().collection('users');
    const [users, setUsers] = useState([]);
    async function addUser(name, email, password) {
        await db.add({
            name: name,
            email: email,
            password: password,
        })
    }
    const pressHandler=()=>{
        if(nameValue == ''||emailValue ==''||passwordValue == ''||confirmPassword==''){
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
            addUser(nameValue, emailValue, passwordValue );
            navigation.navigate('authorisation')
        }
        
    }  
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    useEffect(() => {
        return db.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const {name, email, password} = doc.data();
            list.push({
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              password: doc.data(). password
            });
        });
        setUsers(list)
        });
    }, []);
    // const confirmAlert =(id)=>{
    //     Alert.alert(
    //         'This note will be deleted!!',
    //         'Are you sure?',
    //         [
    //             {text: "Cancel", style: "cancel"},
    //             { text: "OK", onPress: () => firestore().collection("notes").doc(id).delete()}
    //         ]
    //     )
    // }
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
                        <Text style={styles.rowText}>gmail:</Text>
                        <TextInput style={styles.rowInput}
                            keyboardType="email-address"
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false} 
                            value={emailValue}
                            onChangeText={setEmailValue} 
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