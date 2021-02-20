import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  ToastAndroid,
  FlatList,
  TouchableHighlight,
} from "react-native";

class Profile extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {
      userDeets: [],
      favourites: [],
      // myComments: [],
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteReview = async (loc_id, rev_id) => {
    console.log("comment deets: " + loc_id + " " + rev_id);
    Alert.alert(
      "Alert Title",
      "Chose wheter you want to delete review or photo only",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
        {
          text: "Delete Review",
          onPress: () => this.reviewDelete(loc_id, rev_id),
        },
        {
          text: "Remove Photo",
          onPress: () => this.photoDelete(loc_id, rev_id),
        },
      ],
      { cancelable: false }
    );
  };

  reviewDelete = async (loc_id, rev_id) => {
    const token = await AsyncStorage.getItem("token");
    fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" + loc_id + "/review/" + rev_id,
      {
        method: "DELETE",
        headers: { "X-Authorization": token },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Review deleted");
          ToastAndroid.show("Review deleted", ToastAndroid.SHORT);
          this.getUser(); //refresh
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  photoDelete = async (loc_id, rev_id) => {
    console.log(loc_id, rev_id);
    const token = await AsyncStorage.getItem("token");
    fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        loc_id +
        "/review/" +
        rev_id +
        "/photo",
      {
        method: "DELETE",
        headers: { "X-Authorization": token },
      }
    )
      .then((response) => {
        if (response.ok) {
          ToastAndroid.show("Photo Deleted", ToastAndroid.SHORT);
          console.log("Photo Deleted");
          this.getUser();
        } else console.log("different code errorrs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateReview(obj) {
    console.log("hi from update" + JSON.stringify(obj));
    this.props.navigation.navigate("updateReview", obj);
  }

  unFavouriteLocation = async (obj) => {
    const locID = obj.location_id;
    const location = obj.location_name;
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locID + "/favourite", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(location + " un-Favourited!");
          ToastAndroid.show(location + " un-Favourited!", ToastAndroid.SHORT);
          this.getUser();
        } else {
          console.log("error occured...");
        }
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
        <Text style={ss.title}>My Profile</Text>
        <Text style={ss.text}>Name: {this.state.userDeets.first_name}</Text>
        <Text style={ss.text}>Surname: {this.state.userDeets.last_name}</Text>
        <Text style={ss.text}>e-mail: {this.state.userDeets.email}</Text>
        <View style={ss.btnContainer}>
          <TouchableHighlight
            style={ss.thButton}
            onPress={() => this.props.navigation.navigate("Update")} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={ss.touchableBtn}>Update User</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <Text style={ss.title}>My Favourite Locations:</Text>

          <FlatList
            style={ss.flatList}
            data={this.state.userDeets.favourite_locations}
            renderItem={({ item }) => (
              <View style={ss.myReview}>
                <Text style={ss.ftext}>{item.location_name}</Text>
                <TouchableHighlight
                  style={ss.tHighlight}
                  onPress={() => this.unFavouriteLocation(item)} //RUN FUNCTION
                  underlayColor="#fff"
                >
                  <Text style={ss.text}>Remove</Text>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={(item) => item.location_id.toString()}
          />

          <Text style={ss.title}>My Reviews</Text>

          <FlatList
            style={ss.flatList}
            keyExtractor={(item) => item.review.review_id.toString()}
            data={this.state.userDeets.reviews}
            renderItem={({ item }) => (
              <View style={ss.myReview}>
                <Image
                  style={ss.image}
                  source={{
                    uri:
                      "http://10.0.2.2:3333/api/1.0.0/location/" +
                      item.location.location_id +
                      "/review/" +
                      item.review.review_id +
                      "/photo?timestamp=" +
                      Date.now(),
                  }}
                />
                <Text style={ss.ftext}>{item.review.review_body}</Text>
                <View style={ss.tHighlight}>
                  <TouchableHighlight
                    // style={ss.touchableBtn}
                    onPress={() =>
                      this.deleteReview(
                        item.location.location_id,
                        item.review.review_id
                      )
                    } //RUN FUNCTION
                    underlayColor="#fff"
                  >
                    <Text style={ss.text}>Delete</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    // style={ss.touchableBtn}
                    onPress={() => this.updateReview(item)} //RUN FUNCTION
                    underlayColor="#fff"
                  >
                    <Text style={ss.text}>Update</Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
export default Profile;
const ss = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  flatList: {
    backgroundColor: "#e7ecef",
    height: 230,
    padding: 10,
  },
  thButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 100,
  },
  myReview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tHighlight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
    padding: 10,
  },
  ftext: {
    fontSize: 18,
    color: "black",
    padding: 10,
    width: 180, //fixed dimensions for text don't chnage
  },
  touchableBtn: {
    color: "white",
    fontWeight: "bold",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "black",
  },
  image: {
    width: 50,
    height: 50,
  },
});
