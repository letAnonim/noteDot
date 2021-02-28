import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {Clipboard} from '@react-native-community/clipboard';
// import usersModel from '../../../backend/models/users.model';
import {styles} from '../styles';
import {lightIconColor} from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';


export default function Chat({route, navigation}) {
  const {aNote} = route.params;
  const {aUser} = route.params;
  // const {Asocket} = route.params;
  const [messageValue, setMessageValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalUsersVisible, setModalUsersVisible] = useState(false);
  const [modalQRVisible, setModalQRVisible] = useState(false);
  const [conUsers, setConUsers] = useState([]);

  useEffect(() => {
    // Asocket.emit('getMessages', aNote._id);
    // Asocket.on('messages', (data) => {
    //   setMessages(data);
    // });
  }, [messages]);
  async function addMessage(text) {
    // await Asocket.emit('addMessage', {
    //   text: text,
    //   author: aUser._id,
    //   authorName: aUser.name,
    //   port: aNote._id,
    // });
    // messages.push({
    //   text: text,
    //   author: aUser._id,
    //   authorName: aUser.name,
    //   port: aNote._id,
    // });
  }
  const copyToClipboard = () => {
    Clipboard.setString(aNote._id);
  };
  const pressHandler = () => {
    addMessage(messageValue);
    setMessageValue('');
  };
  const scrollViewRef = useRef();
  const returnDate = (timestamp) => {
    let date = new Date(timestamp);
    let now = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let returnHours = hours < 10 ? `0${hours}:` : `${hours}:`;
    let returnMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // return returnHours + returnMinutes
    if (
      day == now.getDay() &&
      month == now.getMonth() &&
      year == now.getFullYear()
    ) {
      return returnHours + returnMinutes;
    } else {
      let returnDay = day < 10 ? `0${day}/` : `${day}/${year}`;
      let returnMonth = month < 10 ? `0${month}/${year}` : `${month}/${year}`;
      return returnDay + returnMonth + ' at ' + returnHours + returnMinutes;
    }
  };
  return (
    <ImageBackground
      source={require('../img/paperBackground.png')}
      style={styles.image}>
      {/*////////////////////////////////modalUsers//////////////////////////////////////*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalUsersVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           { (conUsers>1)?(
            <View>
              <Text style={styles.modalText}>Users:</Text>
              <View>
                {conUsers.map((user) => {
                  return (
                    <View key={user._id} style={{flexDirection: 'row'}}>
                      <Text>Name:{user.name} </Text>
                      <Text>Age:{user.age}</Text>
                    </View>
                  );
                })}
              </View>
            </View>):(
            <View>
              <Text style={styles.modalText}>No users here yet...</Text>
            </View> )}
            <TouchableHighlight style={styles.smallDefaultButton} onPress={copyToClipboard}>
              <Text style={styles.textStyle}>Copy invite link</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.smallDefaultButton} onPress={()=>{setModalUsersVisible(!modalUsersVisible);setModalQRVisible(!modalQRVisible)}}>
              <Text style={styles.textStyle}>Generate invite QR code</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.SmallCloseButton} onPress={()=>setModalUsersVisible(!modalUsersVisible)}>
              <Text style={styles.textStyle}>close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {/*///////////////////////////////modalUsers//////////////////////////////////////*/}
      {/*///////////////////////////////ModalQRcode/////////////////////////////////////*/}
      <Modal animationType="fade" transparent={true} visible={modalQRVisible}>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <QRCode
                value={aNote._id}
                size={200}
                enableLinearGradient={true}
                linearGradient={['#FFBA51','grey']}

                // logoSize={30}
                // logoBackgroundColor='transparent'
                />
              <TouchableHighlight style={styles.SmallCloseButton} onPress={()=>setModalQRVisible(!modalQRVisible)}>
                <Text style={styles.textStyle}>close</Text>
            </TouchableHighlight>
          </View>
        </View>      
      </Modal>
      {/*///////////////////////////////ModalQRcode/////////////////////////////////////*/}
      <View
        style={{backgroundColor: `rgba(${aNote.color}, 1)`,height: 50,flexDirection: 'row'}}>
        <View style={styles.nawbarContainerLeft}>
          <TouchableOpacity
            style={styles.smallButtonContainer}
            onPress={() => {navigation.navigate('note')}}>
            <Icon name="align-justify" color={lightIconColor} size={35} style={{margin: 7}}/>
          </TouchableOpacity>
          <Text style={styles.nawbarTitle}>Chat</Text>
        </View>
        <View style={styles.nawbarContainerRight}>
          <TouchableOpacity
            style={styles.smallButtonContainer}
            onPress={() => {
              setModalUsersVisible(!modalUsersVisible);
              // Asocket.emit('getConnectedUsers', aNote.connectedUsers);
              // Asocket.on('conUsers', (data) => {
              //   setConUsers(data);
              // });
            }}>
            <Icon name="users" color={lightIconColor} size={35} style={{margin: 7}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chatMessagesContainer}>
        {messages[0] !== undefined ? (
          <ScrollView ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
            {messages.map((mes) => {
              return (
                <View key={Math.random()} style={{flex: 1}}>
                  {mes.author == aUser._id ? (
                    <TouchableOpacity onPress={() => {}}>
                      <View style={styles.messageOvner}>
                        <Text style={{fontSize: 20}}>{mes.text}</Text>
                        <Text style={{flex: 1,alignSelf: 'flex-end',fontSize: 10,}}>
                          {returnDate(mes.updatedAt)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ):(<TouchableOpacity onPress={() => {}}>
                      <View style={styles.messageSender}>
                        <Text
                          style={{flex: 1,alignSelf: 'flex-start',fontSize: 13,}}>
                          {mes.authorName}
                        </Text>
                        <Text style={{fontSize: 20}}>{mes.text}</Text>
                        <Text style={{flex: 1, fontSize: 10}}>
                          {returnDate(mes.updatedAt)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </ScrollView>):(
          <View style={styles.addnoteBigButtonContainer}>
            <Icon1 name="message-circle" color='white' size={100}/>
            <Text>No messages here yet...</Text>
          </View>
        )}
      </View>
      <View
        style={{flex: 1,
          alignItems: 'flex-start',
          // justifyContent:'center',
          flexDirection: 'row',
          maxHeight: 50,
          maxWidth: '100%',
          backgroundColor: `rgba(${aNote.color}, 1)`,
        }}>
        <TextInput
          style={styles.messageInput}
          allowFontScaling={false}
          autoCapitalize="none"
          autoCorrect={false}
          value={messageValue}
          placeholder="Type message here..."
          onChangeText={setMessageValue}></TextInput>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}
          onPress={() => {
            pressHandler();
          }}>
          <Icon name="send" color={lightIconColor} size={25} style={{marginRight: 12, marginTop:5}}/>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
