import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

class locations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello!!!</Text>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
  },
});

export default locations;
