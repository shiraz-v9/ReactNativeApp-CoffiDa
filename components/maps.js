import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { externalCSS } from "../style/style";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
class Maps extends Component {
  //start my state
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("from maps page ", JSON.stringify(this.props.route.params));
    console.log(this.props.route.params.obj);
  }

  render() {
    return (
      <View style={ss.map}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={externalCSS.container}
          region={{
            latitude: this.props.route.params.lat,
            longitude: this.props.route.params.lon,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker
            coordinate={{
              latitude: this.props.route.params.lat,
              longitude: this.props.route.params.lon,
            }}
            title={this.props.route.params.location}
            description="Come and find Us!"
          />
        </MapView>
        {/* <Text>{this.props.route.params.coords[4]}</Text> */}
      </View>
    );
  }
}

export default Maps;

const ss = StyleSheet.create({
  map: {
    flex: 1,
  },
});
