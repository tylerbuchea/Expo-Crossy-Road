import Expo, {AppLoading} from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/Game'

import * as THREE from 'three';

global.THREE = THREE;
require('three/examples/js/loaders/OBJLoader');
const THREEView = Expo.createTHREEViewClass(THREE);

if (!console.time) {
  console.time = () => {};
}
if (!console.timeEnd) {
  console.timeEnd = () => {};
}



function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
}

console.ignoredYellowBox = ['THREE.WebGLRenderer'];
class App extends React.Component {
  state = {appIsReady: false};
  componentWillMount() {
    this.downloadAssets();
  }

   downloadAssets = async () => {
console.log("FROG: Start Loading fonts");
    const fontAssets = cacheFonts([
      {"EarlyGameBoy": require('./assets/fonts/EarlyGameBoy.ttf')},
    ]);

    await Promise.all([
      ...fontAssets,
    ]);
    console.log("FROG: Loaded fonts");
    this.setState({appIsReady: true});

  }
  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />
    }
    return (
      <Game style={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
