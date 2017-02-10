import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from './components';

class App extends Component {
  render() {
    return (
      <View>
        <Header text="Auth app" />
        <Text>
          An App!
        </Text>
      </View>
    );
  }
}

export default App;
