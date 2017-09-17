import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
} from 'react-native';
import { AnimatedText } from './../animated_text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  animatedText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 10,
  },
});

export class AnimationOneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // uzywane do sterowania animacji, jeden taki obiekt moze sterowac wieloma animacjami
      animatedValue: new Animated.Value(0), // init opacity 0 (1)
    };
  }

  reset() {
    this.state.animatedValue.setValue(0);
  }

  start() {
    Animated.timing( // sterowanie przebiegiem animacji (3)
      this.state.animatedValue,
      { toValue: 1, duration: 2000 } // mozna tez podac easing function
    ).start();
  }

  render() { // odpalenie animacji nie powoduje rerenderingu zadnego z komponentów
    let { animatedValue } = this.state;
    const scaleText = animatedValue.interpolate({ // nie mozemy czegos w stylu animatedValue * 2
      inputRange: [0, 1],
      outputRange: [0.5, 2]
    });
    return ( // podpiecie do animowanego komponentu (2)
      <View style={styles.container}>
        <Animated.Text style={ { opacity: animatedValue, transform: [ { scale: scaleText } ], marginBottom: 30  } }>
          <Text>
            Welcome to AnimationOne!
          </Text>
        </Animated.Text>
        <Button onPress={() => this.reset()} styles={styles.button} title={"Reset"} />
        <Button onPress={() => this.start()} styles={styles.button} title={"Start"} />
      </View>
    );
  }
}
