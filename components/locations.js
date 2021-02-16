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
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
    const id = this.props.route.params.item;
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3333/api/1.0.0/location/" + id, {
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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserFavourite = async () => {
    //this is used for the like unlike location feature!
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
        console.log("getUserFavourite 200 OK");
        this.likeFunction();
      })
      .catch((error) => {
        console.log(error);
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
          console.log(
            "Location: " + this.state.coffeeDeets.location_name + " favourited!"
          );
        } else {
          console.log("error occured...");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  unFavouriteLocation = async () => {
    const id = this.props.route.params.item;
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3333/api/1.0.0/location/" + id + "/favourite", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(
            "Location: " + this.state.coffeeDeets.location_name + " favourited!"
          );
        } else {
          console.log("error occured...");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  likeComments() {
    console.log("hello ");
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
          <ActivityIndicator size="large" color="#f4a261" />
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
            <TouchableOpacity onPress={() => this.favouriteLocation()}>
              <Text style={ss.title}>{this.state.heartColour}</Text>
            </TouchableOpacity>
            <Text style={ss.title}>{this.state.coffeeDeets.location_name}</Text>
            <Text style={ss.text}>{this.state.coffeeDeets.location_town}</Text>
          </View>
          <Text style={ss.text}>
            Overall Rating: {this.state.coffeeDeets.avg_overall_rating}
          </Text>
          <Text style={ss.text}>
            Price: {this.state.coffeeDeets.avg_price_rating}
          </Text>
          <Text style={ss.text}>
            Quality: {this.state.coffeeDeets.avg_quality_rating}
          </Text>
          <Text style={ss.text}>
            Cleanliness: {this.state.coffeeDeets.avg_clenliness_rating}
          </Text>
          <View style={ss.sub}>
            <Text style={ss.title}>Reviews</Text>
            {/*⚡ --> Post Comment Section */}
            <View style={ss.inputBtnContainer}>
              <TouchableHighlight
                style={ss.thButton}
                onPress={() =>
                  this.props.navigation.navigate("review", {
                    id: this.state.coffeeDeets.location_id,
                    location: this.state.coffeeDeets.location_name,
                  })
                }
                underlayColor="#fff"
              >
                <View>
                  <Text style={ss.textBtn}> Leave a review </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <FlatList
            data={this.state.comments}
            renderItem={({ item }) => (
              <View style={ss.comment}>
                <Text style={ss.flatList}>{item.review_body}</Text>
                <Text style={ss.flatList}>
                  ⭐{item.overall_rating} 💲{item.price_rating} 🍽
                  {item.quality_rating} 🧹{item.clenliness_rating} 👍
                  {item.likes}
                </Text>

                <Button onPress={() => this.likeComments()} title="Like" />
              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
            extraData={this.state.comments}
          />
        </View>
      </View>
    );
  }
}

export default locations;

const ss = StyleSheet.create({
  scrollView: {
    flex: 3,
    paddingHorizontal: 20,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  text: {
    fontSize: 22,
    fontWeight: "400",
    color: "black",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  sub: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // alignItems: "baseline",
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: 10,
  },
  flatList: {
    fontSize: 20,
    textAlign: "center",
  },
  comment: {
    marginTop: 10,
    fontSize: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f6bd60",
  },
  content: {
    flex: 1,
  },
  inputBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  thButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 150,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
