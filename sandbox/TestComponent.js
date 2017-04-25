import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  Text,
  View
} from 'react-native';
import {Badge} from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const window = Dimensions.get('window');
console.log(window.width);

export class TestComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>

  <Text>{'HEllo'}</Text>


      </View>
    );
  }
}
