import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
} from 'react-native';

export class AnimatedText extends Component {
  render() { // odpalenie animacji nie powoduje rerenderingu komponentu
    console.log("render() in AnimatedText");
    return(
      <Text>
        Welcome to AnimationOne!
      </Text>
    )

  }
}
