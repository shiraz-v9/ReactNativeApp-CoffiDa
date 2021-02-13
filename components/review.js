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
class review extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      rating: 0,
      price: 0,
      quality: 0,
      clenliness: 0,
      review: "",
    };
  }
  componentDidMount() {
    this.changeTitle();
  }
  changeTitle() {
    this.props.navigation.setOptions({
      title: "Review " + this.props.route.params.location, //change the title
    });
  }

  leaveReview = async () => {
    const token = await AsyncStorage.getItem("token");
    const getId = this.props.route.params.id;
    var jsonReview = {
      overall_rating: parseInt(this.state.rating),
      price_rating: parseInt(this.state.price),
      quality_rating: parseInt(this.state.quality),
      clenliness_rating: parseInt(this.state.clenliness),
      review_body: this.state.review,
    };
    console.log(
      "Getting id..." +
        getId +
        "- location..." +
        " token " +
        token +
        this.props.route.params.location +
        "- Posting comment... " +
        "\n",
      JSON.stringify(jsonReview)
    );

    fetch("http://10.0.2.2:3333/api/1.0.0/location/" + getId + "/review", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Authorization": token },
      body: JSON.stringify(jsonReview),
    })
      .then((response) => {
        if (response.ok) {
          this.props.navigation.navigate("Home");
          console.log("SUCCESS 200 OK...");
        } else {
          console.log("error 401");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some Issues encountered" + error);
      });
  };

  render() {
    return (
      <View style={ss.container}>
        <Text>Your review</Text>
        <TextInput
          placeholder="review"
          onChangeText={(review) => this.setState({ review })}
          value={this.setState.review}
        />
        <TextInput
          placeholder="rating"
          onChangeText={(rating) => this.setState({ rating })}
          value={this.setState.rating}
        />
        <TextInput
          placeholder="price"
          onChangeText={(price) => this.setState({ price })}
          value={this.setState.price}
        />
        <TextInput
          placeholder="quality"
          onChangeText={(quality) => this.setState({ quality })}
          value={this.setState.quality}
        />
        <TextInput
          placeholder="clenliness"
          onChangeText={(clenliness) => this.setState({ clenliness })}
          value={this.setState.clenliness}
        />
        <TouchableHighlight
          style={ss.thButton}
          onPress={() => this.leaveReview()} //RUN FUNCTION
          underlayColor="#fff"
        >
          <View>
            <Text style={ss.textBtn}>Post review</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
export default review;
const ss = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  thButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 120,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
