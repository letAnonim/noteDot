import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {styles} from '../styles';

export default function Calendar() {
  return (
    <ImageBackground
      source={require('../../img/paperBackground.png')}
      style={styles.image}>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>CALENDAR</Text>
      </View>
    </ImageBackground>
  );
}
