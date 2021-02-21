import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
          ToastAndroid.show("Review posted", ToastAndroid.SHORT);
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
      <View style={externalCSS.container}>
        <Text style={externalCSS.title}>Your review</Text>
        <TextInput
          style={externalCSS.inputBox}
          placeholder="review"
          onChangeText={(review) => this.setState({ review })}
          value={this.setState.review}
        />
        {/* <TextInput
          style={externalCSS.inputBox}
          placeholder="rating"
          onChangeText={(rating) => this.setState({ rating })}
          value={this.setState.rating}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="price"
          onChangeText={(price) => this.setState({ price })}
          value={this.setState.price}
        />
        <TextInput
          style={externalCSS.inputBox}
          placeholder="quality"
          onChangeText={(quality) => this.setState({ quality })}
          value={this.setState.quality}
        /> */}
        {/* <TextInput
          style={externalCSS.inputBox}
          placeholder="clenliness"
          onChangeText={(clenliness) => this.setState({ clenliness })}
          value={this.setState.clenliness}
        /> */}
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> Overall Rating</Text>
          <Picker
            selectedValue={this.state.rating}
            style={{ height: 50, width: 200 }}
            onValueChange={(rating) => this.setState({ rating })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> Price</Text>
          <Picker
            selectedValue={this.state.price}
            style={{ height: 50, width: 200 }}
            onValueChange={(price) => this.setState({ price })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> Quality</Text>
          <Picker
            selectedValue={this.state.quality}
            style={{ height: 50, width: 200 }}
            onValueChange={(quality) => this.setState({ quality })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <View style={ss.rowContainer}>
          <Text style={externalCSS.text}> clenliness</Text>
          <Picker
            selectedValue={this.state.clenliness}
            style={{ height: 50, width: 200 }}
            onValueChange={(clenliness) => this.setState({ clenliness })}
          >
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <TouchableHighlight
          style={externalCSS.orangeButton}
          onPress={() => this.leaveReview()} //RUN FUNCTION
          underlayColor="#fff"
        >
          <View>
            <Text style={externalCSS.boldWhiteTxt}>Post review</Text>
          </View>
        </TouchableHighlight>
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
