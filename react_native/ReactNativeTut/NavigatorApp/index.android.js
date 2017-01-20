/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import MyScene from './MyScene';

const styles = StyleSheet.create({
  mainView: {
    marginTop: 30,
  },
});

export default class NavigatorApp extends Component {
  render() {
    return (
    <Navigator
      initialRoute={{ title: 'My Initial Scene', index: 0 }}
      renderScene={(route, navigator) => 
        <View style={ styles.mainView }>
          <MyScene
            title={ route.title }

            // Function to call when a new scene should be displated
            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        </View>
      }
    />
    );
  }
}


AppRegistry.registerComponent('NavigatorApp', () => NavigatorApp);
