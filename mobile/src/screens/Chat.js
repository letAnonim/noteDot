import React, { useState } from 'react';
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
    function addMessage(text, author) {    
        Asocket.emit('Message', {
            text: text,
            author:author
        })
        messages.push({
            text:text,
            author:author
        })
    }
    const pressHandler=()=>{
        addMessage(messageValue, aUser.name);
        setMessageValue('')
    }
    
    return(
        <ImageBackground source={require('../img/paperBackground.png')} style={styles.image, {flex:1, flexDirection:'column'}}>
            <View style={{backgroundColor:`rgba(${aNote.color}, 1)`, 
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
                {(messages[0] !== undefined)?(<ScrollView>{messages.map(mes=>{
                    return ( 
                        <View key={mes._id}>
                            <TouchableOpacity  onPress={()=>{}}>
                                <View style={{flex:1,backgroundColor:'#f5ff99', 
                                }}>
                                    <Text>{mes.text}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>    
                    )
                    })}</ScrollView>):(
                    <View style={styles.addnoteBigButtonContainer}>
                        <TouchableOpacity  onPress={()=>{}}>
                            <Image style={styles.addBigButton} source={require('../img/add.png')}/>
                        </TouchableOpacity>
                    </View>
                )} 
            </View>
            <View style={styles.chatInputContainer}>
                <TextInput style={styles.messageInput}
                            allowFontScaling={false}
                            autoCapitalize='none'
                            autoCorrect={false}  
                            value={messageValue}
                            placeholder='Type message here...'
                            onChangeText={setMessageValue}
                ></TextInput>
                <TouchableOpacity  style={{flex:1, alignItems:'flex-end'}}onPress={()=>{pressHandler()}}>
                    <Image style={styles.sendSmallButton} source={require('../img/upload.png')}/>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        
    )      
}