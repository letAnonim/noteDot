import React, { Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, 
    ImageBackground,
    Button, 
    Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import {styles} from '../../styles'
import {getUsers, getUser} from '../../redux/actions/users.actions.js'
import {getAllNotes} from '../../redux/actions/notes.actions.js'
import{ bindActionCreators } from 'redux'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// NetworkInfo.getIPV4Address().then(ipv4Address => {
//   console.log(ipv4Address);
// });
export default function Profile({navigation, route}) {
    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('isLoggedIn', jsonValue)
        } catch (e) {
            console.error(e);
        }
      }
    //  const socket = socketIOClient('http://192.168.1.100:6666', {      
    // transports: ['websocket'], jsonp: false }); 
    const users = useSelector(state => state.users)
    const notes = useSelector(state => state.notes)
    const dispatch = useDispatch()
    // const { notes, loadingNotes} = this.props;
    const confirmAlert =()=>{
        Alert.alert(
            'Exit profile!',
            'Are you sure?',
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () =>{
                    saveData({isLogged: false, userId: null});
                    navigation.navigate('authorisation')
                }}
            ]
        )
    }
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
                    <Text style={styles.mainText}>Name:Taras  </Text>
                    <Text style={styles.mainText}>Age:20  </Text>
                </View>
            </View>
            <View style={{margin:10}}>
                <Button title='get users'
                    color='orange'
                    onPress={()=>{          
                        dispatch(getUsers());
                    }}
                />
            </View>
            <View style={{margin:10}}>
                <Button title='Exit profile'
                    color='red'
                    onPress={()=>{          
                        confirmAlert()
                    }}
                />
            </View>
        </ImageBackground>
        
    )      
}

// function mapStateToProps(state){
//     return {
//       users: state.users,
//       notes: state.notes
//     }
//   }
  
//   function mapDispatchToProps(dispatch){
//     return bindActionCreators({getUsers, getNotes}, dispatch)
//   }
  
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Profile);