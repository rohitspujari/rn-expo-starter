import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';


SCREEN_WIDTH = Dimensions.get('window').width;


class Slides extends Component {



  renderLastSlide (index) {
    if( index === this.props.data.length - 1 ) {
      return(
        <Button
          title="Let's go"
          raised
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      );
    }

  }

  renderSlides () {
    return this.props.data.map((slide, index) => {
      return (
        <View key={index} style={[styles.slideStyle, { backgroundColor: slide.color}]}>
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    })
  }
  render () {
    return (
      <ScrollView style={{flex: 1}}
        horizontal
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex:1,
    padding: 10,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
};

export default Slides;
