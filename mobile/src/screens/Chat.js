import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image, 
  TextInput, 
  ScrollView

} from 'react-native';
import {styles} from '../styles'


export default function Chat({route, navigation}){
    const { aNote } = route.params;
    const { aUser } = route.params;
    const { Asocket } = route.params;
    const [messageValue, setMessageValue] = useState('')
    const [messages, setMessages] = useState([])
    Asocket.on('ToNote', mes=>{
        
    })
    useEffect(() => {
        Asocket.emit('getMessages', aNote._id);
        Asocket.on('messages', data=>{  
            setMessages(data)
        })
    }, [messages]);
     async function addMessage(text, author) {    
        await Asocket.emit('addMessage', {
            text: text,
            author:author,
            port:aNote._id
        })
        messages.push({
            text:text,
            author:author,
            port:aNote._id
        })
    }
    const pressHandler=()=>{
        addMessage(messageValue, aUser._id);
        setMessageValue('')
    }
    const scrollViewRef = useRef();
    const returnDate = timestamp =>{
        let date = new Date(timestamp)
        let now = new Date()
        let minutes = date.getMinutes();
        let hours = date.getHours();
        // let day = date.getDay();
        // let month = date.getMonth();
        // let year = date.getFullYear()

        let returnHours = (hours<10)?(`0${hours}:`):(`${hours}:`)
        let returnMinutes = (minutes<10)?(`0${minutes}`):(minutes)
        return returnHours + returnMinutes
        // if(day == now.getDay()&&month == now.getMonth()&&year==now.getFullYear()){
        //     return returnHours+returnMinutes
        // }
        // else{
        //     let returnDay = (day<10)?(`0${day}/`):(`${day}/${year}`)
        //     let returnMonth = (month<10)?(`0${month}/${year}`):(`${month}/${year}`);
        //     return returnDay+returnMonth+' at '+returnHours+returnMinutes
        // } 
    }
    return(
        <ImageBackground source={require('../img/paperBackground.png')} style={styles.image}>
            <View style={{
                backgroundColor:`rgba(${aNote.color}, 1)`, 
                height:50,
                flexDirection:'row'}}>
                <View style={styles.nawbarContainerLeft}>
                    <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{navigation.navigate('note')}}>
                        <Image style={styles.addSmallButton} source={require('../img/menu.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.nawbarTitle}>Chat</Text>   
                </View>
                {/* <View style={styles.nawbarContainerRight}>
                    <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{pressHendler()}}>
                        <Image style={styles.addSmallButton} source={require('../img/edit.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtonContainer} onPress={()=>{navigation.navigate('chat')}}>
                        <Image style={styles.addSmallButton} source={require('../img/chat.png')}/>
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={styles.chatMessagesContainer}>
                {(messages[0] !== undefined)?(<ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {messages.map(mes=>{
                    return ( 
                        <View key={Math.random()} style={{flex:1}}>
                            {(mes.author==aUser._id)?(<TouchableOpacity  onPress={()=>{}}>
                                <View style={styles.messageOvner}>
                                    <Text style={{fontSize:25, }}>{mes.text}</Text>
                                    <Text style={{flex:1,alignSelf:'flex-end', fontSize:10}}>{returnDate(mes.updatedAt)}</Text>
                                </View>
                                
                            </TouchableOpacity>):(<TouchableOpacity  onPress={()=>{}}>
                                <View style={styles.messageSender}>
                                    <Text style={{fontSize:25, }}>{mes.text}</Text>
                                    <Text style={{flex:1,fontSize:10}}>{returnDate(mes.updatedAt)}</Text>
                                </View>
                                
                            </TouchableOpacity>   
                            )}
                        </View>    
                    )
                    })}</ScrollView>):(
                    <View style={styles.addnoteBigButtonContainer}>
                        <Image style={styles.addBigButton} source={require('../img/chat.png')}/>
                        <Text>No messages here yet...</Text>
                    </View>
                )} 
            </View>
            <View style={{
                flex:1,
                alignItems:'flex-start',
                // justifyContent:'center',
                flexDirection:'row',
                maxHeight: 60,
                maxWidth: "100%",
                backgroundColor: `rgba(${aNote.color}, 1)`}}>
                <TextInput style={styles.messageInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false}  
                            value={messageValue}
                            placeholder='Type message here...'
                            onChangeText={setMessageValue}
                ></TextInput>
                <TouchableOpacity  style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}onPress={()=>{pressHandler()}}>
                    <Image style={styles.sendSmallButton} source={require('../img/upload.png')}/>
                </TouchableOpacity>
            </View>
        </ImageBackground> 
    )      
}