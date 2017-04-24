import React, { Component } from 'react';
import { Image, View, ScrollView, Text, Platform, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions'
import { GoogleVision } from '../sandbox';
//const { HEIGHT, WIDTH } = Dimensions.get('window');


const HEIGHT = 200;
const WIDTH = 300;

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
            icon={{
              name: 'settings',
              color: '#4e5156'
            }}
            onPress={() => navigate('DrawerOpen')}
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




  getImage(image) {

    if(image) {
      return (
        <View style={{flex: 2, borderWidth: 0,  }}>
        <ScrollView style={{flex:1}}>
          <Image source={{ uri: image }} style={{ width: WIDTH, height: HEIGHT, marginTop: 10, alignSelf: 'center'}} />
          <GoogleVision image={image} />
        </ScrollView>
        </View>
      )
    }

  }

  render () {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, }}>
        <View style={{ flex:1, justifyContent: 'center',borderWidth: 0, }}>
          <Button
            buttonStyle={{marginBottom:10}}
            title="Pick an image from camera roll"
            onPress={this.pickImage}
          />
          <Button
           title="Take a picture"
           onPress={this.clickCamera}
         />
       </View>
       {this.getImage(image)}
      </View>

    );
  }





  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  clickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      //aspect: [4, 3],
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
