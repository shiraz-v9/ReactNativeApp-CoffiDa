import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  ActivityIndicator,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import { externalCSS } from "../style/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/AntDesign";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      locations: [],
      q: "",
      overall_rating: 0,
      price_rating: 0,
      quality_rating: 0,
      clenliness_rating: 0,
      search_in: "",
      limit: "",
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
        alert(JSON.stringify(jsonData) + error);
        console.log(error);
      });
  };

  notSignedIn = async () => {
    const value = await AsyncStorage.getItem("token");
    if (value == null) {
      this.props.navigation.navigate("loginAsync");
      console.log("you're signed out!");
    }
  };

  searchList(list) {
    this.setState({
      search_in: list,
    });
    setTimeout(() => this.search(), 50); //fixes slow rendering issues!
  }

  setLimit(value) {
    this.setState({
      limit: value,
    });
    setTimeout(() => this.search(), 50); //fixes slow rendering issues!
  }

  search() {
    Keyboard.dismiss();
    console.log(
      this.state.overall_rating,
      this.state.price_rating,
      this.state.quality_rating,
      this.state.clenliness_rating,
      " list: ",
      this.state.search_in,
      " limit: ",
      this.state.limit
    );

    var url = "http://10.0.2.2:3333/api/1.0.0/find?";
    if (this.state.q != "") {
      url += "q=" + this.state.q + "&";
    }
    if (this.state.overall_rating > 0) {
      url += "overall_rating=" + this.state.overall_rating + "&";
    }
    if (this.state.price_rating > 0) {
      url += "price_rating=" + this.state.price_rating + "&";
    }
    if (this.state.quality_rating > 0) {
      url += "quality_rating=" + this.state.quality_rating + "&";
    }
    if (this.state.clenliness_rating > 0) {
      url += "clenliness_rating=" + this.state.clenliness_rating + "&";
    }
    if (this.state.search_in != "") {
      url += "search_in=" + this.state.search_in + "&";
    }
    if (this.state.limit != "") {
      url += "limit=" + this.state.limit + "&";
    }
    this.getLocation(url);
  }

  getLocation = async (url) => {
    const token = await AsyncStorage.getItem("token");

    fetch(url, {
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
        // this.getUser();
      })
      .catch((error) => {
        console.log("getLocation() " + error);
      });
  };
  tester = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    console.log(id + " ID and TOKEN AS: " + token);
  };

  getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const asID = await AsyncStorage.getItem("id");

    fetch("http://10.0.2.2:3333/api/1.0.0/user/" + asID, {
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          userData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ratingCompleted(rating, names) {
    console.log("New Rating is: " + rating);
    let stateObj = () => {
      let returnObj = {};
      returnObj[names] = rating;
      return returnObj;
    };
    this.setState(stateObj);

    setTimeout(() => this.search(), 50); //fixes slow rendering issues!
  }

  componentDidMount() {
    this.getUser();
    this.getLocation("http://10.0.2.2:3333/api/1.0.0/find");
    // this.search();
    this.notLoggedIn = this.props.navigation.addListener("focus", () =>
      this.notSignedIn()
    );

    this.autoRefresh = this.props.navigation.addListener("focus", () =>
      this.getLocation("http://10.0.2.2:3333/api/1.0.0/find")
    );
  }

  componentWillUnmount() {
    this.notLoggedIn();
    this.autoRefresh();
    // this.runSearch();
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
          <Text>
            <TouchableHighlight
              // style={ss.thButton}
              onPress={() => this.props.navigation.navigate("Profile")} //RUN FUNCTION
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.title}>
                  Welcome to CoffiDa mr {this.state.userData.last_name} 👋
                </Text>
              </View>
            </TouchableHighlight>
          </Text>
          <Text style={externalCSS.text}>
            Leave reviews and find your favourite coffee place.
          </Text>
          <View>
            <View style={ss.searchView}>
              <TextInput
                style={ss.fieldBox}
                placeholder="Places.. Locations"
                onChangeText={(q) => this.setState({ q })}
                value={this.setState.q}
              />
              <TouchableHighlight
                style={externalCSS.smallButton}
                onPress={() => this.search()}
                underlayColor="#fff"
              >
                <Text style={externalCSS.boldWhiteTxt}>
                  <Icon name="search1" size={18} color="#fff" />
                </Text>
              </TouchableHighlight>
            </View>
            <View>
              <ScrollView horizontal={true}>
                <View style={externalCSS.reviews}>
                  <Text style={externalCSS.text}>Overall</Text>
                  <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Meh", "Nice", "Great"]}
                    onFinishRating={(rating) =>
                      this.ratingCompleted(rating, "overall_rating")
                    }
                    defaultRating={0}
                    size={externalCSS.reviewRating}
                  />
                </View>
                <View style={externalCSS.reviews}>
                  <Text style={externalCSS.text}>Price</Text>
                  <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Meh", "Nice", "Great"]}
                    onFinishRating={(rating) =>
                      this.ratingCompleted(rating, "price_rating")
                    }
                    defaultRating={0}
                    size={externalCSS.reviewRating}
                  />
                </View>
                <View style={externalCSS.reviews}>
                  <Text style={externalCSS.text}>Quality</Text>
                  <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Meh", "Nice", "Great"]}
                    onFinishRating={(rating) =>
                      this.ratingCompleted(rating, "quality_rating")
                    }
                    defaultRating={0}
                    size={externalCSS.reviewRating}
                  />
                </View>
                <View style={externalCSS.reviews}>
                  <Text style={externalCSS.text}>Clenliness</Text>
                  <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Meh", "Nice", "Great"]}
                    onFinishRating={(rating) =>
                      this.ratingCompleted(rating, "clenliness_rating")
                    }
                    defaultRating={0}
                    size={externalCSS.reviewRating}
                  />
                </View>
                <View style={externalCSS.reviews}>
                  <TouchableHighlight
                    style={externalCSS.orangeButton}
                    onPress={() => this.searchList("favourite")}
                    underlayColor="#fff"
                  >
                    <View>
                      <Text style={externalCSS.boldWhiteTxt}>Favourites</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={externalCSS.orangeButton}
                    onPress={() => this.searchList("reviewed")}
                    underlayColor="#fff"
                  >
                    <View>
                      <Text style={externalCSS.boldWhiteTxt}>Reviewed</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={externalCSS.reviews}>
                  <Text>Limit results</Text>
                  <Picker
                    selectedValue={this.state.limit}
                    style={externalCSS.picker}
                    onValueChange={(limit) => this.setLimit(limit)}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                  </Picker>
                </View>
              </ScrollView>
            </View>

            {/* <Rating
              showRating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            /> */}
          </View>
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

          <View style={externalCSS.buttonView}>
            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() => this.logOut()}
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Logout</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={externalCSS.orangeButton}
              onPress={() => this.tester()}
              underlayColor="#fff"
            >
              <View>
                <Text style={externalCSS.boldWhiteTxt}>Test</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

export default HomeScreen;

const ss = StyleSheet.create({
  text: {
    fontSize: 18,
    padding: 10,
  },
  flatList: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e7ecef",
    // paddingBottom: 10,
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldBox: {
    width: 280,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
