import React, { useState,  Component, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, 
    ImageBackground,
    Alert,
    NativeModules,
    TextInut,
    Modal,
    Dimensions
} from 'react-native';
// import { connect, useSelector, useDispatch } from 'react-redux';
import {styles} from '../../styles'
import {getUser, addUser, updateUser} from '../../redux/actions/users.actions.js'
import axios from 'axios';
const client = axios.create({
    baseURL: 'http://192.168.1.100:6666/',
    responseType: 'json',
  });
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
    const [imageUri, setImageUri] = useState('')
    const [newName, setNewName] = useState('')
    

    const isPortrait = () => {
        const dim = Dimensions.get('window');
        return dim.height <= dim.width;
    };
    const [orientation, setOrientation] = useState(isPortrait())
    Dimensions.addEventListener('change', () => {setOrientation(isPortrait())});

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
    
    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('isLoggedIn', jsonValue)
        } catch (e) {
            console.error(e);
        }
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

    const changeImage = () => {     
        // updateUser({user:{id:user._id, oldName: user.name}, name: newName})
        launchImageLibrary({}, response => {
                console.log('request = ', response);
                if (response.didCancel) {
                        console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    Alert.alert(response.customButton);
                } else {
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // const data = new FormData();
                // data.append(image, {
                    // uri:  Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""), 
                    // name: `dummy${Date.now()}.jpg`,
                    // type: response.type
                    // })
                const img = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName||response.uri.substr(response.uri.lastIndexOf('/') + 1)
                }
                // setImageSource(img);
                client.post('/api/user/photoupdate', {id:user.userId, photo: img}).then((res) => {
                    console.log('response', res);
                    setImageUri(res.data.img.data);
                    console.log(res.data.img.data);
                })
            }
          });
    }

    useEffect(() => {
        readData()
        .then(data =>{
            setUser(data);
            console.log(data);
        })
    }, [])
      
    return(
        <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
            <View style={{
                backgroundColor:'#FFBA51', 
                height:50,
                flexDirection:'row'}}>
                <View style={styles.nawbarContainerLeft}>
                    <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.openDrawer()}}>
                        <Image style={styles.addSmallButton} source={require('../../img/menu.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.nawbarTitle}>Profile</Text>   
                </View>
                <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={{}}>
                            <Image style={styles.addSmallButton} source={require('../../img/setings.png')}/>
                        </TouchableOpacity>
                    </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={(!orientation)?styles.bigAvatarContainer:styles.bigLandscapeAvatarContainer}>
                    <View style={styles.BigAvatar}>
                        {(imageUri=='')?(<Image style={styles.avatarImage}source={require('../../img/defaultAvatar.png')}/>):(
                            <Image style={styles.avatarImage} source={{uri: imageUri}}/>)}
                    </View>
                </View>
                <View style={styles.underAvatarContainer}>
                    <View style={(!orientation)?styles.profileText:styles.profileLandscapeText}>
                        {/* <TextInput style={styles.rowInput}
                                allowFontScaling={false}
                                autoCapitalize='none'
                                autoCorrect={false}  
                                placeholder='Write new name'
                                value={newName}
                                onChangeText={setNewName}></TextInput> */}
                        {/* <Text style={styles.mainGreyText}>{imageSource.uri}</Text> */}
                        <Text style={{color: 'grey',fontSize: 30,fontWeight:'900',}}>{user.userName}</Text>
                        {/* <Text style={styles.mainGreyText}>{user.userAge}  </Text> */}
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <View style={(!orientation)?styles.buttonsContainer:styles.buttonsLandscapeContainer}>
                            <TouchableOpacity style={styles.defaultButton} onPress={changeImage}
                            ><Text style={styles.mainText}>Edit profile</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.defaultCloseButton} onPress={confirmExit}>
                                <Text style={styles.mainText} >Log out</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
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