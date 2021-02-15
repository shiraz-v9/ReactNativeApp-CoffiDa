import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
class Profile extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {
      userDeets: [],
      favourites: [],
    };
  }

  //GET USER
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
          userDeets: responseJson,
          favourites: responseJson.favourite_locations,
        });
        console.log("Get User() fetched. Response 200");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <View style={ss.container}>
        <Text>Your Profile</Text>
        <Text>Name: {this.state.userDeets.first_name}</Text>
        <Text>Surname: {this.state.userDeets.last_name}</Text>
        <Text>e-mail: {this.state.userDeets.email}</Text>
        <View style={ss.btnContainer}>
          <TouchableHighlight
            style={ss.thButton}
            onPress={() => this.props.navigation.navigate("Update")} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={ss.textBtn}>Update User</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text>My Favourite Locations:</Text>

        <FlatList
          style={ss.flatList}
          data={this.state.favourites}
          renderItem={({ item }) => (
            <Text style={ss.text}>{item.location_name}</Text>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    );
  }
}
export default Profile;
const ss = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  thButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 120,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    padding: 10,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  flatList: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: "400",
    color: "black",
  },
});
