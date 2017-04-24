import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { SocialIcon, Button } from 'react-native-elements';

import * as actions from '../actions';


class AuthScreen extends Component {


  componentDidMount () {
    //this.props.facebookLogin();
  }


  componentWillReceiveProps(nextProps) {
    //debugger
    const { navigation, token } = nextProps;
    if (token) {
      navigation.navigate('camera')
    }
  }

  signInWithFacebook = () => {

    this.props.facebookLogin();
  }

  render () {

    return (
      <View style={styles.container}>

        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          button={true}
          onPress={this.signInWithFacebook}
          style={{ borderRadius: 3}}
        />
        <SocialIcon
          title='Sign In With YouTube'
          button
          type='youtube'
          button={true}
          onPress={()=>{}}
          style={{ borderRadius: 3}}
        />

      </View>
    );
  }
}

const styles = {
  container: {
    flex:1,
    //alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    //borderColor: 'red',
    //borderWidth: 20
  }
}


function mapStateToProps(state) {
  //debugger
  return {
    token: state.auth.token
  };
}



export default connect(mapStateToProps, actions)(AuthScreen);
