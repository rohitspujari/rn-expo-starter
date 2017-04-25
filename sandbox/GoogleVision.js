import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GCP from '../gcp_account.json';
import axios from 'axios';
import { Components } from 'expo';
import { List, ListItem, Badge } from 'react-native-elements';
import * as actions from '../actions';

const VISION_API = `https://vision.googleapis.com/v1/images:annotate?key=${GCP.key}`

export class GoogleVision extends Component {

  state = { isLoading: true};



  componentWillReceiveProps(nextProps) {

    if (this.props.image === nextProps.image){ return;}
    this.setState({isLoading: true});
    actions.analyzeImage(nextProps.image, (responses) => {
      this.setState({responses, isLoading: false});
      this.props.similarImages(responses[0].webDetection.visuallySimilarImages);
    });

  }

  componentWillMount() {
    this.setState({isLoading: true});
    actions.analyzeImage(this.props.image, (responses)=>{
      this.setState({responses, isLoading: false});
      console.log(responses)
      this.props.similarImages(responses[0].webDetection.visuallySimilarImages);
    });



  }

  renderLabels = (responses) => {
    //console.log(this.state)

    if(responses && this.state.isLoading === false) {
        return responses.map(response => {
        if(response.error){
          return <Text key={response.error.code}>{response.error.message}</Text>
        }

        return response.labelAnnotations.map(label => {

          match_percent = Math.round(label.score * 100) + "%";
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
    return (
      //<Components.AppLoading />
      <View><Text>Loading ..</Text></View>
    );

  }

  render () {
    return (
      <View>
        {this.renderLabels(this.state.responses)}
      </View>
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
