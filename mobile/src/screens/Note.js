import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {
    TextInput,
    View,
    Text,
    ImageBackground, 
    TouchableOpacity,
    Image,
} from 'react-native';
import {styles} from '../styles'
import '../img/paperBackground.png'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {updateNoteText} from '../redux/actions/notes.actions';
import {lightIconColor} from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import {showMessage} from "react-native-flash-message";
const client = axios.create({
    baseURL: 'http://192.168.1.105:6666/',
    responseType: 'json',
  });


export default function Note({route, navigation}){
    const dispatch = useDispatch();
    // const resNotes = useSelector(state => state.notes); 
    const { aNote } = route.params;
    const [note, setNote] = useState(aNote)
    const [text, setText] = useState(`${note.text}`)
    const [user, setUser] = useState({})
    const resNotes = useSelector(state => state.notes) 
    const getStatus = useSelector(state => state.notes.status)
    const getLoading = useSelector(state => state.notes.loading)
    const readData = async () => {
        try {
            const jsonValue =  await AsyncStorage.getItem('isLoggedIn');
            if(jsonValue != null){
                setUser(JSON.parse(jsonValue).userData)
            }
        } catch (e) {
            console.error(e);
        }
    };
    const pressHendler=()=>{
        setText(text);
        dispatch(updateNoteText({type:"text", textValue:text, noteId:aNote._id}))
        // client.put(`/api/notes/text`, {type:"text", textValue:text, noteId:aNote._id}).then((res) => {console.log(res.data);setNote(res.data)})
    }
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
    useEffect(() => {
        readData();
        if(getStatus ==='updateNoteTextSucceeded'){
            showMessage({
                floating: true,
                icon:'success',
                message: "Saved!",
                type: 'success',
                color:'#FFFFFF',
            })}
        else if(getStatus ==='updateNoteTextFailed'){
            showMessage({
                floating: true,
                icon:'warning',
                message: "Failed to update note text",
                type: 'danger',
                color:'#FFFFFF',
            });}
        console.log(getStatus)
    }, []);
    return(
        <View style={styles.mainNoteContainer}>
            <ImageBackground source={require('../img/paperBackground.png')} style={styles.image}>
                <View style={{backgroundColor:`rgba(${note.color}, 1)`, 
                    height:50,
                    flexDirection:'row'}}>
                    <View style={styles.nawbarContainerLeft}>
                        <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.navigate('notes')}}>
                            <Icon name="list" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                        <Text style={styles.nawbarTitle} numberOfLines={1}>{note.title}</Text>   
                    </View>
                    <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={pressHendler}>
                            <Icon name="save" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{navigation.navigate('chat', {aNote:note})}}>
                            <Icon1 name="message-circle" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                    </View>
                 </View> 
                    <View style={{backgroundColor: `rgba(${note.color},0.2)`, maxWidth:'100%',flex:1,justifyContent:'center', alignItems:'flex-start'}}>
                        <Text style={{margin:4}}>Last updated: {returnDate(note.updatedAt)}</Text>
                        <TextInput style={styles.textInputContainer}
                            placeholder='Start typing here...'
                            multiline 
                            editable
                            numberOfLines={3000}
                            autoCorrect= {false}
                            autoCompleteType = 'off'
                            value={text}
                            onChangeText={(newValue)=> setText(newValue)}
                        ></TextInput>
                    </View>      
            </ImageBackground>
        </View>
    )      
}