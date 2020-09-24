
// import React, { Component , useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
// } from 'react-native';
// import socketIO from 'socket.io-client';


// export default class App extends Component{
//   state= {
//     isLoadingComplete:false,
//   };
//   // //delete todo function

//   // const deleteTodo = async id => {
//   //   try {
//   //     const deleteTodo = await fetch(`http://localhost:6000/todos/${id}`, {
//   //       method: "DELETE"
//   //     });

//   //     setTodos(todos.filter(todo => todo.todo_id !== id));
//   //   } catch (err) {
//   //     console.error(err.message);
//   //   }
//   // };

//   componentDidMount(){ 
//     const socket = socketIO('http://192.168.1.102:6666', {      
//     transports: ['websocket'], jsonp: false });   
//     socket.connect();  
//   }
//   render(){
//     return (
//       <View style={styles.mainContainer}>
//         <View>
//           <Text style={styles.mainText}>Header text</Text>
//           <TextInput
//           style={styles.mainInput}
//           autoCorrect={false}
//           // value={this.state.chatMessage}
//           // onSubmitEditing={()=> this.submitChatMesage()}
//           // onChangeText={chatMessage=>{
//           //   this.setState({chatMessage})
//           // }}
        
//           />
//         </View>
//       </View>
//     )
//   }
// };

// const styles = StyleSheet.create({
//   mainContainer:{
//     flex:1,
//     backgroundColor:'black'
//   },
//   mainText:{
//     color:'white',
//     fontSize:20,
//     fontWeight:'bold'
//   },
//   mainInput:{
//     height:40,
//     borderColor:'white',
//     borderWidth:2,
//     color:'white',
//     fontSize:17
//   }
// });

