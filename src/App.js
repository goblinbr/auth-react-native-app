import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, LoginForm, Button, Card, CardSection, Spinner } from './components';

const UNKNOWN_USER = 'unknown';

class App extends Component {
  state = { user: UNKNOWN_USER };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCvlyDXrKaX1_CElUATNJzFqZyd9hKaawk',
      authDomain: 'auth-react-native-app.firebaseapp.com',
      databaseURL: 'https://auth-react-native-app.firebaseio.com',
      storageBucket: 'auth-react-native-app.appspot.com',
      messagingSenderId: '319788617383'
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  onLogoutPress() {
    firebase.auth().signOut();
  }

  renderContent() {
    if (this.state.user === UNKNOWN_USER) {
      return (
        <Card>
          <CardSection>
            <Spinner />
          </CardSection>
        </Card>
      );
    }
    if (this.state.user) {
      return (
        <Card>
          <CardSection>
            <Text>
              E-mail: {this.state.user.email}
            </Text>
          </CardSection>
          <CardSection>
            <Button
              title="Log out"
              onPress={this.onLogoutPress.bind(this)}
            />
          </CardSection>
        </Card>
      );
    }
    return (<LoginForm />);
  }

  render() {
    return (
      <View>
        <Header text="Auth app" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
