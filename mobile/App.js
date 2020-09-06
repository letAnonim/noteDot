
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
      chatMessage:''
    }
  }
  
  
  componentDidMount(){
    const socket = io('http://192.168.1.1:3000')
  }
  
  render(){
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

