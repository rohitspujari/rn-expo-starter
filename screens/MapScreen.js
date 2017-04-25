import React, { Component } from 'react';
import { Image, ListView, View, Modal, ScrollView, Text, Platform, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Icon, Divider } from 'react-native-elements';
import * as actions from '../actions'
import { GoogleVision } from '../sandbox';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
//import ImageViewer from 'react-native-image-zoom-viewer';
//import ImageCarousell from 'react-native-image-carousell';
const PLACEHOLDER_IMAGE = 'http://www.businesswise.co.il/wp-content/uploads/2014/12/default-placeholder.png';
const { HEIGHT, WIDTH } = Dimensions.get('window');


//const HEIGHT = 200;
//const WIDTH = 300;

class MapScreen extends Component {



  state = {
    image: PLACEHOLDER_IMAGE,
    modalVisible: false,
    images: []
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



  similarImages = (images) => {

  //  debugger
    this.setState({images})
  }


  render () {
    let { image, images } = this.state;

    return (
      <View style={{ flex: 1 }}>

          <Modal style={{flex:1}}
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}

          >

          <Icon
             raised
             containerStyle={{
               backgroundColor: '#ffff',
               opacity: .3,
               alignSelf: 'flex-end'
             }}
             name='clear'
             onPress={() => this.setState({modalVisible: false})}
          />

          <ScrollView>
            {images.map(img => <Image style={{marginBottom:2}} key={img.url} source={{ uri: img.url, width: WIDTH, height: 200 }}/>)}
            <Divider style={{ backgroundColor: 'blue', height:2}} />
          </ScrollView>
          </Modal>

          <ParallaxScrollView
              style={{ flex: 1, overflow: 'hidden' }}
              renderBackground={() => <Image source={{ uri: image, width: WIDTH, height: 350 }}/>}
              renderFixedHeader={() => this.getButtons()}
              parallaxHeaderHeight={ 350 }>

            <GoogleVision image={image} similarImages={this.similarImages}/>
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
        <View style={{ flexDirection:'column', flex:1, justifyContent: 'center', alignItems:'flex-end', borderWidth: 0, marginRight: 15, marginTop: 20}}>
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
         <Icon
            raised
            containerStyle={[buttonContainer]}
            name='search'
            onPress={() => this.setState({modalVisible: true})}
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
