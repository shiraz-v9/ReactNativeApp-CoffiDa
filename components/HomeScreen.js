import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      locations: [],
      id: "",
    };
  }

  logOut = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
      method: "POST",
      headers: { "X-Authorization": token },
    })
      .then((response) => {
        if (response.ok) {
          AsyncStorage.clear();
          console.log("logged out... deleting token: " + token + " id - " + id);
          this.notSignedIn();
        }
      })

      .catch((error) => {
        alert(JSON.stringify(jsonData) + error);
        console.log(error);
      });
  };

  notSignedIn = async () => {
    const value = await AsyncStorage.getItem("token");
    if (value == null) {
      this.props.navigation.navigate("loginAsync");
      console.log("deleted!");
    }
  };

  getLocation = async () => {
    const token = await AsyncStorage.getItem("token");

    fetch("http://10.0.2.2:3333/api/1.0.0/find", {
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          locations: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  tester = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    console.log(+id + " ID and TOKEN AS: " + token);
  };

  getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const asID = await AsyncStorage.getItem("id");
    this.setState({
      id: asID,
    });
    fetch("http://10.0.2.2:3333/api/1.0.0/user/" + asID, {
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.notSignedIn();
    this.getUser();
    this.getLocation();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#f4a261" />
        </View>
      );
    }

    return (
      <View style={ss.container}>
        <Text>
          <TouchableHighlight
            // style={ss.thButton}
            onPress={() => this.props.navigation.navigate("Profile")} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={ss.title}>
                Welcome to CoffiDa mr {this.state.userData.last_name} 👋
              </Text>
            </View>
          </TouchableHighlight>
        </Text>
        <Text>Leave reviews and find your favourite coffee place.</Text>
        <FlatList
          style={ss.flatList}
          data={this.state.locations}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("locations", {
                  item: item.location_id,
                  name: item.location_name,
                  fav: this.state.userData.favourite_locations,
                })
              }
            >
              <Text style={ss.text}>{item.location_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />

        <Button title="logout" onPress={() => this.logOut()} />
        <Button title="TEST" onPress={() => this.tester()} />
        {/* <Button title="signup" onPress={() => nav.navigate("signup")} />
        <Button title="login" onPress={() => nav.navigate("loginAsync")} />
        <Button title="locations" onPress={() => nav.navigate("locations")} /> */}
      </View>
    );
  }
}

export default HomeScreen;

const ss = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "400",
    color: "black",
    padding: 20,
  },
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  flatList: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: "400",
    color: "black",
  },
  bold: {
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
