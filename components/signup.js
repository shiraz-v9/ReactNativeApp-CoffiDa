import React, { Component } from "react";
import { Text, TextInput, View, Button, Alert, StyleSheet } from "react-native";

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
      // person: { name: "John", age: 31, city: "New York" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("ID: " + data.user_id);
        this.setState({
          id: data.user_id,
        });
        console.log("Success, ID created... ", data.user_id);
        this.props.navigation.navigate(
          "loginAsync",
          JSON.stringify(jsonUserData)
        );
      })

      .catch((error) => {
        alert(error + JSON.stringify(jsonUserData));
        console.log(error);
      });
  }
  // passParams() {
  //   this.props.navigation.navigate("loginAsync", this.state.person);
  // }
  render() {
    const nav = this.props.navigation;
    return (
      <View style={ss.container}>
        <Text>
          Create a new account. email must be valid and password must be greater
          than 5 characters
        </Text>

        <TextInput
          placeholder="first_name"
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.setState.first_name}
        />
        <TextInput
          placeholder="last_name"
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.setState.last_name}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
          value={this.setState.email}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
          value={this.setState.password}
        />
        <Button title="Sign Up" onPress={() => this.signMeIn()} />
        <Button title="◀ Back" onPress={() => nav.goBack()} />
        <Button title="test params" onPress={() => this.passParams()} />
      </View>
    );
  }
}

export default signup;

const ss = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "white",
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "black",
  },
  highlight: {
    //add bold text
    fontWeight: "700",
  },
  footer: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});
