import 'react-native-gesture-handler';
import React, {useState, useEffect, Fragment} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Linking,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {lightIconColor, MainColour} from '../../styles'
import { RNCamera } from 'react-native-camera';
import {findNote} from '../../redux/actions/notes.actions'
import {useDispatch, useSelector} from 'react-redux'


export default function QRscanner({route,navigation}){
  const dispatch = useDispatch();
  const { userId } = route.params; 
  const [camera, setCamera] = useState('')
  const [flashlightOptions, setFlashlightOptions] = useState({light:'off', color:MainColour, icon:'flashlight-off'});
  const openLink = link => {
      console.log(link)  
      Linking.openURL(link).catch(err =>
          console.error('An error occured', err)
        );
      };
  const pressSearch = (noteId) =>{
      dispatch(findNote(userId, noteId))
      dispatch(getNotes(UserId));
      navigation.navigate('notes')
    } 
    const QRcodeRecognized = (barc) => {
      let qrcode;
      barc.barcodes.map(item=>{
        if(item.type==="QR_CODE") qrcode=item
        else qrcode=null
      })
        // Linking.openURL(qrcode.data)
        if(qrcode!==null) pressSearch(qrcode.data)
    };
    return(
        <RNCamera
          ref={ref => {setCamera(ref)}}
          style={{
            flex: 1,
            width: '100%',
          }}
          defaultTouchToFocus
          flashMode={flashlightOptions.light}
          onGoogleVisionBarcodesDetected={QRcodeRecognized}
        >
        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop:100}}>
          <Image source={require('../../img/camera_frame.png')} style={{maxHeight:250, maxWidth:250}}/>
        </View>
        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center', flexDirection:'row', marginBottom: 30}}>
          <TouchableOpacity style={{padding:10, borderRadius:100, backgroundColor:lightIconColor, margin: 30}}
          onPress={()=>{(flashlightOptions.light=='off')?setFlashlightOptions({light:'torch', color:'white', icon:'flashlight'}):setFlashlightOptions({light:'off', color:MainColour, icon:'flashlight-off'})}}>
            <Icon1 name={flashlightOptions.icon} size={40} color={flashlightOptions.color}/>
          </TouchableOpacity>
          <TouchableOpacity style={{maxWidth:60, maxHeight:60, padding:10,borderRadius:100, backgroundColor:lightIconColor, margin: 30,flex:1, justifyContent: 'center'}}
          onPress={()=>navigation.navigate('notes')}>
            <Icon name='close' size={50} color={MainColour} />
          </TouchableOpacity>
        </View>
        </RNCamera>
    )    
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        // height: 20,
        backgroundColor:'white',
        padding: 32,
      },
    centerText: {
      flex: 1,
      fontSize: 18,
    //   padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: 'black'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
    //     flex:1,
    //     justifyContent:'flex-end',
        padding: 10,
        backgroundColor:'red'
    }
  });