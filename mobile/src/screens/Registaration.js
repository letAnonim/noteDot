import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {
    TextInput,
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import {styles} from '../styles';
// import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch, connect} from 'react-redux';
import {regUser, setDefault} from '../redux/actions/user.actions'

const Registration = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if(props.response == 1) alert('This name is already in use!');
        else if(props.response == 2) alert('Incorrect age value!');
        else if(props.response == 3) alert('Passwords dont match each other!');
        else if(props.response == 4) {
            alert('Registred success');
            props.navigation.navigate('authorisation');
            dispatch(setDefault());
        }
    }, [props.response]);
    async function addUser() {
        if(nameValue == ''||ageValue ==''||passwordValue == ''||confirmPassword==''){
            alert('pleace fill all fields')
        }
        else await dispatch(regUser({name:nameValue, age:ageValue, password:passwordValue, conPassword:confirmPassword}))
    } 
    const [nameValue, setNameValue] = useState('')
    const [ageValue, setAgeValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                            props.navigation.navigate('authorisation'); 
                            dispatch(setDefault());
                        }}><Text style={styles.mainText} >log in</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )   
}
const mapStateToProps = (state)=>({user:state.user, response:state.user.response})

const connectComponent = connect(mapStateToProps);
export default connectComponent(Registration)