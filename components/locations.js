import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
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
      heartColour: "",
    };
  }
  changeTitle() {
    this.props.navigation.setOptions({
      title: this.props.route.params.name, //change the title
    });
  }

  likeFunction() {
    if (
      this.state.userFavourites.location_name == this.props.route.params.name
    ) {
      this.setState({
        heartColour: "❤",
      });
    } else {
      this.setState({
        heartColour: "🤍",
      });
    }
    console.log("like function working " + this.props.route.params.name);
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
          userFavourites: responseJson.favourite_locations,
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
          <ScrollView>
            <View style={ss.Header}>
              <Text style={ss.title}>
                {""}
                {this.state.coffeeDeets.location_name}
              </Text>
              <Text style={ss.text}>
                {""}
                {this.state.coffeeDeets.location_town}
              </Text>
              <TouchableOpacity onPress={() => this.favouriteLocation()}>
                <Text style={ss.title}>{this.state.heartColour}</Text>
              </TouchableOpacity>
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

            <Text style={ss.title}> Location reviews:</Text>
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
            {this.state.coffeeDeets.location_reviews.map((item, i) => {
              return (
                <Text style={ss.comment} key={i}>
                  {item.review_body} - Rating {item.overall_rating} - Price{" "}
                  {item.price_rating} - Quality {item.quality_rating} -
                  Cleanliness - {item.clenliness_rating} - {item.likes} Likes
                </Text>
              );
            })}
          </ScrollView>
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
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  sub: {
    fontSize: 26,
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: 10,
  },
  flatList: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: "400",
    color: "black",
  },
  comment: {
    marginTop: 10,
    fontSize: 20,
    padding: 20,
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
