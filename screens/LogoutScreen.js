import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { SocialIcon, Button } from 'react-native-elements';

import * as actions from '../actions';


class LogoutScreen extends Component {


  componentDidMount () {
    this.props.facebookLogout();
  }


  componentWillReceiveProps(nextProps) {
    //debugger
    const { navigation, token } = nextProps;
    if (token) {
      navigation.navigate('authorized_container')
    }
    navigation.navigate('auth')
  }

  // signInWithFacebook = () => {
  //
  //   this.props.facebookLogin();
  // }

  render () {

    return (
      <View>
        <Text>Logout</Text>
      </View>
    );
  }
}

// const styles = {
//   container: {
//     flex:1,
//     //alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     //borderColor: 'red',
//     //borderWidth: 20
//   }
// }


function mapStateToProps(state) {
  //debugger
  return {
    token: state.auth.token
  };
}



export default connect(mapStateToProps, actions)(LogoutScreen);
