import React, { useState,  Component, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, 
    ImageBackground,
    Alert,
    NativeModules,
    Dimensions
} from 'react-native';
// import { connect, useSelector, useDispatch } from 'react-redux';
import {styles} from '../../styles'
import {getUsers, updateUserPhoto} from '../../redux/actions/users.actions.js'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {lightIconColor} from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
// const client = axios.create({
//     baseURL: 'http://192.168.1.105:6666/',
//     responseType: 'json',
//   });
const ImagePicker = NativeModules.ImageCropPicker

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Profile({navigation, route}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [imageSource, setImageSource] = useState('')
    const [imageUri, setImageUri] = useState('')
    // const [newName, setNewName] = useState('')
    const resUsers = useSelector(state => state.users) 
    const getStatus = useSelector(state => state.users.status)
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

    const returnDate = timestamp =>{
        let date = new Date(timestamp)
        let now = new Date()
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear()
        let returnHours = (hours<10)?(`0${hours}:`):(`${hours}:`)
        let returnMinutes = (minutes<10)?(`0${minutes}`):(minutes)
        if(day == now.getDay()&&month == now.getMonth()&&year==now.getFullYear()){
            return returnHours+returnMinutes
        }
        else{
            let returnDay = (day<10)?(`0${day}/`):(`${day}/${year}`)
            let returnMonth = (month<10)?(`0${month}/${year}`):(`${month}/${year}`);
            return returnDay+returnMonth+' at '+returnHours+returnMinutes
        } 
    }

    const changeImage = () => {     
        launchImageLibrary({}, response => {
            // console.log('request = ', response);
            if (response.didCancel) {
                    console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                Alert.alert(response.customButton);
            } else {
            const img = {
                uri: response.uri,
                type: response.type,
                name: response.fileName||response.uri.substr(response.uri.lastIndexOf('/') + 1)
            }
            dispatch(updateUserPhoto({type:'photo',data:{id:user.userId, photo: img}})).then(()=>{
                console.log('prev', imageUri);
                console.log('new', img.uri);
                setImageUri(img.uri);
                console.log('------------------------------------------------------')
            })     
            // client.post('/api/user/photoupdate', ).then((res) => {
            //     console.log('response', res);
            //     setImageUri(res.data.img.data);
            //     console.log(res.data.img.data);
            // })
            }
        });
    }
    useEffect(() => {
        readData()
        .then(data =>{
            setUser(data);
            setImageUri(data.photo.img.data)
            console.log(data);
        })
        console.log(getStatus)
    }, [getStatus])
      
    return(
        <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
            <View style={{
                backgroundColor:'#FFBA51', 
                height:50,
                flexDirection:'row'}}>
                <View style={styles.nawbarContainerLeft}>
                    <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.openDrawer()}}>
                        <Icon name="align-justify" color={lightIconColor} size={35} style={{margin: 7}}/>
                    </TouchableOpacity>
                    <Text style={styles.nawbarTitle}>Profile</Text>   
                </View>
                <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={{}}>
                        <Icon name="gears" color={lightIconColor} size={35} style={{margin: 7}}/>
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
                        <Text style={{color:'grey', fontSize:30 ,fontWeight:'900'}}>{user.userName}</Text>
                        <Text style={styles.mainGreyText}>Age: {user.userAge}  </Text>
                        <Text style={{color:'grey', fontSize:20 ,fontWeight:'400'}}>Created:{returnDate(user.userRegDate) }  </Text>
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