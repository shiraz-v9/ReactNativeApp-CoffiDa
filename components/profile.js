/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
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
import { externalCSS } from "../style/style";
import * as ImagePicker from "react-native-image-picker";
import IconAnt from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDeets: [],
      favourites: [],
      userPhoto: "",
      isLoading: true,
    };
  }

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
      "Delete",
      "Chose wheter you want to delete review or photo only",
      [
        {
          text: "Cancel",
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

  update(obj) {
    console.log(obj.location.location_id, " ", obj.review.review_id);
    console.log(this.state.userPhoto.uri);

    Alert.alert(
      "Update",
      "Chose wheter you update or attach a photo",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Update Review",
          onPress: () => this.updateReview(obj),
        },
        {
          text: "Add Photo",
          onPress: () => this.pickPhoto(obj),
        },
      ],
      { cancelable: false }
    );
  }

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
    // console.log("hi from update" + JSON.stringify(obj));
    this.props.navigation.navigate("updateReview", obj);
  }

  pickPhoto = async (obj) => {
    console.log("pickPhoto");
    if (this.state.userPhoto.uri == "") {
      ToastAndroid.show("No photo selected..", ToastAndroid.SHORT);
    } else {
      const options = { noData: true };
      console.log(obj.location.location_id, " ", obj.review.review_id);
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          this.setState({
            userPhoto: response,
          });

          this.postPhoto(obj);
        }
      });
    }
  };

  postPhoto = async (obj) => {
    console.log("postPhoto");
    const token = await AsyncStorage.getItem("token");
    return fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        obj.location.location_id +
        "/review/" +
        obj.review.review_id +
        "/photo",
      {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Type": "image/png",
          // "Content-Type": "application/octet-stream",
          "X-Authorization": token,
        },
        body: this.state.userPhoto,
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Comment Updated with Photo");
          ToastAndroid.show("Comment Updated with Photo", ToastAndroid.SHORT);
          this.getUser(); //refresh list
        }
      })

      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

  openPhoto = async (obj) => {
    const token = await AsyncStorage.getItem("token");
    console.log(obj.location.location_id + " " + obj.review.review_id);
    fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        obj.location.location_id +
        "/review/" +
        obj.review.review_id +
        "/photo",
      {
        method: "GET",
        headers: {
          Accept: "image/jpeg",
          Accept: "image/png",
          "X-Authorization": token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("OK.. getting photo");
          this.props.navigation.navigate("Photo", {
            locID: obj.location.location_id,
            revID: obj.review.review_id,
          });
        } else {
          console.log("No Photo found... ignore");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

    logOut = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
      method: "POST",
      headers: { "X-Authorization": token },
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            userData: [],
            locations: [],
          });
          AsyncStorage.clear();
          console.log(
            " Clearing state, logging out... deleting token: " +
              token +
              " id - " +
              id
          );
          this.notSignedIn();
        }
      })

      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

    notSignedIn = async () => {
    const value = await AsyncStorage.getItem("token");
    if (value == null) {
      this.props.navigation.navigate("Login");
      console.log("you're signed out!");
      ToastAndroid.show("you're signed out!", ToastAndroid.SHORT);
    }
  };

  componentDidMount() {
    this.getUser();
    this.autoRefresh = this.props.navigation.addListener("focus", () =>
      this.getUser()
    );
    this.notLoggedIn = this.props.navigation.addListener("focus", () =>
      this.notSignedIn()
    );
  }

  componentWillUnmount() {
    this.autoRefresh();
    this.notLoggedIn();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#1d3557" />
        </View>
      );
    } else {
      return (
        <View style={externalCSS.container}>
          <Text style={externalCSS.title}>My Profile</Text>
          <Text style={externalCSS.text}>
            Name: {this.state.userDeets.first_name}
          </Text>
          <Text style={externalCSS.text}>
            Surname: {this.state.userDeets.last_name}
          </Text>
          <Text style={externalCSS.text}>
            e-mail: {this.state.userDeets.email}
          </Text>
          <View style={externalCSS.buttonView}>
            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() =>
                this.props.navigation.navigate("Update", this.state.userDeets)
              } //RUN FUNCTION
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Update User</Text>
              </View>
            </TouchableHighlight>
                      {/* <View style={externalCSS.buttonView}> */}
            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() => this.logOut()}
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Logout</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={externalCSS.title}>My Favourite Locations:</Text>

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
                    <View style={ss.text}>
                      <Ionicon name="heart-dislike" size={18} />
                    </View>
                  </TouchableHighlight>
                </View>
              )}
              keyExtractor={(item) => item.location_id.toString()}
            />

            <Text style={externalCSS.title}>My Reviews</Text>

            <FlatList
              style={ss.flatList}
              keyExtractor={(item) => item.review.review_id.toString()}
              data={this.state.userDeets.reviews}
              renderItem={({ item }) => (
                <View style={ss.myReview}>
                  <TouchableHighlight
                    onPress={() => this.openPhoto(item)}
                    underlayColor="transparent"
                  >
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
                  </TouchableHighlight>
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
                      <View style={ss.text}>
                        <IconAnt name="delete" size={18} />
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                      // style={ss.touchableBtn}
                      onPress={() => this.update(item)} // RUN FUNCTION
                      underlayColor="#fff"
                    >
                      <View style={ss.text}>
                        <IconAnt name="edit" size={18} />
                      </View>
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
}
export default Profile;
const ss = StyleSheet.create({
  flatList: {
    backgroundColor: "#e7ecef",
    height: 200,
    padding: 10,
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

  image: {
    width: 50,
    height: 50,
  },
});
