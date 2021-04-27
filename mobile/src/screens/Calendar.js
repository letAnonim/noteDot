import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  Linking
} from 'react-native';
import {styles, MainColour} from '../styles';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CalendarComponenet() {
  const handlePress = async (data) => {
    const splitData = data.split('-').reverse().join('.');
    const url = `https://www.google.com/search?q=${splitData}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {

      await Linking.openURL(url);
    }else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  }
  return (
    <ImageBackground
      source={require('../../img/paperBackground.png')}
      style={styles.image}>
      <View style={styles.mainContainer}>
        <View>
          <Calendar 
            pagingEnabled={true}
            horizontal={true}
            onDayLongPress ={(day) => {handlePress(day.dateString)}}
            renderArrow={(direction) => ((direction=='right')?(<Icon name='arrow-right' size={20} color={MainColour}/>):(<Icon name='arrow-left' size={20} color={MainColour}/>))}
            enableSwipeMonths={true}
            theme={{
              calendarBackground:'rgba(0,0,0,0.1)',
              todayTextColor:MainColour,
              monthTextColor:MainColour,
              selectedDayTextColor:MainColour,
              textDayHeaderFontWeight: '800',
              textDayStyle:{
                color:"black"
              }

          }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
