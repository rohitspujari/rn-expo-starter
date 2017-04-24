import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GCP from '../gcp_account.json';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';

const VISION_API = `https://vision.googleapis.com/v1/images:annotate?key=${GCP.key}`

export class GoogleVision extends Component {

  state = {};


  getImage = (img, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', img , true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      if (this.status == 200) {
        var uInt8Array = new Uint8Array(this.response);
        var i = uInt8Array.length;
        var binaryString = new Array(i);
        while (i--) {
          binaryString[i] = String.fromCharCode(uInt8Array[i]);
        }
        var data = binaryString.join('');
        if (!global.btoa) {
          global.btoa = require('base-64').encode;
        }
      var base64 = window.btoa(data);
      callback(base64)
      //callback("data:image/png;base64,"+base64);
    }
  };
  xhr.send();
}


  // toDataUrl(url, callback) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //       var reader = new FileReader();
  //       reader.onloadend = function() {
  //           //get rid of first 23 chars
  //           callback(reader.result.slice(23));
  //       }
  //       reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }



  callVisionApi(imgBase64){
    //console.log(imgBase64);
    const request = {
      requests: [
        {
          image: {
            content: imgBase64
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
        //e.log(response.data)
        this.setState({responses: response.data.responses})
      })


  }

  componentWillReceiveProps(nextProps) {
    //debugger
    console.log('componentWillReceiveProps')
    if(this.props.image === nextProps.image){
      return;
    }
    this.getImage(nextProps.image, this.callVisionApi.bind(this));
  }

  componentDidMount () {

    console.log('componentDidMount')

    if(!this.props.image){
      return;
    }


    this.getImage(this.props.image, this.callVisionApi.bind(this));

  }


  renderLabels = (responses) => {
    if(responses) {
      //e.log(responses)

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
