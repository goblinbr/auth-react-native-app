import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from '.';
import styles from './styles';

class LoginForm extends Component {
  state = this.initialState();

  onButtonPress() {
    this.setState({ loading: true, error: '' });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      })
    ;
  }

  onLoginSuccess() {
    this.setState(this.initialState());
  }

  onLoginFail() {
    this.setState({ error: 'Authentication failed.', loading: false });
  }

  initialState() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  renderError() {
    if (this.state.error) {
      return (
        <CardSection>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.error}
            </Text>
          </View>
        </CardSection>
      );
    }
    return undefined;
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (
        <Spinner size="small" />
      );
    }
    return (
      <Button
        title="Log in"
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="E-mail"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCorrect={false}
            placeholder="your_email@server.com"
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            autoCorrect={false}
            placeholder="password"
            secureTextEntry
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }
}

export { LoginForm };
