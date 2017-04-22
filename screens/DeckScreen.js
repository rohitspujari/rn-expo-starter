import React, { Component } from 'react';
import { View, Text } from 'react-native';


class DeckScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Deck'
  }



  render () {
    //this.props.navigation.navigate('DrawerOpen')
    return (
      <View style={styles.container}>
        <Text>DeckScreen</Text>
        <Text>DeckScreen</Text>
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

export default DeckScreen;
