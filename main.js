import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

// Screen Imports
import AuthScreen from './screens/AuthScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LogoutScreen from './screens/LogoutScreen';
import { AccelerometerSensor, LocationComponent, TestComponent, GyroscopeSensor, GoogleVision} from './sandbox';

class App extends React.Component {

  render() {
    // Map Routes of the App

    const LandingTabs = TabNavigator({
      map: { screen:
        StackNavigator({
          camera: { screen: MapScreen}
      })},
      review: { screen: ReviewScreen }
    });

    const ContainerNavigator = DrawerNavigator({
      landing: { screen : LandingTabs },
      deck: { screen: DeckScreen },
      settings: { screen: SettingsScreen},
      sandbox: {
        screen: TabNavigator({
          acc: { screen: AccelerometerSensor},
          gyro: { screen: GyroscopeSensor},
          vision: { screen: GoogleVision }
        })
      },
      logout: { screen: LogoutScreen}
    },);

    const MainNavigator = TabNavigator({
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        authorized_container: { screen: ContainerNavigator }
      },{
      navigationOptions: {
        tabBar: { visible: false }
      },
      lazyLoad: true
    });

    const SandboxNavigator = TabNavigator({
      camera: { screen: MapScreen },
      vision: { screen: TestComponent },

    })


    return (
      <Provider store={store}>
        <View style={styles.container}>
          <SandboxNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
