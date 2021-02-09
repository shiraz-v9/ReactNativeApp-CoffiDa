import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";

var jsonData;
class loginAsync extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.myFunction = this.myFunction.bind(this);
    this.state = {};

    this.state = {
      token: "",
      email: "",
      password: "",
    };
  }
  myFunction() {
    console.log(this.state.token);
  }
  signedInUser = async () => {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      this.props.navigation.navigate("Home");
    }
  };
  loggedInCoffiDa = async (data) => {
    try {
      await AsyncStorage.setItem("token", data.id + data.token); //passing id with token together
      this.props.navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  logOut = async () => {
    await AsyncStorage.clear();
  };
  checkJSON = async () => {
    // just a way to test my token retrieved
    const value = await AsyncStorage.getItem("token");
    const t = value.substr(1, value.length);
    alert(value + "   " + t);
  };
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
        alert(
          "Welcome back " +
            data.id +
            " you have logged in with token " +
            data.token
        );
        this.setState({
          token: data,
        });
        console.log("Success:", data);
        this.loggedInCoffiDa(data);
      })

      .catch((error) => {
        alert(JSON.stringify(jsonData) + error);
        console.log(error);
      });
  }

  render() {
    const tokk = "ff0d8dc33d9277370b51eb985bd5449e";
    this.signedInUser(); // is asyncstorage is set we want to direct user to HOME with this function.
    const nav = this.props.navigation;
    return (
      <View style={ss.container}>
        <Text style={ss.title}>CoffiDa API ☕</Text>

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
        <View style={ss.btnContainer}>
          <TouchableHighlight
            style={ss.thButton}
            onPress={() => this.loginGetToken()}
            underlayColor="#fff"
          >
            <View>
              <Text style={ss.text}>Login</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={ss.thButton}
            onPress={() => this.checkJSON()}
            underlayColor="#fff"
          >
            <View>
              <Text style={ss.text}>Sign Up</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={ss.clearBtn}
          onPress={() => this.logOut()}
          underlayColor="#fff"
        >
          <View>
            <Text style={ss.text}>clear</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default loginAsync;

const ss = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  text: {
    color: "#fefcfb",
    textAlign: "center",
  },
  clearBtn: {
    marginTop: 100,
    backgroundColor: "#f68e5f",
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 20,
    width: 50,
  },
  thButton: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 150,
  },
});
