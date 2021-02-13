import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
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
      isLoading: true,
    };
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
  componentDidMount() {
    this.getLocationID();
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
          style={ss.mapContainer}
          region={{
            latitude: this.state.coffeeDeets.latitude,
            longitude: this.state.coffeeDeets.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
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
        <ScrollView>
          <View style={ss.scrollView}>
            <View style={ss.Header}>
              <Text style={ss.title}>
                {""}
                {this.state.coffeeDeets.location_name}
              </Text>
              <Text style={ss.text}>
                {""}
                {this.state.coffeeDeets.location_town}
              </Text>
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
              <Text>Leave a review</Text>
              {/* <TextInput
                placeholder={this.state.placeHolder}
                onChangeText={(review) => this.setState({ review })}
                value={this.setState.review}
              /> */}
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
                  <Text style={ss.textBtn}> -- </Text>
                </View>
              </TouchableHighlight>
            </View>
            {this.state.coffeeDeets.location_reviews.map((item, i) => {
              return (
                <Text style={ss.comment} key={i}>
                  {item.review_body} - Rating {item.review_overallrating} -
                  Price {item.review_pricerating} - Quality{" "}
                  {item.review_qualityrating} - Cleanliness -{" "}
                  {item.review_clenlinessrating} - {item.likes} Likes
                </Text>
              );
              // this.setState({
              //   latitude: "d",
              //   longitude: "s",
              // });
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default locations;

const ss = StyleSheet.create({
  scrollView: {
    flex: 2,
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
  mapContainer: {
    flex: 1,
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
    // flex: 50,
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
    marginBottom: 20,
    backgroundColor: "#f6bd60",
  },
  content: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 20,
  },

  inputBtnContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 70,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
