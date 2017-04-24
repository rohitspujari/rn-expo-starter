import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GCP from '../gcp_account.json';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';

const VISION_API = `https://vision.googleapis.com/v1/images:annotate?key=${GCP.key}`

export class GoogleVision extends Component {

  state = {};

  getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  componentDidMount () {

    if(!this.props.image){
      return
    }

    console.log(window)
    console.log(this.props.image)

    const request = {
      requests: [
        {
          image: {
            source: {
              imageUri: "http://cdn23.us1.fansshare.com/photos/elishacuthbert/elisha-cuthbert-jpeg-my-sassy-girl-1234688200.jpg"
            }
          },
          features: [
            {
              type: "LABEL_DETECTION"
            }
          ]
        }
      ]
    }


    axios.post(VISION_API, request)
      .then(response => {
        //console.log(response.data)
        this.setState({responses: response.data.responses})
      })



  }


  renderLabels = (responses) => {
    if(responses) {
      console.log(responses)

      return responses.map(response => {
        if(response.error){
          return <Text key={response.error.code}>{response.error.message}</Text>
        }
        return response.labelAnnotations.map(label => {
          return (
            <ListItem
              hideChevron
              roundAvatar
              key={label.description}
              title={label.description}
              subtitle={Math.round(label.score * 100) + "%"}
            />
          );
        });
      });
    }
    return <View/>;

  }

  render () {

    //debugger
    return (

      <List containerStyle={{marginBottom: 20}}>
        {this.renderLabels(this.state.responses)}
      </List>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
}
