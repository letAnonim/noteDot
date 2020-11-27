import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  // StatusBar,
  Button,
  Alert
} from 'react-native';

export default function Home(){
  return(
    <View style={styles.body}>
      <View style={styles.greateengContainer}>
        <Text style={styles.greateengText}>Welcome to <Text style={styles.higlightText}>notes.dot</Text></Text>
        <View style={styles.greateengButton}>
          <Button color='grey'type='clear' title='press to start'      
            onPress={()=>{
            navigation.navigate('Notes')
          }}/>
        </View>
      </View>
      <View style={styles.aboutContainer}>
          <View>  </View><Text style={styles.aboutText}>About us <Button title='here' color='rgba(0, 0, 0, 0)'/></Text>
      </View>
    </View>
    
  )          
}
   
    const styles = StyleSheet.create({
    
      body: {
        backgroundColor: 'black',
        flex: 1,

      },
      // sectionContainer: {
      //   marginTop: 32,
      //   paddingHorizontal: 24,
      //   justifyContent: 'center',
      //   alignItems: 'center'
      // },
    
      greateengContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
      },
      greateengText:{
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
      },
      higlightText:{
        fontWeight: 'bold',
        fontSize: 26,
        color: 'orange'
      },
      aboutContainer:{
        flex: 1,
        alignItems: 'center',
        
      },
      aboutText:{
        color: 'grey',
        fontSize: 18,
        fontWeight: '300',
      }
    
    });
