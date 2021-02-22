import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { externalCSS } from "../style/style";
import { Picker } from "@react-native-picker/picker";

class review extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      rating: this.props.route.params.review.overall_rating,
      price: this.props.route.params.review.price_rating,
      quality: this.props.route.params.review.quality_rating,
      clenliness: this.props.route.params.review.clenliness_rating,
      review: "",
      userPhoto: "",
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
    if (jsonReview.review_body == "" || jsonReview.review_body == " ") {
      ToastAndroid.show("Review cannot be empty!", ToastAndroid.LONG);
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
            this.uploadPhoto(locID, revID, token);
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

  uploadPhoto(locID, revID, token) {
    if (this.state.userPhoto.uri == "") {
      ToastAndroid.show("No photo selected..", ToastAndroid.SHORT);
    } else {
      console.log(locID, revID, token);
      fetch(
        "http://10.0.2.2:3333/api/1.0.0/location/" +
          locID +
          "/review/" +
          revID +
          "/photo",
        {
          method: "POST",
          headers: {
            Accept: "image/jpeg",
            Accept: "image/png",
            "X-Authorization": token,
          },
          body: JSON.stringify(this.state.userPhoto),
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("Comment Updated with Photo");
            ToastAndroid.show("Comment Updated with Photo", ToastAndroid.SHORT);
          }
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }

  imagePick = () => {
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
        <View style={externalCSS.rowContainer}>
          <Text style={externalCSS.text}> Overall Rating</Text>
          <Picker
            selectedValue={this.state.rating.toString()}
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
        <View style={externalCSS.rowContainer}>
          <Text style={externalCSS.text}> Price</Text>
          <Picker
            selectedValue={this.state.price.toString()}
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
        <View style={externalCSS.rowContainer}>
          <Text style={externalCSS.text}> Quality</Text>
          <Picker
            selectedValue={this.state.quality.toString()}
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
        <View style={externalCSS.rowContainer}>
          <Text style={externalCSS.text}> clenliness</Text>
          <Picker
            selectedValue={this.state.clenliness.toString()}
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
            onPress={() => this.updateReview()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Update review</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={externalCSS.orangeButton}
            onPress={() => this.imagePick()} //RUN FUNCTION
            underlayColor="#fff"
          >
            <View>
              <Text style={externalCSS.boldWhiteTxt}>Attach Photo</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Image
          style={{ width: 70, height: 70 }}
          source={{ uri: this.state.userPhoto.uri }}
        />
      </View>
    );
  }
}
export default review;
