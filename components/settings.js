import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { externalCSS } from "../style/style";

class Settings extends Component {
  reset() {
    fetch("http://10.0.2.2:3333/api/1.0.0/reset", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Database resetted..");
          ToastAndroid.show("Reset Complete!", ToastAndroid.SHORT);
          AsyncStorage.clear();
          console.log("Asyncstorage cleared..");
          this.props.navigation.navigate("signup");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  resample() {
    fetch("http://10.0.2.2:3333/api/1.0.0/resample", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Database resampled");
          ToastAndroid.show("Database resampled ", ToastAndroid.SHORT);
          this.props.navigation.navigate("signup");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>Settings</Text>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Text style={externalCSS.text}>Reset all values in the database</Text>
          <TouchableHighlight
            style={externalCSS.orangeButton}
            onPress={() => this.reset()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Reset</Text>
            </View>
          </TouchableHighlight>
          <Text style={externalCSS.text}>
            Resample all values in the database
          </Text>
          <TouchableHighlight
            style={externalCSS.orangeButton}
            onPress={() => this.resample()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Resample</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Settings;
