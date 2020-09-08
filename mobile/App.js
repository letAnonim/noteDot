
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import io from 'socket.io-client';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      chatMessage:'',
      chatMessages:[]
    }
  }
  
  
  componentDidMount(){
    this.socket = io('http://192.168.88.166:3000');
    this.socket.on('chat message', msg=>{
      this.setState({chatMessages: [...this.state.chatMessages, msg]})
    })
  }

  submitChatMesage(){
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage:''})
  }
  
  render(){
  const ChatMessages = this.state.chatMessages.map(message=>{return(
    <Text style={{color:'white'}}key={Date.now()}>{message}</Text>)
  })
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.mainText}>Header text</Text>
          <TextInput
          style={styles.mainInput}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={()=> this.submitChatMesage()}
          onChangeText={chatMessage=>{
            this.setState({chatMessage})
          }}/>
        </View>
        {ChatMessages}
      </View>
    )
  } 
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'black'
  },
  mainText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  },
  mainInput:{
    height:40,
    borderColor:'white',
    borderWidth:2,
    color:'white',
    fontSize:17
  }
});

