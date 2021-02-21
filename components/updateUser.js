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
import { externalCSS } from "../style/style";
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
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>Update my profile</Text>

        <TextInput
          style={externalCSS.inputBox}
          placeholder="new Name"
          onChangeText={(newName) => this.setState({ newName })}
          value={this.setState.newName}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="new Surname"
          onChangeText={(newSurname) => this.setState({ newSurname })}
          value={this.setState.newSurname}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="new Email"
          onChangeText={(newEmail) => this.setState({ newEmail })}
          value={this.setState.newEmail}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="new Password"
          secureTextEntry
          onChangeText={(newPassword) => this.setState({ newPassword })}
          value={this.setState.newPassword}
        />
        <TouchableHighlight
          style={externalCSS.orangeButton}
          onPress={() => this.updateUser()} //RUN FUNCTION
          underlayColor="#fff"
        >
          <View>
            <Text style={externalCSS.boldWhiteTxt}>Update</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Update;
