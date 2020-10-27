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
    Modal,
    TouchableHighlight
} from 'react-native';
import {styles} from '../styles'
import '../img/paperBackground.png'
// import { TextInput } from 'react-native-paper';


export default function Note({route, navigation}){
    const { aNote } = route.params;
    const { User } = route.params;
    const { socket } = route.params;
    const[modalUsersVisible, setModalUsersVisible]=useState(false)
    const [note, setNote] = useState(aNote)
    const [text, setText] = useState(`${note.text}`)
    const [conUsers, setConUsers] = useState([User])
    
    
    function addNoteText(text) {
        socket.emit('saveNoteText', text, note._id)
        
    }
    const pressHendler=()=>{
        addNoteText(text);
        setText(text);
    }
    useEffect(() => {
        socket.emit('getNote', note._id);
        socket.on('aNote', data=>{  
            // console.log(data);
            
            setNote(data)
        })
    }, [note]);
    return(
        <View style={styles.mainNoteContainer}>
        {/*////////////////////////////////modalUsers//////////////////////////////////////*/}
            <Modal animationType='slide'
                transparent={true}
                visible={modalUsersVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Users:</Text> 
                       <View>
                            {conUsers.map(user=>{
                            return(<View key={user.name} style={{flexDirection:'row'}}>
                                <Text>Name:{user.name}, </Text>
                                <Text>Age:{user.age}</Text>
                            </View>)
                            })}
                       </View>
                        <TouchableHighlight
                            style={styles.closeButton}
                            onPress={() => {
                                setModalUsersVisible(!modalUsersVisible)}}>  
                            <Text style={styles.textStyle}>close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            {/*///////////////////////////////modalUsers//////////////////////////////////////*/}
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
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{setModalUsersVisible(!modalUsersVisible)}}>
                            <Image style={styles.addSmallButton} source={require('../img/users.png')}/>
                        </TouchableOpacity><TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{pressHendler()}}>
                            <Image style={styles.addSmallButton} source={require('../img/edit.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{navigation.navigate('chat', {aNote:note, aUser:User, Asocket: socket})}}>
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