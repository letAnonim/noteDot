import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
    TextInput,
    View,
    Text,
    ImageBackground, 
    TouchableOpacity,
    Modal,
    Animated
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {styles} from '../styles'
import '../img/paperBackground.png'
import {useDispatch, connect} from 'react-redux';
import {updateNoteText, setDefaultNote, updateNoteParams} from '../redux/actions/note.actions';
import {lightIconColor} from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import {showMessage} from "react-native-flash-message";
import { updateNoteList } from '../redux/actions/notes.actions';

const Note = (props) => {
    const dispatch = useDispatch();
    const { aNote } = props.route.params;
    const [note, setNote] = useState(aNote)
    const [text, setText] = useState(`${note.text}`)
    const [user, setUser] = useState();
    const [rotVal, setRotVal]=useState(0);
    const rot = useRef(new Animated.Value(rotVal)).current;
    const squize = useRef(new Animated.Value(0)).current;
    const [titleValue, setTitleValue] = useState(note.title);
    const [colorValue, setColorValue] = useState(note.color);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    
    useEffect(() => {
        Animated.timing(rot, {
            toValue: rotVal,
            duration: 400,
            useNativeDriver: true,
        }).start();
    },[rotVal]);

    const squizeAnim = () => {
        Animated.sequence([
            Animated.timing(squize, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(squize, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }
        

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
    const pressHendler = ()=>{
        dispatch(updateNoteText({type:"text", textValue:text, noteId:aNote._id}));
        squizeAnim()
    }
    const editNoteParams = () => {
        if(titleValue === note.title && colorValue === note.color){
            setModalEditVisible(!modalEditVisible);
            showMessage({
                position: 'bottom',
                floating: true,
                icon:'warning',
                type: 'warning',
                message: "Nothing changed!",
                color:'#FFFFFF',
            })
            setRotVal(0)
        }
        else if(titleValue&&colorValue){
            setModalEditVisible(!modalEditVisible); 
            dispatch(updateNoteParams({type:"params", title:titleValue, color:colorValue,  noteId:note._id}))
            setRotVal(0)
        }
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
        if(props.status ==='updateNoteTextSucceeded'){
            showMessage({
                position: 'bottom',
                floating: true,
                icon:'success',
                message: "Saved!",
                type: 'success',
                color:'#FFFFFF',
            });
            console.log(props.note.note.text);
            dispatch(updateNoteList(props.note.note.owner))
            setText(props.note.note.text)
        };
        if(props.status ==='updateNotePropertiesSucceeded'){
            showMessage({
                position: 'bottom',
                floating: true,
                icon:'success',
                message: "Note updated!",
                type: 'success',
                color:'#FFFFFF',
            });
            dispatch(updateNoteList(props.note.note.owner))
            setNote(props.note.note)
        }
        else if(props.status ==='updateNoteTextFailed'||props.status === 'updateNotePropertiesFailed'){
            showMessage({
                position: 'bottom',
                floating: true,
                icon:'warning',
                message: "Failed to update",
                type: 'danger',
                color:'#FFFFFF',
            })}

    }, [props.status]);

    const rotation = rot.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '315deg'],
    });

    const squizeX = squize.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const squizeY = squize.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.3],
    });

    return(
        <View style={styles.mainNoteContainer}>
            <ImageBackground source={require('../img/paperBackground.png')} style={styles.image}>
                {/* ////////////////////////////////modalCreate//////////////////////////////////////*/}
                <Modal
                    transparent={true}
                    visible={modalEditVisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>New note title:</Text>
                            <TextInput style={styles.input} 
                                placeholder='Write here...'
                                onChangeText={setTitleValue}
                                value={titleValue}
                            />
                            <Text style={styles.modalText}>New note color:</Text> 
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
                                onPress={editNoteParams}>  
                                <Text style={styles.textStyle}>edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.SmallCloseButton}
                                onPress={() => {
                                    setModalEditVisible(!modalEditVisible);
                                    setRotVal(0)
                                }}>  
                                <Text style={styles.textStyle}>close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/*////////////////////////////////modalCreate////////////////////////////////////// */}
                <View style={{backgroundColor:`rgba(${note.color}, 1)`, height:50,flexDirection:'row'}}>
                    <View style={styles.nawbarContainerLeft}>
                        <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{
                                props.navigation.navigate('notes');
                                dispatch(setDefaultNote())
                            }}>
                            <Icon name="list" color={lightIconColor} size={35} style={{margin: 7}}/>
                        </TouchableOpacity>
                        <Text style={styles.nawbarTitle} numberOfLines={1}>{note.title}</Text>   
                    </View>
                    <View style={styles.nawbarContainerRight}>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{setModalEditVisible(!modalEditVisible); setRotVal(1)}}>
                            <Animated.View style={{transform: [{rotate: rotation}]}}>
                                <Icon name="gear" color={lightIconColor} size={35} style={{margin: 7}}/>
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={pressHendler}>
                            <Animated.View style={{transform:[{scaleX:squizeX},{scaleY:squizeY}]}}>
                                <Icon name="save" color={lightIconColor} size={35} style={{margin: 7}}/>
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{
                                props.navigation.navigate('chat', {aNote:note});
                                dispatch(setDefaultNote())
                            }}>
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

const mapStateToProps = (state)=>({note:state.note, status:state.note.status})

const connectComponent = connect(mapStateToProps);
export default connectComponent(Note)