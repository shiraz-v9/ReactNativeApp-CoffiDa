import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Button,
  ToastAndroid,
  TouchableHighlight,
  Image,
} from "react-native";
import update from "immutability-helper";
import { externalCSS } from "../style/style";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

class locations extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      coffeeDeets: [],
      userFavourites: [],
      isLoading: true,
      heartColour: "🤍",
      favList: [],
      comments: [],
      photos: [],
      deleteBtn: "",
      profanityFilter: [],
    };
  }
  changeTitle() {
    this.props.navigation.setOptions({
      title: this.props.route.params.name, //change the title
    });
  }

  likeFunction() {
    var name;
    var i;

    for (
      i = 0;
      i < Object.keys(this.state.userFavourites.favourite_locations).length;
      i++
    ) {
      const location = this.state.userFavourites.favourite_locations[i];
      name = location.location_name;
      this.state.favList.push(name);
      // console.log("returned--  " + this.state.favList[i]);
      if (this.state.favList[i] == this.props.route.params.name) {
        this.setState({
          heartColour: "❤",
          liked: true,
        });
      }
      // else if (this.state.favList[i] != this.props.route.params.name)
      // {
      //   this.setState({
      //     heartColour: "🤍",
      //   });
      // }
    }
  }

  getLocationID = async () => {
    const locID = this.props.route.params.item;
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locID, {
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          coffeeDeets: responseJson,
          comments: responseJson.location_reviews,
          profanityFilter: responseJson.location_reviews,
        });
        console.log(JSON.stringify(this.state.coffeeDeets));
        this.profanityFilter();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getUserFavourite = async () => {
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
          userFavourites: responseJson,
        });
        this.likeFunction();
      })
      .catch((error) => {
        console.error("getUserFavourite() " + error);
      });
  };

  favouriteLocation = async () => {
    const id = this.props.route.params.item;
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3333/api/1.0.0/location/" + id + "/favourite", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            heartColour: "❤",
          });
          ToastAndroid.show(
            this.state.coffeeDeets.location_name + " favourited!",
            ToastAndroid.SHORT
          );
          console.log(this.state.coffeeDeets.location_name + " favourited!");
        } else {
          console.log("error occured...");
        }
      })
      .catch((error) => {
        console.error("favouriteLocation() " + error);
      });
  };

  photoFunc = async (obj) => {
    const token = await AsyncStorage.getItem("token");
    fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        this.state.coffeeDeets.location_id +
        "/review/" +
        obj.review_id +
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
            locID: this.state.coffeeDeets.location_id,
            revID: obj.review_id,
          });
        } else {
          console.log("No Photo found... ignore");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  likeComments = async (revID) => {
    const token = await AsyncStorage.getItem("token");
    const id = this.props.route.params.item;
    fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        id +
        "/review/" +
        revID +
        "/like",
      {
        method: "POST",
        headers: { "X-Authorization": token },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Comment Liked");
          ToastAndroid.show("Comment Liked", ToastAndroid.SHORT);
          this.getLocationID(); //refresh
        }
      })

      .catch((error) => {
        console.log("likecomment() " + error);
      });
  };
  dislikeComments = async (revID) => {
    const token = await AsyncStorage.getItem("token");
    const id = this.props.route.params.item;
    // console.log("hi " + revID + " location " + id); //test
    fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        id +
        "/review/" +
        revID +
        "/like",
      {
        method: "DELETE",
        headers: { "X-Authorization": token },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Like Removed");
          ToastAndroid.show("Like Removed!", ToastAndroid.SHORT);
          this.getLocationID(); //refresh
        }
      })

      .catch((error) => {
        console.log("dislikeComments() " + error);
      });
  };

  profanityFilter() {
    var x = this.state.coffeeDeets;
    console.log(JSON.stringify(this.state.comments));
    var locations = Object.keys(this.state.coffeeDeets).length; //llocation number
    var i, y;
    var reviewcount;
    var CountReview = Object.keys(this.state.coffeeDeets.location_reviews)
      .length;

    for (var i = 0; i < CountReview; i++) {
      var z = this.state.coffeeDeets.location_reviews[i].review_body;
      console.log("REVIEWS : ", z, " \n");

      if (z.includes("Grim")) {
        console.log("true");
        let index = i;
        let profanityFilter = update(this.state.comments, {
          [index]: {
            review_body: { $set: " **** " },
          },
        });
        this.setState({ profanityFilter });
        console.log(profanityFilter);
      }
    }
  }

  componentDidMount() {
    this.getLocationID();
    this.changeTitle();
    this.getUserFavourite();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#1d3557" />
        </View>
      );
    }
    return (
      <View style={ss.content}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={ss.content}
          region={{
            latitude: this.state.coffeeDeets.latitude,
            longitude: this.state.coffeeDeets.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.coffeeDeets.latitude,
              longitude: this.state.coffeeDeets.longitude,
            }}
            title={this.state.coffeeDeets.location_name}
            description="Come and find Us!"
          />
        </MapView>

        <View style={ss.scrollView}>
          <View style={ss.Header}>
            <Text style={externalCSS.title}>
              {this.state.coffeeDeets.location_name}
            </Text>
            <Text style={externalCSS.text}>
              {this.state.coffeeDeets.location_town}
            </Text>
            <TouchableOpacity onPress={() => this.favouriteLocation()}>
              <Text style={externalCSS.title}>{this.state.heartColour}</Text>
            </TouchableOpacity>
          </View>
          <Text style={externalCSS.text}>
            Overall Rating: {this.state.coffeeDeets.avg_overall_rating}
          </Text>
          <Text style={externalCSS.text}>
            Price: {this.state.coffeeDeets.avg_price_rating}
          </Text>
          <Text style={externalCSS.text}>
            Quality: {this.state.coffeeDeets.avg_quality_rating}
          </Text>
          <Text style={externalCSS.text}>
            Cleanliness: {this.state.coffeeDeets.avg_clenliness_rating}
          </Text>
          <View style={ss.sub}>
            <Text style={externalCSS.title}>Reviews</Text>
            {/*⚡ --> Post Comment Section */}
            <View style={ss.inputBtnContainer}>
              <TouchableHighlight
                style={externalCSS.orangeButton}
                onPress={() =>
                  this.props.navigation.navigate("review", {
                    id: this.state.coffeeDeets.location_id,
                    location: this.state.coffeeDeets.location_name,
                  })
                }
                underlayColor="#fff"
              >
                <View>
                  <Text style={externalCSS.boldWhiteTxt}> Leave a review </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <FlatList
            data={this.state.profanityFilter}
            renderItem={({ item }) => (
              <View style={ss.comment}>
                <View style={ss.rowPhotoBody}>
                  <TouchableHighlight
                    onPress={() => this.photoFunc(item)}
                    underlayColor="transparent"
                  >
                    <Image
                      style={ss.image}
                      source={{
                        uri:
                          "http://10.0.2.2:3333/api/1.0.0/location/" +
                          this.state.coffeeDeets.location_id +
                          "/review/" +
                          item.review_id +
                          "/photo?timestamp=" +
                          Date.now(),
                      }}
                    />
                  </TouchableHighlight>
                  <Text style={externalCSS.text}>{item.review_body}</Text>
                </View>
                <Text style={ss.flatList}>
                  ⭐{item.overall_rating} 💲{item.price_rating} 🍽
                  {item.quality_rating} 🧹{item.clenliness_rating}{" "}
                </Text>

                <View style={ss.inputBtnContainer}>
                  {/* BUTTON VIEW ⚠ */}
                  <Text style={externalCSS.text}>
                    👍
                    {item.likes}
                  </Text>
                  <Button
                    onPress={() => this.likeComments(item.review_id)}
                    title="👍"
                  />
                  <Button
                    onPress={() => this.dislikeComments(item.review_id)}
                    title="👎"
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
            // extraData={this.state.comments}
          />
          {/* <FlatList
            data={this.state.profanityFilter}
            renderItem={({ item }) => (
              <View style={ss.comment}>
                <View style={ss.rowPhotoBody}>
                  <Text style={externalCSS.text}>{item.review_body}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
            // extraData={this.state.comments}
          /> */}
        </View>
      </View>
    );
  }
}

export default locations;

const ss = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 4,
    paddingHorizontal: 24,
  },
  sub: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: 10,
  },
  flatList: {
    //CENTERED
    fontSize: 18,
    textAlign: "center",
  },
  comment: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#e7ecef",
  },
  rowPhotoBody: {
    flexDirection: "row",
    width: 300,
  },
  inputBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
});
