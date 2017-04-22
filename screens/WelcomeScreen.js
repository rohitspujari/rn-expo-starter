import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo'

const SLIDE_DATA = [
  { text: 'Welcome to the App', color: '#03A9F4' },
  { text: 'Set your location and swipe away', color: '#009688'},
  { text: 'Enjoy!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {



  state = { token: null }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  async componentDidMount () {
    let token = await AsyncStorage.getItem('fb-token');
    if (token) {
      //debugger
      this.props.navigation.navigate('authorized_container');
      //this.setState({})
    } else {
      this.setState({token: false});
    }
  }

  render () {
    if(_.isNull(this.state.token)){
       return (
         <View>
          <Text>Logging</Text>
         </View>
       );

    }
    else {
      return (
          <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
      );
    }



  }
}

export default WelcomeScreen;
