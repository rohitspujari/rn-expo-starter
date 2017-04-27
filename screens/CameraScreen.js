import React, { Component } from 'react';
import { Image, ListView, View, Modal, ScrollView, Text, Platform, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Icon, Divider, Badge } from 'react-native-elements';
import * as actions from '../actions'
import { analyzeImage } from '../apis/google_vision';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageLoad from 'react-native-image-placeholder';
const PLACEHOLDER_IMAGE = 'https://s3.amazonaws.com/popco/images/services/starter-page/img-round-placeholder.jpg';

const { HEIGHT, WIDTH } = Dimensions.get('window');
const badgeColors = ['#effcf5', '#cdd4a2', '#97a3a3', '#e2c950','#f2c79c']

class CameraScreen extends Component {

  state = {
    isLoading: false,
    isImageLoading: false,
    image: PLACEHOLDER_IMAGE,
    imageLabels: [],
    imageText: '',
    similarImages: [],
    modalVisible: false,

  };

  static navigationOptions = {
    title: 'Vision',
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

  getImageLabels(imageLabels) {
    if(this.state.isLoading) {
      return <Text>Loading .. </Text>
    }

    if (imageLabels.length > 1) {
      return (imageLabels.map(label => <Badge
        containerStyle={{
          backgroundColor: '#f2c79c',
          margin: 5
        }} key={label.description}><Text>{label.description}</Text></Badge>)
      )
    }

  }

  render () {
    let {image, imageLabels, imageText, similarImages } = this.state;

    return (
      <View style={{ flex: 1 }}>

          <Modal style={{flex:1}}
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}>

          <ScrollView>
            {(similarImages.length > 1) && similarImages.map(img => (
              <View key={img.url}>
                <Image
                 onLoadStart={() => this.setState({ isImageLoading: true })}
                 onLoadEnd={() => this.setState ({ isImageLoading: false })}
                 loadingStyle={{ size: 'large', color: 'blue' }}
                 source={{ uri: this.isImageLoading? PLACEHOLDER_IMAGE: img.url, width: WIDTH, height: 200 }}/>
                <Divider style={{ backgroundColor: 'gray', height:1}} />
              </View>
            ))}

          </ScrollView>
          <Icon
             raised
             containerStyle={{
               position: 'absolute',
               right: 10,

               backgroundColor: '#ffff',
               opacity: .3,
               alignSelf: 'flex-end'
             }}
             name='clear'
             onPress={() => this.setState({modalVisible: false})}/>
          </Modal>
          <ParallaxScrollView
              style={{ flex: 1, overflow: 'hidden' }}
              renderBackground={() => <Image source={{ uri: image, width: WIDTH, height: 350 }}/>}
              renderFixedHeader={() => this.getButtons()}
              parallaxHeaderHeight={ 350 }>
            <View style={{
              flex:1,
              flexDirection: 'row',
              //justifyContent:'space-between',
              alignItems: 'center',
              padding: 5,
              flexWrap:'wrap',
            }}>
              {this.getImageLabels(imageLabels)}
            </View>
            {this.getImageText(imageText)}
          </ParallaxScrollView>
      </View>
    );
  }

  getImageText(imageText) {
    if(!this.state.isLoading){
      return (<View style={{padding:10}}>
        <Text>{imageText}</Text>
      </View>);
    }

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
  }

  extractContent(response) {

    const imageLabels = response.labelAnnotations ? response.labelAnnotations: []
    const imageText = response.fullTextAnnotation ? response.fullTextAnnotation.text: null
    //const similarImages = response.webDetection ? response.webDetection.visuallySimilarImages: []
    var similarImages = [];
    if(response.webDetection){
      similarImages = response.webDetection.fullMatchingImages
                        .concat(response.webDetection.partialMatchingImages)
                        .concat(response.webDetection.visuallySimilarImages)
    }
    else {
      similarImages = [];
    }

    return {
      imageLabels,
      imageText,
      similarImages
    }
  }

  processImage( image ) {
    analyzeImage(image, (responses) => {
      const { imageLabels, imageText, similarImages } = this.extractContent(responses[0])
      this.setState({ imageLabels, imageText, similarImages, isLoading: false});
    });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, isLoading: true });
      this.processImage(result.uri)
    }
  };

  clickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      //aspect: [4, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, isLoading: true });
      this.processImage(result.uri)
    }
  };

}

export default connect(null, actions) (CameraScreen);



const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
