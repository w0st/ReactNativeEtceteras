import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  Easing
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  animatedText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 10,
  },
});

export class AnimationTwoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      animatedRotate: new Animated.Value(0),
      animatedColor: new Animated.Value(0)
    };
  }

  reset() {
    this.state.animatedValue.setValue(0);
    this.state.animatedRotate.setValue(0);
    this.state.animatedColor.setValue(0);
  }

  start() {
    Animated.parallel( // odpalam rownolegle
      [
        Animated.spring( // korzystam z funkcji spring, ktora odwzorowuje pewien model fizyczny
          this.state.animatedValue,
          { toValue: 120, friction: 0.5 }
        ),
        Animated.sequence([ // odpalam sekwencyjnie
          Animated.timing(
            this.state.animatedRotate,
            { toValue: 1, duration: 1000, easing: Easing.cubic } // dodany easing
          ),
          Animated.timing(
            this.state.animatedColor,
            { toValue: 5, duration: 2000 }
          ),
        ])

      ]
    ).start();
  }

  render() {
    let { animatedValue, animatedRotate, animatedColor } = this.state;
    const rotate = animatedRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    var color = animatedColor.interpolate({
        inputRange: [0, 10],
        outputRange: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)']
    });
    console.log('state = ', this.state);
    return (
      <View style={styles.container}>
      <Animated.View style={ {
          marginLeft: animatedValue,
          transform: [ { rotate: rotate } ],
          marginTop: 10,
          height: 80,
          width: 80,
          backgroundColor: color
        } }
      />
        <Button onPress={() => this.reset()} styles={styles.button} title={"Reset"} />
        <Button onPress={() => this.start()} styles={styles.button} title={"Start"} />
      </View>
    );
  }
}
