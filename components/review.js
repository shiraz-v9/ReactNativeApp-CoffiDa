import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
  Image,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { externalCSS } from "../style/style";
import * as ImagePicker from "react-native-image-picker";

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
      userPhoto: "",
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

  imagePick = () => {
    if (this.state.review === "") {
      ToastAndroid.show("Complete the review first ", ToastAndroid.LONG);
    } else {
      const options = { mediaType: "photo" };

      ImagePicker.launchImageLibrary(options, (res) => {
        // console.log("hey", res);
        if (res.uri) {
          this.setState({
            userPhoto: res,
          });
          console.log("state--> ", this.state.userPhoto);
        }
      });
    }
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
            onPress={() => this.leaveReview()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Post Review</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={externalCSS.orangeButton}
            onPress={() => this.imagePick()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Add Photo</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Image
          style={{ width: 350, height: 350 }}
          source={{ uri: this.state.userPhoto.uri }}
        />
        {/* </View> */}
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
