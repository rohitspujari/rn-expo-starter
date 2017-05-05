import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';


export class BarcodeDetail extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
    

  });

  // static navigationOptions = {
  //   title: 'Details',
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


  componentDidMount() {
    Alert.alert("Component did mount successful!");
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Barcode Detail</Text></View>
    )
  }
}
