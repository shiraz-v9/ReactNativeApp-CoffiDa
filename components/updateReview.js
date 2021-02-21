import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TextInput,
  TouchableHighlight,
} from "react-native";

import { externalCSS } from "../style/style";

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
      title:
        "Update your review for " +
        this.props.route.params.location.location_name, //change the title
    });
  }

  updateReview = async () => {
    console.log(
      "update? " +
        this.state.review +
        this.state.rating +
        this.state.price +
        this.state.quality +
        this.state.clenliness
    );

    var jsonReview = {
      overall_rating: parseInt(this.state.rating),
      price_rating: parseInt(this.state.price),
      quality_rating: parseInt(this.state.quality),
      clenliness_rating: parseInt(this.state.clenliness),
      review_body: this.state.review,
    };
    if (jsonReview.review_body == "") {
      ToastAndroid.show("Review connot be empty!", ToastAndroid.SHORT);
    } else {
      const revID = this.props.route.params.review.review_id;
      const locID = this.props.route.params.location.location_id;
      const token = await AsyncStorage.getItem("token");
      fetch(
        "http://10.0.2.2:3333/api/1.0.0/location/" + locID + "/review/" + revID,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
          body: JSON.stringify(jsonReview),
        }
      )
        .then((response) => {
          if (response.ok) {
            this.props.navigation.navigate("Home");
            console.log("Review updated");
            ToastAndroid.show("Review updated", ToastAndroid.SHORT);
            this.props.navigation.navigate("Profile");
          } else {
            console.log("error 401");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>Your review</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder={this.props.route.params.review.review_body.toString()}
          onChangeText={(review) => this.setState({ review })}
          value={this.setState.review}
        />
        <Text style={externalCSS.text}>Overall rating</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder={this.props.route.params.review.overall_rating.toString()}
          onChangeText={(rating) => this.setState({ rating })}
          value={this.setState.rating}
        />
        <Text style={externalCSS.text}>Price rating</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder={this.props.route.params.review.price_rating.toString()}
          onChangeText={(price) => this.setState({ price })}
          value={this.setState.price}
        />
        <Text style={externalCSS.text}>Quality rating</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder={this.props.route.params.review.quality_rating.toString()}
          onChangeText={(quality) => this.setState({ quality })}
          value={this.setState.quality}
        />
        <Text style={externalCSS.text}>Clenliness rating</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder={this.props.route.params.review.clenliness_rating.toString()}
          onChangeText={(clenliness) => this.setState({ clenliness })}
          value={this.setState.clenliness}
        />
        <TouchableHighlight
          style={externalCSS.orangeButton}
          onPress={() => this.updateReview()} //RUN FUNCTION
          underlayColor="#fff"
        >
          <View>
            <Text style={externalCSS.boldWhiteTxt}>Update review</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
export default review;
