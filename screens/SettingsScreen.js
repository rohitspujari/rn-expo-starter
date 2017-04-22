import React, { Component } from 'react';
import { View, Text } from 'react-native';


class SettingsScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Settings'
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>SettingsScreen</Text>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default SettingsScreen;
