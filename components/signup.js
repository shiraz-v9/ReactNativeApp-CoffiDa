import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { externalCSS } from "../style/style";
class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      isLoading: true,
      userDeets: [],
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      id: "",
    };
  }
  signMeIn() {
    var jsonUserData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(jsonUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          id: data.user_id,
        });
        ToastAndroid.show(
          "Account created! you can now log-in",
          ToastAndroid.SHORT
        );
        console.log("Success, ID created... ", JSON.stringify(data));
        this.props.navigation.navigate(
          "loginAsync",
          JSON.stringify(jsonUserData)
        );
      })

      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>
          Create a new account. email must be valid and password must be greater
          than 5 characters
        </Text>

        <TextInput
          style={externalCSS.inputBox}
          placeholder="first_name"
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.setState.first_name}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="last_name"
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.setState.last_name}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
          value={this.setState.email}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="password"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
          value={this.setState.password}
        />

        <TouchableHighlight
          style={externalCSS.orangeButton}
          onPress={() => this.signMeIn()}
          underlayColor="#fff"
        >
          <View>
            <Text style={externalCSS.boldWhiteTxt}>Sign Up</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default signup;
