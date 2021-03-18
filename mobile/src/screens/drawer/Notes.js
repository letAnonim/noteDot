import 'react-native-gesture-handler';
import React, { useState, useEffect} from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Modal,
    Text,
    Alert, 
    ImageBackground, 
}from 'react-native';
import {RadioButton} from 'react-native-paper'
import {MainColour,lightIconColor, styles} from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch, useSelector, connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getNotes, addNote, deleteNote, findNote, updateNoteList} from '../../redux/actions/notes.actions'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from "react-native-flash-message";
import Spinner from 'react-native-spinkit'
// import { NetworkInfo } from "react-native-network-info";

const Notes = (props) => {
    const dispatch = useDispatch();
    // console.log(props);
    const resNotes = useSelector(state => state.notes);
    const getNotesStatus = state => state.notes.status;
    const resUserNotes = createSelector(
        state => state, 
        items=>{
            return(items)
        }
    ) 
    // const noteStatus = createSelector(
    //     [getNotesStatus], item=>{
    //         return(item),
    //         console.log(item)
    //     }
    // ) 
    const [notes, setNotes] = useState(props.notes.notes);
    // console.log(notes)
    const { UserId } = props.route.params;
    useEffect(() => {
        // resUserNotes();
        if(props.status ==='inactive'){dispatch(getNotes(UserId))} 
        else if(props.status==='deleteNoteSucceeded'||props.status==='addNoteSucceeded'||props.status==='findNoteSucceeded'){dispatch(updateNoteList(UserId))} 
        else if(props.status ==='gettingNotes'){setIsLoading(!isLoading)} 
        else if(props.status ==='getNoteSucceeded'){setNotes(props.notes.notes), setIsLoading(false)}
        else if(props.status ==='updateNoteListSucceeded'){setNotes(resUserNotes.notes)}
        else if(props.status === 'updatingNoteText'){}
        else if(props.status ==='findNoteFailed'){
            showMessage({
                floating: true,
                icon:'warning',
                message: "Incorrect invite link!!!",
                type: 'danger',
                color:'#FFFFFF',
            });}
            // noteStatus();
        // console.log(noteStatus)
    },[props.notes.status]);   
    // navigation.navigate('qrscanner')
    // }, [notes]);
    // setNotes(resNotes.notes);
    async function addOneNote(title, color) {   
        await dispatch(addNote({
            title: title,
            color: color,
            owner: UserId,
            text: '',
            connectedUsers: [UserId],
        }))
        // await dispatch(getNotes(UserId)); 
    }
    const pressHandler=()=>{
        addOneNote(titleValue, colorValue );
        setTitleValue('')
    }
    const pressSearch = () =>{
        dispatch(findNote(UserId, noteIdValue))
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
        
    const confirmAlert =id=>{
        Alert.alert(
            'This note will be deleted!!',
            'Are you sure?',
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () =>{
                    dispatch(deleteNote(UserId, id))
                    showMessage({
                        floating: true,
                        icon:'success',
                        message: "Note deleted successfully",
                        type: 'success',
                        color:'#FFFFFF', // text color
                      });
                }}
            ]
        )
    }
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [colorValue, setColorValue] = useState('250, 228, 60');
    const [noteIdValue, setNoteIdValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    return(
        <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
            <View style={styles.body}>
            {/*////////////////////////////////modalCreate//////////////////////////////////////*/}
            <Modal
                animationType='fade'
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
                        <TouchableOpacity
                            style={styles.smallDefaultButton}
                            onPress={() => {
                                (!titleValue)?(Alert.alert('Pleace write the title!!')
                                ):(pressHandler(), setModalCreateVisible(!modalCreateVisible), setColorValue('250, 228, 60'))
                                }}>  
                            <Text style={styles.textStyle}>Create note!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.SmallCloseButton}
                            onPress={() => {
                                setModalCreateVisible(!modalCreateVisible)
                                setColorValue('250, 228, 60')}}>  
                            <Text style={styles.textStyle}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*////////////////////////////////modalCreate//////////////////////////////////////*/}
            {/*////////////////////////////////modalSearch//////////////////////////////////////*/}
            <Modal
                animationType='fade'
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
                        <TouchableOpacity
                            style={styles.smallDefaultButton}
                            onPress={() => {
                                (!noteIdValue)?(Alert.alert('Pleace write the id!!')
                                ):(pressSearch(),setModalSearchVisible(!modalSearchVisible))
                                }}>  
                            <Text style={styles.textStyle}>Connect to note!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.SmallCloseButton}
                            onPress={() => {
                                setModalSearchVisible(!modalSearchVisible)}}>  
                            <Text style={styles.textStyle}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*////////////////////////////////modalSearch//////////////////////////////////////*/}
            <View style ={styles.section1}>
                <View style={styles.nawbarContainer}>
                    <View style={styles.nawbarContainerLeft}>
                        <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{props.navigation.openDrawer()}}>
                            <Icon name="align-justify" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                        <Text style={styles.nawbarTitle}>Notes.dot</Text>
                    </View>
                    <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{props.navigation.navigate('qrscanner', {userId: UserId})}}>
                            <Icon1 name="qrcode-scan" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>setModalSearchVisible(!modalSearchVisible)}>
                            <Icon name="search-plus" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>
                            setModalCreateVisible(!modalCreateVisible)
                            }>
                            <Icon name="plus" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                    </View>
                 </View> 
            </View>
            <View style={styles.section2}>
            
                {(isLoading===true)?(<Spinner style={{flex:1, alignSelf:'center', justifyContent:'center'}} isVisible={isLoading} size={80} type='Wave' color='white'/>):(notes[0] !== undefined||notes !== undefined)?(
                    <ScrollView>{notes.map(note=>{
                    return (
                        <View key={note._id}>
                            <TouchableOpacity  onPress={()=>{props.navigation.navigate('note', {aNote: note})}} style={styles.noteListContaiter}>
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
                                                {(UserId == note.owner)?(<TouchableOpacity onPress={()=>{
                                                    confirmAlert(note._id)
                                                }}>
                                                    <Icon name="remove" color={lightIconColor} size={35} style={{margin: 7}}/>
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
                            <Icon name="plus" color='white' size={120}/>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    </ImageBackground>
    )
}

const mapStateToProps = (state)=>({notes:state.notes, status:state.notes.status})

const mapDispatchToProps = (dispatch) => ({getNotes:(data)=>dispatch(getNotes('602e923c548d904a68f5b010'))})

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Notes)
