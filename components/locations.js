import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

class locations extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      coffeeDeets: [],
    };
  }

  render() {
    // this.setState({
    //   coffeeDeets: JSON.stringify(this.props.route.params),
    // });
    return (
      <View style={ss.container}>
        <View style={ss.Header}>
          <Text style={ss.title}> {this.props.route.params.location_name}</Text>
          <Text style={ss.text}> {this.props.route.params.location_town}</Text>
        </View>
        <Text style={ss.text}>
          Overall Rating: {this.props.route.params.avg_overall_rating}
        </Text>
        <Text style={ss.text}> {this.props.route.params.avg_price_rating}</Text>
        <Text style={ss.text}>
          {" "}
          {this.props.route.params.avg_quality_rating}
        </Text>
        <Text style={ss.text}>
          {" "}
          {this.props.route.params.avg_clenliness_rating}
        </Text>

        <Text style={ss.title}> Location reviews:</Text>
        {this.props.route.params.location_reviews.map((item, i) => {
          return (
            <Text style={ss.comment} key={i}>
              {item.review_body} - Rating {item.review_overallrating} - Price{" "}
              {item.review_pricerating} - Quality {item.review_qualityrating} -
              Cleanliness - {item.review_clenlinessrating} - {item.likes} Likes
            </Text>
          );
        })}

        <ActivityIndicator size="large" color="#00ff00" />
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
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 24,
    // alignItems: "flex-start",
    alignSelf: "auto",
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
  bold: {
    //add bold text
    fontWeight: "700",
  },
  comment: {
    marginTop: 20,
    fontSize: 20,
    padding: 10,
    backgroundColor: "#bde0fe",
  },
  footer: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});
