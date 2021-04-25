import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {styles, MainColour} from '../styles';
import {CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CalendarComponenet() {

  return (
    <ImageBackground
      source={require('../../img/paperBackground.png')}
      style={styles.image}>
      <View style={styles.mainContainer}>
        <View>
          <CalendarList 
            pagingEnabled={true}
            horizontal={true}
            onDayPress={(day) => {console.log('selected day', day)}}
            renderArrow={(direction) => ((direction=='right')?(<Icon name='arrow-right' size={20} color={MainColour}/>):(<Icon name='arrow-left' size={20} color={MainColour}/>))}
            enableSwipeMonths={true}
            markedDates={{
              '2021-05-16': {selected: true, marked: true, selectedColor: 'red'},
              '2012-05-17': {marked: true},
              '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              '2012-05-19': {disabled: true, disableTouchEvent: true}
            }}
            theme={{
              dayNameColor:'red',
              calendarBackground:'rgba(0,0,0,0)',
              todayTextColor:'red',
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
