/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { externalCSS } from "../style/style";

var jsonData;
class loginAsync extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      token: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    this.signedInUser();
  }

  signedInUser = async () => {
    var value = await AsyncStorage.getItem("token");
    if (value !== null) {
      this.props.navigation.navigate("Home");
    }
  };

  loggedInCoffiDa = async (data) => {
    try {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("id", JSON.stringify(data.id));
      this.props.navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  logOut = async () => {
    await AsyncStorage.clear();
  };

  checkJSON = async () => {
    const value = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");

    console.log(
      "here- " +
        this.state.email +
        this.state.password +
        "token " +
        value +
        " id " +
        id
    );
  };

  // didUserSignUp() { // AUTO sign in - WILL impolemented later!! ⚡⚡ Put this in render aswell
  //   // const { email, password } = this.props.route.params;
  //   if (this.props.route.params !== undefined) {
  //     this.setState({
  //       email: this.props.route.params.email,
  //       password: this.props.route.params.password,
  //     });
  //     this.loginGetToken();
  //   }
  // }
  // componentDidMount() {
  //   this.didUserSignUp();
  // }

  loginGetToken() {
    jsonData = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        Keyboard.dismiss();
        console.log("Welcome back you have logged in with token " + data.token);
        this.setState({
          token: data,
        });
        console.log("Success:", data);
        this.loggedInCoffiDa(data);
      })

      .catch((error) => {
        ToastAndroid.show(
          "Something went wrong check your details again",
          ToastAndroid.SHORT
        );
        console.log(error);
      });
  }

  render() {
    this.signedInUser(); // is asyncstorage is set we want to direct user to HOME with this function.
    const nav = this.props.navigation;
    return (
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>CoffiDa API ☕</Text>
        <View style={ss.centeredView}>
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
          <View style={ss.btnContainer}>
            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() => this.loginGetToken()}
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Login</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() => nav.navigate("signup")}
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Sign Up</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() => this.props.navigation.navigate("Settings")} //RUN FUNCTION
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Settings</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

export default loginAsync;

const ss = StyleSheet.create({
  btnContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  clearBtn: {
    marginTop: 100,
    backgroundColor: "#f68e5f",
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 20,
    width: 50,
  },

  centeredView: {
    display: "flex",
    alignContent: "stretch",
  },
});
