import React from 'react'
import { StyleSheet  
  } from 'react-native';
  const MainColour = "#FFBA51";
  const red = '#E04536';
  export const lightIconColor = '#C4C4C4'
export const styles = StyleSheet.create({
    body:{
      flex: 1
    },
    section1:{
      width: '100%'
    },
    nawbarContainer:{
      backgroundColor:MainColour, 
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
        borderColor:MainColour,
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
      // alignItems:'center',
    },
    mainText:{
      color: 'white',
      fontSize: 24,
      fontWeight: '600',
    },
    mainGreyText:{
      color: 'grey',
      fontSize: 24,
      fontWeight: '600',
    },
    higlightText:{
      fontWeight: 'bold',
      fontSize: 26,
      color: MainColour
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
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 4,
      padding: 30,      
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
      backgroundColor: MainColour,
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
    SmallCloseButton:{
      backgroundColor:red,
      margin:5,
      padding:5,
      borderRadius:5,
      height:40,
      // width:150,
      alignItems:'center',
      justifyContent:'center'
    },
    smallDefaultButton:{
      backgroundColor:MainColour,
      margin:5,
      padding:5,
      borderRadius:5,
      height:40,
      // width:150,
      alignItems:'center',
      justifyContent:'center'
    },
    defaultCloseButton:{
      backgroundColor:red,
      margin:10,
      padding:5,
      borderRadius:5,
      height:40,
      width:260,
      alignItems:'center',
      justifyContent:'center'
    },
    section2:{
      flex:1,
      marginTop:3
    },
    noteListContaiter:{
      height: 80,
      // width: '100%',
      margin: 2,
      marginLeft:5,
      marginRight:5
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
      borderColor:MainColour,
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
      borderTopRightRadius:30,
      borderBottomRightRadius:30,
      backgroundColor:'rgba(255,255,255, 0.5)',
      minWidth:'75%',
      alignItems:'flex-start',
      borderColor:MainColour,
      borderLeftWidth:8,
      fontSize:20,
      padding:2,
      paddingLeft:10,
      margin: 5,
      maxHeight:'100%'
    },
    sendSmallButton:{
      maxHeight:30,
      maxWidth:30,
      margin:8,
      marginRight:3
    },
    defaultButton:{
      backgroundColor:MainColour,
      margin:10,
      padding:5,
      borderRadius:5,
      height:40,
      width:260,
      alignItems:'center',
      justifyContent:'center'
    },
    buttonsContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'flex-end',
      margin:20,
      flexDirection:'column'
    },
    buttonsLandscapeContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
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
    bigAvatarContainer:{
      alignItems:'center',
      marginTop:20,
      marginBottom: -40,
      zIndex: 2,
    },
    bigLandscapeAvatarContainer:{
      alignItems:'flex-start',
      marginTop:20,
      marginLeft:20,
      marginBottom: -70,
      zIndex: 2,
    },
    BigAvatar:{
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
      elevation: 19,
      width:150, 
      height:150, 
      borderRadius:100
    },
    avatarImage:{
      width:150, height:150, borderRadius:100
    },
    BigLandscapeAvatar:{
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
      elevation: 19,
      backgroundColor:'white',
      width:150, 
      height:150, 
      borderRadius:100
    },

    underAvatarContainer:{
      zIndex: 0,
      backgroundColor:'white',
      flex:1,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },

    profileText:{
      flex:1,
      marginTop:40, 
      alignItems:'center'
    },
    profileLandscapeText:{
      flex:1,
      marginLeft:200,
      marginTop:10, 
      alignItems:'flex-start'

    },

    

    

  });
  