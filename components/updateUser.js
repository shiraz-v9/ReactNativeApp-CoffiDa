import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      newSurname: "",
      newEmail: "",
      newPassword: "",
    };
  }
  updateUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const asID = await AsyncStorage.getItem("id");

    fetch("http://10.0.2.2:3333/api/1.0.0/user/" + asID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        first_name: this.state.newName,
        last_name: this.state.newSurname,
        email: this.state.newEmail,
        password: this.state.newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          this.props.navigation.navigate("Home");
          console.log("SUCCESS 200 OK...profile updated");
        } else {
          console.log("error 401");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={ss.container}>
        <Text>Update user information</Text>

        <TextInput
          placeholder="new Name"
          onChangeText={(newName) => this.setState({ newName })}
          value={this.setState.newName}
        />
        <TextInput
          placeholder="new Surname"
          onChangeText={(newSurname) => this.setState({ newSurname })}
          value={this.setState.newSurname}
        />
        <TextInput
          placeholder="new Email"
          onChangeText={(newEmail) => this.setState({ newEmail })}
          value={this.setState.newEmail}
        />
        <TextInput
          placeholder="new Password"
          secureTextEntry
          onChangeText={(newPassword) => this.setState({ newPassword })}
          value={this.setState.newPassword}
        />
        <TouchableHighlight
          style={ss.thButton}
          onPress={() => this.updateUser()} //RUN FUNCTION
          underlayColor="#fff"
        >
          <View>
            <Text style={ss.textBtn}>Update</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Update;

const ss = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  thButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 120,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
