import React, { Component } from "react";
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
      latitude: "",
      longitude: "",
      id: "",
      btnText: "next->",
      review: "",
      price: "",
      quality: "",
      clenliness: "",
      placeHolder: "Your review..",
    };
  }

  leaveReview() {
    this.setState({
      id: this.props.route.params.location_id,
    });
    var jsonComment = {
      overall_rating: 4,
      price_rating: 2,
      quality_rating: 3,
      clenliness_rating: 5,
      review_body: "Great coffee, but the bathrooms stank!",
    };
    console.log(
      "Getting id from state..." +
        this.state.id +
        " Posting comment " +
        JSON.stringify(jsonComment)
    );
    // fetch(
    //   "http://10.0.2.2:3333/api/1.0.0/location/" + this.state.id + "/review",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(jsonComment),
    //   }
    // )
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log("SUCCESS 200 OK...");
    //       //run function
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Some Issues encountered" + error);
    //   });
  }
  render() {
    return (
      <View style={ss.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={ss.mapContainer}
          region={{
            latitude: 53.460051,
            longitude: -2.276625,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}
        >
          <Marker
            coordinate={{ latitude: 53.460051, longitude: -2.276625 }}
            title="My Location!"
            description="I am here"
          />
        </MapView>
        <ScrollView>
          <View style={ss.content}>
            <View style={ss.Header}>
              <Text style={ss.title}>
                {""}
                {this.props.route.params.location_name}
              </Text>
              <Text style={ss.text}>
                {""}
                {this.props.route.params.location_town}
              </Text>
            </View>
            <Text style={ss.text}>
              Overall Rating: {this.props.route.params.avg_overall_rating}
            </Text>
            <Text style={ss.text}>
              Price: {this.props.route.params.avg_price_rating}
            </Text>
            <Text style={ss.text}>
              Quality: {this.props.route.params.avg_quality_rating}
            </Text>
            <Text style={ss.text}>
              Cleanliness: {this.props.route.params.avg_clenliness_rating}
            </Text>

            <Text style={ss.title}> Location reviews:</Text>
            {/*⚡ --> Post Comment Section */}
            <View style={ss.inputBtnContainer}>
              <TextInput
                placeholder={this.state.placeHolder}
                onChangeText={(review) => this.setState({ review })}
                value={this.setState.review}
              />
              <TouchableHighlight
                style={ss.thButton}
                onPress={() => this.getReviewData()}
                underlayColor="#fff"
              >
                <View>
                  <Text style={ss.textBtn}>{this.state.btnText}</Text>
                </View>
              </TouchableHighlight>
            </View>
            {this.props.route.params.location_reviews.map((item, i) => {
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
    backgroundColor: "white",
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
    flex: 1,
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
