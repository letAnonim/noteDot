import React from 'react'
import { StyleSheet  
  } from 'react-native';
export const styles = StyleSheet.create({
    body:{
      flex: 1
    },
    section1:{
      width: '100%'
    },
    nawbarContainer:{
      backgroundColor:'orange', 
      height:50,
      flexDirection:'row'
    },
    nawbarContainerLeft:{
      flex:1,
      flexDirection:'row', 

    },
    nawbarContainerRight:{
      flex:1,
      flexDirection:'row',
      justifyContent:'flex-end'
    },
    nawbarTitle:{
      fontSize:30,
      fontWeight:'bold',
      textShadowOffset:{
        width: 1,
        height: 3,
      },
      textShadowRadius:5,
      textShadowColor:'rgba(0,0,0,0.2)',
      color:'#E0E0E0',
      width:'80%'
    },
    section1__input:{
      width: '75%',
      height: 35,
      margin: 7
    },
    input:{
        borderWidth:2,
        borderRadius:7,
        borderColor:'orange',
        fontSize:20,
    },
    section1__button:{
      justifyContent:"center",
      margin: 7,
      flex: 1,
      height:30
    },
    
    mainContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
    },
    mainText:{
      color: 'white',
      fontSize: 24,
      fontWeight: '600',
    },
    higlightText:{
      fontWeight: 'bold',
      fontSize: 26,
      color: 'orange'
    },
    
    aboutText:{
      color: 'grey',
      fontSize: 18,
      fontWeight: '300',
    },
    addnoteBigButtonContainer:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
    },
    addBigButton:{
      width: 100,
      height: 100,
    },
    addSmallButton:{
      width: 35,
      height: 35,
      margin:6
    },
    deleteSmallButton:{
      height: 30,
      width:30,
    },
    noteInfoRow:{
      flex:1,
      flexDirection:'row',
    },
    deleteButtonRow:{
      flex:1,
      flexDirection: 'row',
      justifyContent:'flex-end',
      alignItems:'center'
    },
    ///modal styles///
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 4,
      padding: 50,      
      shadowColor: "#000",
      // shadowOffset: {
      //   width: 10,
      //   height: 1
      // },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 5
    },
    modalRadioContainer:{
      flexDirection: 'row'
    },
    modalRadioRow:{
      height:100,
      alignItems:'center',
    },
    modalRadioText:{
      flexDirection:'row',
      transform: [{ rotate: '90deg'}],
      alignItems:'flex-start',
      textTransform: "uppercase",
      marginTop: 10,
      fontSize: 14,
      fontWeight:'bold',
    },

    openButton: {
      backgroundColor: 'orange',
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      margin: 10
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginTop: 10,
      marginBottom: 0,
      textAlign: "center",
      fontSize: 18
    },
    closeButton:{
      backgroundColor: 'red',
      borderRadius: 5,
      padding: 5,
      elevation: 2,
      margin: 10
    },
    section2:{
      flex:1,
    },
    noteListContaiter:{
      height: 80,
      width: '97%',
      margin: 2,
      marginLeft:5
    },
    mainNoteContainer:{
      flex: 1,
    //  alignItems: 'center',
    //  flexDirection: 'column',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      height: '100%',
      width:'100%'
    },
    authContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    logInContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    logText:{
      fontSize: 20,
      alignContent:'center'
    },

    rowText:{
      fontSize:16,
    },
    logRow:{
    },
    rowInput:{
      flex:1,
      maxHeight: 50,
      backgroundColor:'rgba(255,255,255, 0.5)',
      minWidth:'97%',
      alignItems:'flex-start',
      borderColor:'orange',
      borderLeftWidth:8,
      fontSize:20,
      padding:2,
      paddingLeft:10
    },
    regText:{
      fontSize:20,
   },
    authTextContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      maxHeight:100
    },
    textInputContainer:{ 
      height:10,
      fontSize:19,
      flex:1, 
      textAlignVertical: 'top',
    },
    smallButton:{
      height:30,
      width:50,
    },
    
    drawerMainContainer:{
      flex:1,
      // alignItems:'flex-start'
    },
    closeDrawerContainer:{
      flex:1,
      alignItems:'flex-end'
    },
    naviContainer:{
      flex:1,
      flexDirection:'row'
    },
    profileLogo:{
      height:40,
      width:40,
    },
    chatMessagesContainer:{
      flex:1,
      maxWidth:'100%',
      // flexDirection:'column-reverse',
      // alignItems:'flex-end'
      
    },
    messageInput:{
      flex:1,
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      backgroundColor:'rgba(255,255,255, 0.5)',
      minWidth:'80%',
      alignItems:'flex-start',
      borderColor:'orange',
      borderLeftWidth:8,
      fontSize:20,
      padding:2,
      paddingLeft:10,
      margin: 5,
      height:45
    },
    sendSmallButton:{
      maxHeight:30,
      maxWidth:30,
      margin:8,
      marginRight:3
    },
    talkBubble: {
      backgroundColor: 'transparent'
    },
    talkBubbleSquare: {
      width: 120,
      height: 80,
      backgroundColor: 'red',
      borderRadius: 10
    },
    talkBubbleTriangle: {
      position: 'absolute',
      left: -26,
      top: 26,
      width: 0,
      height: 0,
      borderTopColor: 'transparent',
      borderTopWidth: 13,
      borderRightWidth: 26,
      borderRightColor: 'red',
      borderBottomWidth: 13,
      borderBottomColor: 'transparent' 
    },
    messageOvner:{
      flex:1,
      backgroundColor:'#7DFF8D',
      padding:4,
      alignSelf:'flex-end',
      margin:5, 
      maxWidth:'80%',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.55,
      shadowRadius: 1.78,
      elevation: 10,
    },
    messageSender:{
      flex:1,
      backgroundColor:'#53D2FC',
      padding:2,
      alignSelf:'flex-start',
      margin:5, 
      paddingEnd:10,
      paddingLeft:10,
      maxWidth:'80%',
      borderBottomRightRadius:10,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.55,
      shadowRadius: 1.78,
      elevation: 10,
    },
    bigAvatar:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
      elevation: 13,
    }
  });
  