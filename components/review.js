/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { externalCSS } from "../style/style";

class review extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      rating: 0,
      price: 0,
      quality: 0,
      clenliness: 0,
      review: "",
      userPhoto: "",
    };
  }
  
  changeTitle() {
    this.props.navigation.setOptions({
      title: "Review " + this.props.route.params.location, 
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
    if (this.state.review === "") {
      ToastAndroid.show("Complete the review first ", ToastAndroid.LONG);
    } else {
      fetch("http://10.0.2.2:3333/api/1.0.0/location/" + getId + "/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
        body: JSON.stringify(jsonReview),
      })
        .then((response) => {
          if (response.ok) {
            this.props.navigation.navigate("Home");
            console.log("SUCCESS 200 OK...");
            ToastAndroid.show("Review posted", ToastAndroid.SHORT);
          } else {
            console.log("error code");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Some Issues encountered" + error);
        });
    }
  };

  componentDidMount() {
    this.changeTitle();
  }

  render() {
    return (
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>Your review</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder="review"
          onChangeText={(review) => this.setState({ review })}
          value={this.setState.review}
        />
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> Overall Rating</Text>
          <Picker
            selectedValue={this.state.rating}
            style={externalCSS.picker}
            onValueChange={(rating) => this.setState({ rating })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="⭐" value="1" />
            <Picker.Item label="⭐⭐" value="2" />
            <Picker.Item label="⭐⭐⭐" value="3" />
            <Picker.Item label="⭐⭐⭐⭐" value="4" />
            <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
          </Picker>
        </View>
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> Price</Text>
          <Picker
            selectedValue={this.state.price}
            style={externalCSS.picker}
            onValueChange={(price) => this.setState({ price })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="⭐" value="1" />
            <Picker.Item label="⭐⭐" value="2" />
            <Picker.Item label="⭐⭐⭐" value="3" />
            <Picker.Item label="⭐⭐⭐⭐" value="4" />
            <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
          </Picker>
        </View>
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> Quality</Text>
          <Picker
            selectedValue={this.state.quality}
            style={externalCSS.picker}
            onValueChange={(quality) => this.setState({ quality })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="⭐" value="1" />
            <Picker.Item label="⭐⭐" value="2" />
            <Picker.Item label="⭐⭐⭐" value="3" />
            <Picker.Item label="⭐⭐⭐⭐" value="4" />
            <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
          </Picker>
        </View>
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> clenliness</Text>
          <Picker
            selectedValue={this.state.clenliness}
            style={externalCSS.picker}
            onValueChange={(clenliness) => this.setState({ clenliness })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="⭐" value="1" />
            <Picker.Item label="⭐⭐" value="2" />
            <Picker.Item label="⭐⭐⭐" value="3" />
            <Picker.Item label="⭐⭐⭐⭐" value="4" />
            <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
          </Picker>
        </View>
        <View style={externalCSS.buttonView}>
          <TouchableHighlight
            style={externalCSS.orangeButton}
            onPress={() => this.leaveReview()} // RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Post Review</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default review;

const ss = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
