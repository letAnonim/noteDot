import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TextInput
} from 'react-native';


export default function Notes(){
    const [notes, setNotes] = useState([])
  
    // const [value, setValue] = useState('')
    return(
        <View style={styles.body}>
            {/* <View style={styles.nawbarContainer}>
                <Text style={styles.nawbarTitle}>Cool nawdar title)</Text>
            </View> */}
            <View style ={styles.section1}>
                <View style={styles.section1__input}>
                    <TextInput style={styles.input} 
                        onChangeText ={''}
                        placeholder='search note...'    
                    />
                </View>
                <View style={styles.section1__button}>
                    <Button title='create a note' color="orange"  />
                </View>
                {/* <View style={styles.section2}>
                    {Notes.map(note=>{
                        return <Text key={note.id}>{note.title}</Text>
                    })}
                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: 'white'
    },
    nawbarContainer: {
        backgroundColor: 'black',
        height: 50,
        alignItems:'center'
    },
    nawbarTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        marginTop:10,
        marginLeft:10,
    },
    section1:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    section1__input:{
        width: '65%',
        height: 35,
        margin: 7
    },
    input:{
        borderWidth:2,
    },
    section1__button:{
       justifyContent:"center",
       marginRight: 7
    },
    section2:{

    }
   
})
