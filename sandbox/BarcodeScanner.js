import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { Button } from 'react-native-elements';

import axios from "axios";

const URL =
  "https://us-central1-one-time-password-24ef8.cloudfunctions.net/runSplunkSearch";

export class BarcodeScanner extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Scanner',
    headerLeft: (<Button
              icon={{
                name: 'settings',
                color: '#4e5156',
                
              }}
              onPress={() => navigation.navigate('DrawerOpen')}
              backgroundColor='rgba(0,0,0,0)'
              color='rgba(0,122,255,1)'
            />),
  })

  state = {
    hasCameraPermission: null,
    rows: []
  };

  runSplunkSearch() {
    this.props.navigation.navigate('detail')
    axios.post(URL, {
        host: "demo-itsi.splunkoxygen.com",
        username: "rpujari",
        password: "Pujari1337",
        search: "search sourcetype=apache:access | stats count by host",
        earliest: "-1h",
        latest: "-30m"
      })
      .then(response => {
        this.setState({ rows: response.data.rows });

      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {


    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = barcode => {

    if (this.state.code !== barcode.data ) {

      //Alert.alert("Scan successful!", JSON.stringify(barcode));
      this.setState({code: barcode.data})
      this.runSplunkSearch();
    }
  };

  render() {
    return (

      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text>Camera permission is not granted</Text>
              : <BarCodeScanner
                  torchMode="on"
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{ height: 300, width: 300 }}
                />}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    //margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
