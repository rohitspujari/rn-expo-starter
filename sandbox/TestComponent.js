import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AccelerometerSensor }  from './AccelerometerSensor';
import { GyroscopeSensor } from './GyroscopeSensor';


export class TestComponent extends Component {



  render () {
    return (
      <View>
      <View>
        <AccelerometerSensor/>
      </View>
      <View style={{marginTop: 20}}>
        <GyroscopeSensor />
      </View>
      </View>
    );
  }
}

//export TestComponent;
