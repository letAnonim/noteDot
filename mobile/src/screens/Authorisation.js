import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles';
import {useDispatch, connect} from 'react-redux';
import {checkUser, setDefault} from '../redux/actions/user.actions';
import { setDefaultNotes } from '../redux/actions/notes.actions';
import {showMessage} from "react-native-flash-message";

const Authorisation = (props) => {
    const dispatch = useDispatch();
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('isLoggedIn', jsonValue);
        } catch (e) {
            console.error(e);
        }
    };
    const readData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('isLoggedIn');
        if (jsonValue != null) {
            if (JSON.parse(jsonValue).isLogged == true)
            props.navigation.navigate('home', {
                screen: 'main',
                params: {
                    screen: 'notes',
                    params: {UserId: JSON.parse(jsonValue).userData.userId},
                },
            });
        }
        } catch (e) {
        console.error(e);
        }
    };
    useEffect(() => {
        if (props.access == true) {
            saveData({isLogged: true, userData: props.user.user});
            dispatch(setDefaultNotes())
            props.navigation.navigate('home', {
                screen: 'main',
                params: {
                    screen: 'notes',
                    params: {UserId: props.user.user.userId},
                },
            });
            setPasswordValue('');
            setLoginValue('');
        } else if (props.access == false){
            showMessage({
                floating: true,
                icon:'warning',
                type: 'danger',
                message: "Wrong login or password!",
                color:'#FFFFFF',
            });
            setPasswordValue('');
            dispatch(setDefault())
        }
    }, [props.access]);
    const pressHandler = async() => {
        if (loginValue != '' && passwordValue != '') {
            await dispatch(checkUser({login:loginValue, password:passwordValue})) 
        } else showMessage({
            floating: true,
            icon:'warning',
            type: 'warning',
            message: "Pleace fill all fields!",
            color:'#FFFFFF',
        })
    };
    readData();
    return (
        <View style={{flex: 1}}>
        <ImageBackground
            source={require('../img/paperShadowBackground.png')}
            style={styles.image}>
            <View style={styles.logInContainer}>
            <View style={styles.logInContainer}>
                <Text style={styles.higlightText}>Hello!</Text>
                <Text style={styles.logText}>
                {' '}
                Pleace authorise to start working :)
                </Text>
                <View style={styles.logRow}>
                <Text style={styles.rowText}>Login:</Text>
                <TextInput
                    style={styles.rowInput}
                    allowFontScaling={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Write your name..."
                    value={loginValue}
                    onChangeText={setLoginValue}></TextInput>
                </View>
                <View style={styles.logRow}>
                <Text style={styles.rowText}>Password:</Text>
                <TextInput
                    style={styles.rowInput}
                    allowFontScaling={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder="Write password..."
                    value={passwordValue}
                    onChangeText={setPasswordValue}></TextInput>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                style={styles.defaultButton}
                onPress={pressHandler}>
                <Text style={styles.mainText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.defaultButton}
                onPress={() => {
                    props.navigation.navigate('registration');
                }}>
                <Text style={styles.mainText}>Register</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.registerContainer}></View>
        </ImageBackground>
        </View>
    );
}
const  mapStateToProps = (state) =>({user: state.user, access: state.user.access})

const connectComponent = connect(mapStateToProps);
export default connectComponent(Authorisation);
