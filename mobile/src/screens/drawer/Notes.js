import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
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
import {styles} from '../../styles';
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export default function Notes({route,navigation}){
    const { aUser } = route.params;
    const db = firestore().collection('users');
    const dbUser = db.doc(aUser.id).collection('notes')
    const [notes, setNotes] = useState([])
    async function addNote(title, color) {    
        await dbUser.add({
            title: title,
            color: color,
            text: '',
            connectedUsers:[aUser.id]
        });
    }
    const pressHandler=()=>{
        addNote(titleValue, colorValue );
        setTitleValue('')
    }
    const pressSearch = () =>{
        console.log(db.doc(aUse))
    }  
   
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [titleValue, setTitleValue] = useState('')
    const [colorValue, setColorValue] = useState('250, 228, 60');
    const [noteIdValue, setNoteIdValue] = useState('')

    useEffect(() => {
        return dbUser.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { title, color, text, connectedUsers} = doc.data();
            list.push({
              id: doc.id,
              title: doc.data().title,
              color: doc.data().color,
              text: doc.data(). text,
              connectedUsers: doc.data().connectedUsers
            });
        });
        setNotes(list)
        });
    }, []);
    const confirmAlert =(id)=>{
        Alert.alert(
            'This note will be deleted!!',
            'Are you sure?',
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () => dbUser.doc(id).delete()}
            ]
        )
    }
    return(
        <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
        <View style={styles.body}>
            {/*////////////////////////////////modalCreate//////////////////////////////////////*/}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalCreateVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Pleace choose the note name:</Text>
                        <TextInput style={styles.input} 
                            placeholder='Write here...'
                            onChangeText={setTitleValue}
                            value={titleValue}
                        />
                        <Text style={styles.modalText}>Pleace choose the note color:</Text> 
                        <View style={styles.modalRadioContainer}>
                            <RadioButton.Group onValueChange={colorValue => setColorValue(colorValue)} value={colorValue}>
                                <View style={styles.modalRadioRow}>
                                    <RadioButton color='#FFD64E' value='250, 228, 60' />
                                    <Text style={styles.modalRadioText}><Text style={{color:'#FFD64E'}}>yellow</Text></Text>
                                </View>
                                <View style={styles.modalRadioRow}>
                                    <RadioButton color='red' value='230, 45, 12' />
                                    <Text style={styles.modalRadioText}><Text style={{color:'red'}}>red</Text></Text>
                                </View>
                                <View style={styles.modalRadioRow}>
                                    <RadioButton color='green' value='110, 212, 51' />
                                    <Text style={styles.modalRadioText}><Text style={{color:'green'}}>green</Text></Text>
                                </View>
                                <View style={styles.modalRadioRow}>
                                    <RadioButton color='blue' value='28, 112, 230'/>
                                    <Text style={styles.modalRadioText}><Text style={{color:'blue'}}>blue</Text></Text>
                                </View>
                                <View style={styles.modalRadioRow}>
                                    <RadioButton color='purple' value='191, 76, 217' />
                                    <Text style={styles.modalRadioText}><Text style={{color:'purple'}}>purple</Text></Text>
                                </View>   
                                <View style={styles.modalRadioRow}>
                                    <RadioButton color='black' value='0, 0, 0'/>
                                    <Text style={styles.modalRadioText}><Text style={{color:'black'}}>black</Text></Text>
                                </View>
                            </RadioButton.Group>     
                        </View>
                        <TouchableHighlight
                            style={styles.openButton}
                            onPress={() => {
                                (!titleValue)?(Alert.alert('Pleace write the title!!')
                                ):(pressHandler(), setModalCreateVisible(!modalCreateVisible))
                                }}>  
                            <Text style={styles.textStyle}>Create note!</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.closeButton}
                            onPress={() => {
                                setModalCreateVisible(!modalCreateVisible)}}>  
                            <Text style={styles.textStyle}>close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            {/*///////////////////////////////modalCreate//////////////////////////////////////*/}
            {/*////////////////////////////////modalSearch//////////////////////////////////////*/}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalSearchVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Pleace write the note id:</Text>
                        <TextInput style={styles.input} 
                            placeholder='Write here...'
                            onChangeText={setNoteIdValue}
                            value={noteIdValue}
                        />
                        <View style={styles.modalRadioContainer}>    
                        </View>
                        <TouchableHighlight
                            style={styles.openButton}
                            onPress={() => {
                                pressSearch()
                                // (!noteIdValue)?(Alert.alert('Pleace write the id!!')
                                // ):(pressSearch(),setModalSearchVisible(!modalCreateVisible))
                                }}>  
                            <Text style={styles.textStyle}>Connect to note!</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.closeButton}
                            onPress={() => {
                                setModalSearchVisible(!modalSearchVisible)}}>  
                            <Text style={styles.textStyle}>close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            {/*///////////////////////////////modalSearch//////////////////////////////////////*/}
            <View style ={styles.section1}>
                <View style={styles.nawbarContainer}>
                    <View style={styles.nawbarContainerLeft}>
                        <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.openDrawer()}}>
                            <Image style={styles.addSmallButton} source={require('../../img/menu.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.nawbarTitle}>Notes.dot</Text>   
                    </View>
                    <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>setModalCreateVisible(!modalCreateVisible)}>
                            <Image style={styles.addSmallButton} source={require('../../img/add.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>setModalSearchVisible(!modalSearchVisible)}>
                            <Image style={styles.addSmallButton} source={require('../../img/search.png')}/>
                        </TouchableOpacity>
                    </View>
                 </View> 
                {/* <View style={styles.section1__input}>
                    <TextInput style={styles.input} 
                        placeholder='search note...'        
                    />
                </View> */}
                {/* <View style={styles.section1__button}>
                    <Button title='create' color="orange" onPress={()=>{
                        setModalCreateVisible(!modalCreateVisible)
                    }}/>
                </View>  */}
            </View>
            <View style={styles.section2}>
                {(notes[0] !== undefined)?(<ScrollView>{notes.map(note=>{
                    return ( 
                        <View key={note.id}>
                            <TouchableOpacity  onPress={()=>{navigation.navigate('note', {aNote: note, User:aUser,})}} style={styles.noteListContaiter}>
                                <View style={{flex:1,backgroundColor:`rgba(${note.color}, 0.5)`, 
                                borderLeftWidth:12, 
                                borderLeftColor:`rgba(${note.color}, 1)`
                            }}>
                                    <View style={styles.noteInfoRow}>
                                        <View style={{flex:1}}>
                                            <Text   style={{margin:3,fontSize:18}}><Text style={{fontSize:19,fontWeight:'bold'}}>Title:</Text> {note.title}</Text>
                                            <Text>text:{note.text}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.deleteButtonRow}>
                                        <TouchableOpacity onPress={()=>{
                                            confirmAlert(note.id)
                                        }}><Image style={styles.deleteSmallButton} source={require('../../img/delete.png')} /></TouchableOpacity>
                                    </View>                     
                                </View>
                            </TouchableOpacity>
                        </View>    
                    )
                    })}</ScrollView>):(
                    <View style={styles.addnoteBigButtonContainer}>
                        <TouchableOpacity  onPress={()=>setModalCreateVisible(true)}>
                            <Image style={styles.addBigButton} source={require('../../img/add.png')}/>
                        </TouchableOpacity>
                    </View>
                )}             
            </View>
        </View>
    </ImageBackground>
    )      
}

