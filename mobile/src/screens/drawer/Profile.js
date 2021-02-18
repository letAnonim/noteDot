import React, { useState,  Component, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, 
    ImageBackground,
    Button, 
    Alert,
    NativeModules
} from 'react-native';
// import { connect, useSelector, useDispatch } from 'react-redux';
import {styles} from '../../styles'
import {getUser, addUser, updateUserPhoto} from '../../redux/actions/users.actions.js'
// import {getAllNotes} from '../../redux/actions/notes.actions.js'
// import{ bindActionCreators } from 'redux'
// import axios from 'axios';
const ImagePicker = NativeModules.ImageCropPicker

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

// NetworkInfo.getIPV4Address().then(ipv4Address => {
//   console.log(ipv4Address);
// });
export default function Profile({navigation, route}) {
    const [user, setUser] = useState({});
    const [imageSource, setImageSource] = useState('')
    // const options = {
    //     title: 'Load Photo',

    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images',
    //     },
    //   };
    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('isLoggedIn', jsonValue)
        } catch (e) {
            console.error(e);
        }
      }

    const confirmExit=()=>{
        Alert.alert(
            'Exit profile!',
            'Are you sure?',
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () =>{
                    saveData({isLogged: false, userData: null});
                    navigation.navigate('authorisation')
                }}
            ]
        )
    }
    const chosePhoto=()=>{
        Alert.alert(
            'C',
            'Are you sure?',
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () =>{
                    saveData({isLogged: false, userData: null});
                    navigation.navigate('authorisation')
                }}
            ]
        )
    }
    const readData = async () => {
        try {
            const jsonValue =  await AsyncStorage.getItem('isLoggedIn');
            if(jsonValue != null){
                return JSON.parse(jsonValue).userData
            }
        } catch (e) {
            console.error(e);
        }
      };
      useEffect(() => {
        readData()
        .then(data =>{
            setUser(data);
            console.log(data)
        })
       }, [])
      
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
                        {(imageSource=='')?(<Image style={{width:150, height:150, borderRadius:100}}source={require('../../img/defaultUser.png')}/>):(
                         <Image style={{width:150, height:150, borderRadius:100}} source={{uri: imageSource.uri}}/>)}   
                    </View>
                </View>
                <View>
                    <Text style={styles.mainText}>{imageSource.uri}</Text>
                    <Text style={styles.mainText}>Name:{user.userName}</Text>
                    <Text style={styles.mainText}>Age:{user.userAge}  </Text>
                </View>
            </View>
            <View style={{margin:10}}>
                <Button title='change photo'
                    color='orange'
                    onPress={()=>{  
                        // ImagePicker.openPicker({
                        //     multiple: true,
                        //     waitAnimationEnd: false,
                        //     includeExif: true,
                        //     forceJpg: true,
                        // }).then(images => {
                        //     this.setState({
                        //         image: null,
                        //         images: images.map(i => {
                        //             console.log('received image', i);
                        //             return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                        //         })
                        //     });
                        // }).catch(e => alert(e));
                    
                        launchImageLibrary({}, response => {
                            console.log('Response = ', response);
                          
                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            } else if (response.error) {
                                console.log('ImagePicker Error: ', response.error);
                            } else if (response.customButton) {
                                console.log('User tapped custom button: ', response.customButton);
                                Alert.alert(response.customButton);
                            } else {
                                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                                const img = {
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName||response.uri.substr(response.uri.lastIndexOf('/') + 1)
                                }
                                setImageSource(img);
                                updateUserPhoto(img)
                                console.log(imageSource);
                            }
                          });
                    }}
                />
            </View>
            <View style={{margin:10}}>
                <Button title='Exit profile'
                    color='red'
                    onPress={()=>confirmExit()}
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