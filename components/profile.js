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
      myComments: [],
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
        console.log("Get User() fetched. Response 200 ");
        this.getReview();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Reviews
  getReview() {
    var length = Object.keys(this.state.userDeets.reviews).length;
    var i;
    var newState = [];
    var ids = [];
    var add;
    for (i = 0; i < length; i++) {
      console.log(
        this.state.userDeets.reviews[i].review.review_body +
          " id " +
          this.state.userDeets.reviews[i].review.review_id
      );
      newState.push(this.state.userDeets.reviews[i].review.review_body);
      ids.push(this.state.userDeets.reviews[i].review.review_id);
      // add.push([
      //   {
      //     id: this.state.userDeets.reviews[i].review.review_id,
      //     comment: this.state.userDeets.reviews[i].review.review_body,
      //   },
      // ]);
    }
    this.setState({
      myComments: { comment: { id: ids, review: newState } },
    });
    console.log("hi " + JSON.stringify(this.state.myComments));
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <View style={ss.container}>
        <Text style={ss.title}>Your Profile</Text>
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
        <View>
          <Text style={ss.title}>My Favourite Locations:</Text>

          <FlatList
            style={ss.flatList}
            data={this.state.favourites}
            renderItem={({ item }) => (
              <Text style={ss.text}>{item.location_name}</Text>
            )}
            keyExtractor={(item) => item.location_id.toString()}
          />

          <Text style={ss.title}>My Reviews</Text>

          <FlatList
            data={this.state.userDeets}
            renderItem={({ item }) => (
              <Text style={ss.text}>{item.review_body}</Text>
            )}
            keyExtractor={(item) => item.review_id.toString()}
          />

          <TouchableHighlight
            style={ss.thButton}
            onPress={() => this.getReview()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={ss.textBtn}>Run LOG!</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default Profile;
const ss = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 32,
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
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
});
