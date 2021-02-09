import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {
    TextInput,
    View,
    Text,
    Button,
    Alert,
    ImageBackground, 
    TouchableOpacity,
    Image,
} from 'react-native';
import {styles} from '../styles'
import '../img/paperBackground.png'
// import { TextInput } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getNote, deleteNote, findNote} from '../redux/actions/notes.actions'

export default function Note({route, navigation}){
    const dispatch = useDispatch();
    // const resNotes = useSelector(state => state.notes) 
    const { aNote } = route.params;
    const [note, setNote] = useState(aNote)
    const [text, setText] = useState(`${note.text}`)
  
    
    
    function addNoteText(text) {
        // socket.emit('saveNoteText', text, note._id)
        
    }
    const pressHendler=()=>{
        addNoteText(text);
        setText(text);
    }
    // useEffect(() => {
    //     dispatch()
    // }, [note]);
    return(
        <View style={styles.mainNoteContainer}>
            <ImageBackground source={require('../img/paperBackground.png')} style={styles.image}>
                <View style={{backgroundColor:`rgba(${note.color}, 1)`, 
                    height:50,
                    flexDirection:'row'}}>
                    <View style={styles.nawbarContainerLeft}>
                        <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.navigate('notes')}}>
                            <Image style={styles.addSmallButton} source={require('../img/menu.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.nawbarTitle} numberOfLines={1}>{note.title}</Text>   
                    </View>
                    <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{pressHendler()}}>
                            <Image style={styles.addSmallButton} source={require('../img/edit.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{navigation.navigate('chat', {aNote:note})}}>
                            <Image style={styles.addSmallButton} source={require('../img/chat.png')}/>
                        </TouchableOpacity>
                    </View>
                 </View> 
                    <View style={{backgroundColor: `rgba(${note.color},0.2)`, 
                        maxWidth:'100%', 
                        flex:1,
                        justifyContent:'center',
                        alignItems:'flex-start'
                    }}>
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