import 'react-native-gesture-handler';
import React, { useState, useEffect} from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Modal,
    TouchableHighlight,
    Text,
    Alert, 
    ImageBackground
} from 'react-native';
import {RadioButton} from 'react-native-paper'
import {styles} from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux'
import {getNotes} from '../../redux/actions/notes.actions'
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import socketIOClient from 'socket.io-client';
// import io from 'socket.io-client'


export default function Notes({route,navigation}){
    // const socket = socketIOClient('http://192.168.1.105:6666', {      
        // transports: ['websocket'], jsonp: false });  
        const dispatch = useDispatch();
        const resNotes = useSelector(state => state.notes) 
        const { UserId } = route.params;
        console.log(resNotes.notes);
        const [notes, setNotes] = useState(resNotes.notes);

        useEffect(() => {
            dispatch(getNotes(UserId))
            setNotes(resNotes.notes)
        }, [notes]);
        // setNotes(resNotes.notes)
    function addNote(title, color) {   
        // Asocket.emit('addNote', {
        //     title: title,
        //     color: color,
        //     ovner: aUser._id,
        //     text: '',
        //     connectedUsers: [aUser._id],
        // })
        // Asocket.emit('getNotes', aUser._id);
        // Asocket.on('notes', data=>{  
            //     setNotes(data)
            // })
        }
        const pressHandler=()=>{
        addNote(titleValue, colorValue );
        setTitleValue('')
    }
    const pressSearch = () =>{
        // console.log(noteIdValue);
        // Asocket.emit('findNote', aUser._id, noteIdValue);
        // Asocket.on('ToNote',noteInfo=>{
        //     console.log(noteInfo)
        // })
        // let a = ['fgfg', 'fdgfdg']
        // let b = ['fgggggggggg', 'fdgfdg']
        // console.log([...a, 'dfdf']) 
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
   
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [colorValue, setColorValue] = useState('250, 228, 60');
    const [noteIdValue, setNoteIdValue] = useState('');
    const confirmAlert =id=>{
        Alert.alert(
            'This note will be deleted!!',
            'Are you sure?',
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () =>{
                    // Asocket.emit('deleteNote', id)
                    // Asocket.on('deleteResponse', message=>{
                    //     Asocket.emit('getNotes', aUser._id);
                    //     Asocket.on('notes', data=>{  
                    //         setNotes(data)
                    //     })
                    // })
                }}
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
                                (!noteIdValue)?(Alert.alert('Pleace write the id!!')
                                ):(pressSearch(),setModalSearchVisible(!modalSearchVisible))
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
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>setModalSearchVisible(!modalSearchVisible)}>
                            <Image style={styles.addSmallButton} source={require('../../img/search.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=> 
                            // dispatch(getNotes(UserId))
                            setModalCreateVisible(!modalCreateVisible)
                            }>
                            <Image style={styles.addSmallButton} source={require('../../img/add.png')}/>
                        </TouchableOpacity>
                    </View>
                 </View> 
            </View>
            <View style={styles.section2}>
                {(notes[0] !== undefined)?(<ScrollView>{notes.map(note=>{
                    return (
                        <View key={note._id}>
                            <TouchableOpacity  onPress={()=>{navigation.navigate('note', {aNote: note, User:aUser})}} style={styles.noteListContaiter}>
                                <View style={{flex:1,backgroundColor:`rgba(${note.color}, 0.5)`, 
                                    borderLeftWidth:12, 
                                    borderLeftColor:`rgba(${note.color}, 1)`
                                }}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, flexDirection:'column'}}>     
                                            <Text   style={{margin:3,fontSize:18, color:'black', width:180}}  numberOfLines={1}>
                                                <Text style={{fontSize:19,fontWeight:'bold',}}  numberOfLines={1}>Title:</Text> 
                                                {note.title}
                                            </Text>           
                                            <View style={{marginLeft:3, flex:1, flexDirection:'column'}}>
                                                <Text style={{fontSize:17, maxWidth:200}} numberOfLines={1}>Text:{note.text}</Text>
                                                <Text style={{fontSize:15, maxWidth:200}} numberOfLines={1}>Number of users:{note.connectedUsers.length} </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{flex:1, alignItems:'flex-end', marginRight:2}}>
                                                <Text style={{width:140}}>Last updated: {returnDate(note.updatedAt)}</Text>
                                            </View>
                                            <View style={styles.deleteButtonRow}>
                                                {(UserId == note.ovner)?(<TouchableOpacity onPress={()=>{
                                                    confirmAlert(note._id)
                                                }}>
                                                    <Image style={styles.deleteSmallButton} source={require('../../img/delete.png')} />
                                                </TouchableOpacity>):(<View/>)}
                                            </View>                     
                                        </View>
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

