import React, { Component } from 'react';
import { Image, View, Text, Platform, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions'


class MapScreen extends Component {



  state = {
    image: null,
  };

  static navigationOptions = {
    title: 'Map',
    header: ({ navigate }) => {
      return {
        left: (
          <Button
            title='Settings'
            onPress={() => navigate('settings')}
            backgroundColor='rgba(0,0,0,0)'
            color='rgba(0,122,255,1)'
          />
        ),
        style: {
          marginTop: Platform.OS === 'android'? 24: 0
        },
      };
    }
  }





  render () {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          buttonStyle={{marginBottom:10}}
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
        <Button
         title="Take a picture"
         onPress={this.clickCamera}
       />
       <Button
         buttonStyle={{marginTop:10}}
         title="Log Out"
         onPress={this.logOut}

       />

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

    );
  }


  logOut = () => {
    this.props.facebookLogout();
    this.props.navigation.navigate('welcome');
  }


  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  clickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


}

export default connect(null, actions) (MapScreen);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
