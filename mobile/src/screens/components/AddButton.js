import React, { useRef , useState, useEffect } from 'react';
import {View, StyleSheet, TouchableHighlight, Animated, TouchableOpacity, Button, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainColour, styles} from '../../styles';
import { useNavigation } from '@react-navigation/native';

export default AddButtonClass  = (props) => {
    const buttonSize = useRef(new Animated.Value(1)).current;
    const [rotVal, setRotVal]=useState(0);
    const mode = useRef(new Animated.Value(rotVal)).current;
    
    useEffect(() => {
        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue: 0.93,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(buttonSize, {
                toValue: 1,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(mode, {
                toValue: rotVal,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [rotVal]);
    

    const rotation = mode.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const sizeStyle = {
      transform: [{scale: buttonSize}],
    };
 
    return (
      <View style={{ alignItems: 'center'}}>
        {/* <Animated.View style={{ left: addX, top: addY}}>
          <TouchableOpacity  style={styles.secondaryButtons}>
            <Icon name="plus" size={24} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ left: findX, top: findY}}>
          <TouchableOpacity style={styles.secondaryButtons}>
            <Icon name="search-plus" size={24} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ left: qrX, top: qrY}}>
          <TouchableOpacity style={styles.secondaryButtons}>
            <Icon1 name="qrcode-scan" size={24} color="#FFF" />
          </TouchableOpacity>
        </Animated.View> */}
        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableOpacity
            onPress={()=>{rotVal===0?setRotVal(1):setRotVal(0)}}
            underlayColor={MainColour}>
            <Animated.View style={{transform: [{rotate: rotation}]}}>
              <Icon name="plus" size={24} color="#FFF" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
}