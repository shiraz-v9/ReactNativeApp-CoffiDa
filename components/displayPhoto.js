import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

class Photo extends Component {
  //start my state
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={ss.content}>
        <Image
          style={ss.image}
          source={{
            uri:
              "http://10.0.2.2:3333/api/1.0.0/location/" +
              this.props.route.params.locID +
              "/review/" +
              this.props.route.params.revID +
              "/photo?timestamp=" +
              Date.now(),
          }}
        />
      </View>
    );
  }
}

export default Photo;

const ss = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: 350,
    height: 350,
  },
});
