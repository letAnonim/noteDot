
import React, { Component , useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);

  // //delete todo function

  // const deleteTodo = async id => {
  //   try {
  //     const deleteTodo = await fetch(`http://localhost:6000/todos/${id}`, {
  //       method: "DELETE"
  //     });

  //     setTodos(todos.filter(todo => todo.todo_id !== id));
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const getUsers = async () => {
    try {
      const response = await fetch("http://192.168.1.102:6666/users");
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mainText}>Header text</Text>
        <TextInput
        style={styles.mainInput}
        autoCorrect={false}
        // value={this.state.chatMessage}
        // onSubmitEditing={()=> this.submitChatMesage()}
        // onChangeText={chatMessage=>{
        //   this.setState({chatMessage})
        // }}
      
        />
      </View>
    </View>
  )

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

