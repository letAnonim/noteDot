import React, { Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image, 
  ImageBackground,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import {styles} from '../../styles'
import {getUsers, getUser} from '../../redux/actions/users.actions.js'
import{ bindActionCreators } from 'redux'


class Profile extends Component{
    componentDidMount() {
        this.props.getUsers();
        this.props.getUser('Taras');
    }
    render(){   
        const { users, loadingProfile, user } = this.props;
        console.log(users, loadingProfile)
        console.log(user, loadingProfile)
        return(
            <ImageBackground source={require('../../img/paperBackground.png')} style={styles.image}>
                <View style={{
                    backgroundColor:`orange`, 
                    height:50,
                    flexDirection:'row'}}>
                    <View style={styles.nawbarContainerLeft}>
                        <TouchableOpacity  style={styles.smallButtonContainer}onPress={()=>{}}>
                            <Image style={styles.addSmallButton} source={require('../../img/menu.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.nawbarTitle}>Profile</Text>   
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.bigAvatar}>
                        <View style={{backgroundColor:'white',width:150, height:150, borderRadius:100}}>
                            <Image style={{width:150, height:150, borderRadius:100}} source={require('../../img/defaultUser.png')}/>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.mainText}>Name:Taras  </Text>
                        <Text style={styles.mainText}>Age:20  </Text>
                    </View>
                </View>
                <View style={{margin:10}}>
                    <Button title='Exit from profile'
                        color='orange'
                        onPress={()=>{          
                            // navigation.navigate('authorisation')
                        }}
                    />
                </View>
            </ImageBackground>
            
        )}      
}

function mapStateToProps(state){
    return {
      users: state.users
    }
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({getUsers, getUser}, dispatch)
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);