import React, { Component } from 'react';
import { Image, View, ScrollView, Text, Platform, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions'
import { GoogleVision } from '../sandbox';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
const PLACEHOLDER_IMAGE = 'http://www.businesswise.co.il/wp-content/uploads/2014/12/default-placeholder.png';
const { HEIGHT, WIDTH } = Dimensions.get('window');


//const HEIGHT = 200;
//const WIDTH = 300;

class MapScreen extends Component {



  state = {
    image: PLACEHOLDER_IMAGE,
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






  render () {
    let { image } = this.state;

    return (
      <View style={{ flex: 1 }}>
          <ParallaxScrollView
              style={{ flex: 1, overflow: 'hidden' }}
              renderBackground={() => <Image source={{ uri: image, width: WIDTH, height: 350 }}/>}
              renderFixedHeader={() => this.getButtons()}
              parallaxHeaderHeight={ 350 }>
            <GoogleVision image={image} />
          </ParallaxScrollView>
      </View>
    );
  }


  getButtons = () => {
      const buttonContainer = {
        backgroundColor: '#ffff',
        opacity: .3
      }
      return (
        <View style={{ flexDirection:'column', flex:1, justifyContent: 'center', alignItems:'flex-end', borderWidth: 0, marginRight: 20, marginTop: 20}}>
          <Icon
           raised
           containerStyle={buttonContainer}
           name="camera-enhance"
           onPress={this.clickCamera}
         />
         <Icon
            raised
            containerStyle={buttonContainer}
            name='file-upload'
            onPress={this.pickImage}
         />
       </View>
   )
};





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
