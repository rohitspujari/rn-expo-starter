import React, { Component } from 'react';
import { Image, ListView, View, Modal, ScrollView, Text, Platform, AsyncStorage, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker, Svg} from 'expo';
import { Button, Icon, Divider, Badge, ButtonGroup } from 'react-native-elements';
import * as actions from '../actions'
import { analyzeImage } from '../apis/google_vision';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageProgress from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
const PLACEHOLDER_IMAGE = 'https://s3.amazonaws.com/popco/images/services/starter-page/img-round-placeholder.jpg';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const BLANK_TEXT = ''

const badgeColors = ['#effcf5', '#cdd4a2', '#97a3a3', '#e2c950','#f2c79c']

class CameraScreen extends Component {

  state = {
    isLoading: false,
    isImageLoading: false,
    image: PLACEHOLDER_IMAGE,
    imageLandmarks: [],
    imageLabels: [],
    imageText: BLANK_TEXT,
    similarImages: [],
    modalVisible: false,
    selectedIndex: 0,

  };

  // static navigationOptions = {
  //   title: 'Vision',
  //   header: ({ navigate }) => {
  //     return {
  //       left: (
  //         <Button
  //           icon={{
  //             name: 'settings',
  //             color: '#4e5156'
  //           }}
  //           onPress={() => navigate('DrawerOpen')}
  //           backgroundColor='rgba(0,0,0,0)'
  //           color='rgba(0,122,255,1)'
  //         />
  //       ),
  //       style: {
  //         marginTop: Platform.OS === 'android'? 24: 0
  //       },
  //     };
  //   }
  // }


  static navigationOptions = ({ navigation }) => ({
    title: 'Vision'

  })

  getImageLabels(imageLabels) {
    if (imageLabels.length > 1) {
      return (imageLabels.map(label => <Badge
        containerStyle={{
          backgroundColor: '#f2c79c',
          margin: 5
        }} key={label.description}><Text>{label.description}</Text></Badge>)
      )
    }

  }

  getImageLandmarks(imageLandmarks) {
    if(imageLandmarks[0])
    {
      return (
        <View>
          <Divider style={{ marginTop: 5, marginBottom: 5}} />
          <Text style={{fontWeight:'bold', marginBottom: 5, color: '#645856' }}>Landmark</Text>
          <Text>{imageLandmarks[0].description}</Text>
        </View>
      )
    }
    // return (
    //   <View>
    //     <Text>{imageLandmarks.description}</Text>
    //   </View>
    // )
  }

  render () {

    let {image, imageLabels, imageText, similarImages, imageLandmarks } = this.state;




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
                <ImageProgress
                 indicator={ProgressBar}
                 source={{ uri:img.url, width: WIDTH, height: 200 }}/>
                <Divider style={{ backgroundColor: 'gray', height:1}} />
              </View>
            ))}

          </ScrollView>
          <Icon
             raised
             containerStyle={{
               position: 'absolute',
               right: 15,
               top: 15,
               backgroundColor: '#ffff',
               opacity: .3,
               alignSelf: 'flex-end'
             }}
             name='clear'
             onPress={() => this.setState({modalVisible: false})}/>
          </Modal>
          <ParallaxScrollView
              style={{ flex: 1, overflow: 'hidden' }}
              renderBackground={() => {
                return <View>

                  <Image source={{ uri: image, width: WIDTH, height: 350 }}/>
                </View>
              }}
              parallaxHeaderHeight={ 350 }>

               <ButtonGroup
                onPress={selectedIndex => this.setState({selectedIndex})}
                selectedIndex={this.state.selectedIndex}
                buttons={['Summary', 'Text']}/>
              {this.state.isLoading && (<ActivityIndicator style={{marginTop:50}} animating={this.state.isLoading} />)}
              {!this.state.isLoading && this.getParallaxContent(imageLabels, imageText, imageLandmarks)}

          </ParallaxScrollView>
          {this.getButtons()}
      </View>
    );
  }

  getParallaxContent(imageLabels, imageText, imageLandmarks) {
    return <View>
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
      <View style={{paddingHorizontal: 10, borderWidth: 0, borderColor:'red'}}>
        {this.getImageLandmarks(imageLandmarks)}
        {this.state.selectedIndex === 1 && this.getImageText(imageText)}
      </View>
    </View>
  }

  getImageText(imageText) {
    if(!this.state.isLoading && imageText !== BLANK_TEXT){
      return (
        <View>
          <Divider style={{ marginTop: 5, marginBottom: 5}} />
          <Text style={{fontWeight:'bold', marginBottom: 5, color: '#645856' }}>Extracted Text</Text>
          <Text>{imageText}</Text>
        </View>
      );
    }

  }

  getButtons = () => {
      const buttonContainer = {
        backgroundColor: '#ffff',
        opacity: .3

      }
      return (
        <View style={{ position: 'absolute', borderWidth: 0, left: (WIDTH - WIDTH/5), top: 10 }}>
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

    const imageLabels = response.labelAnnotations ? response.labelAnnotations: [];
    const imageText = response.fullTextAnnotation ? response.fullTextAnnotation.text: BLANK_TEXT;
    const imageLandmarks = response.landmarkAnnotations? response.landmarkAnnotations: [];

    var similarImages = [];
    if(response.webDetection){
      //similarImages = response.webDetection.visuallySimilarImages;
      if(response.webDetection.fullMatchingImages){
        similarImages = similarImages.concat(response.webDetection.fullMatchingImages);
      }
      if(response.webDetection.partialMatchingImages){
        similarImages = similarImages.concat(response.webDetection.partialMatchingImages);
      }
      if(response.webDetection.visuallySimilarImages){
        similarImages = similarImages.concat(response.webDetection.visuallySimilarImages);
      }
    }

    return {
      imageLabels,
      imageText,
      similarImages,
      imageLandmarks
    }
  }

  processImage( image ) {
    analyzeImage(image, (responses) => {
      const { imageLabels, imageText, similarImages, imageLandmarks } = this.extractContent(responses[0])
      this.setState({ imageLabels, imageText, similarImages, imageLandmarks, isLoading: false});
    });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [6, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, isLoading: true, selectedIndex: 0 });
      this.processImage(result.uri)
    }
  };

  clickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [6, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, isLoading: true, selectedIndex: 0 });
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
