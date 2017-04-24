import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  Text,
  View
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const window = Dimensions.get('window');
console.log(window.width);

export class TestComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <ParallaxScrollView
              style={{ flex: 1, backgroundColor: 'hotpink', overflow: 'hidden' }}
              renderBackground={() => <Image source={{ uri: `https://placekitten.com/414/350`, width: window.width, height: 350 }}/>}
              renderFixedHeader={() => <Text style={{ textAlign: 'right', color: 'black', padding: 5, fontSize: 20 }}>Hello</Text>}
              parallaxHeaderHeight={ 350 }>
            <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 30 }}>Meow!</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 30 }}>Meow!</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 30 }}>Meow!</Text></View>
          </ParallaxScrollView>

        </View>

      </View>
    );
  }
}
