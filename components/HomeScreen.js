import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Button,
  StyleSheet,
} from "react-native";
import loginAsync from "./loginAsync";
import { ScrollView } from "react-native-gesture-handler";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      locations: [],
    };
  }

  getLocation = async () => {
    const id = await AsyncStorage.getItem("token");
    const token = id.substr(1, id.length);
    fetch("http://10.0.2.2:3333/api/1.0.0/find", {
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          locations: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getData = async () => {
    const id = await AsyncStorage.getItem("token");
    const token = id.substr(1, id.length);
    fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id.charAt(0), {
      headers: {
        Accept: "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getData();
    this.getLocation();
  }
  // deleteItem(id) {
  //   return fetch("http://10.0.2.2:3333/list/" + id, {
  //     method: "deleasdate",
  //   })
  //     .then((response) => {
  //       this.getData();
  //     })
  //     .then((response) => {
  //       Alert.alert("Item deleted");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  render() {
    const nav = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Button title="add" onPress={() => nav.navigate("about")} />
        <Button title="login" onPress={() => nav.navigate("loginAsync")} />
        <View style={ss.container}>
          <Text style={ss.title}>
            Welcome to CoffiDa mr {this.state.userData.last_name}
          </Text>
          <Text>Leave reviews and find your favourite coffee place.</Text>
          <FlatList
            style={ss.flatList}
            data={this.state.locations}
            renderItem={({ item }) => (
              <View>
                <Text style={ss.text}>{item.location_name}</Text>
              </View>
            )}
            keyExtractor={({ location_id }, index) => location_id}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const ss = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: "400",
    color: "black",
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
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
  footer: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});
