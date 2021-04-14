import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../styles';

export default function Calendar() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const FadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const FadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const FadeInView = (props) => {
    return (
      <Animated.View style={{...props.style, opacity: fadeAnim}}>
        {props.children}
      </Animated.View>
    );
  };
  FadeIn();
  return (
    <ImageBackground
      source={require('../../img/paperBackground.png')}
      style={styles.image}>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>CALENDAR</Text>
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <TouchableOpacity onPress={FadeOut()}>
            <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
              Fading in
            </Text>
          </TouchableOpacity>
        </FadeInView>
      </View>
    </ImageBackground>
  );
}
