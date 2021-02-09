import React, { Component } from "react";
import { Text, TextInput, View, Button, Alert, StyleSheet } from "react-native";

class about extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      isLoading: true,
      shoppingListData: [],
      id: "",
      item_name: "",
      description: "",
      unit_price: "",
      quantity: "",
    };
  }
  addItem() {
    const nav = this.props.navigation;
    let to_send = {
      id: parseInt(this.state.id),
      item_name: this.state.item_name,
      description: this.state.description,
      unit_price: parseInt(this.state.unit_price),
      quantity: parseInt(this.state.quantity),
    };

    return fetch("http://10.0.2.2:3333/list", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(to_send),
    })
      .then((response) => {
        Alert.alert("Item added");
        nav.navigate("HomeScreen");
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={ss.container}>
        <Text>Add attributes to the Shopping.</Text>
        <TextInput
          placeholder="id"
          onChangeText={(id) => this.setState({ id })}
          value={this.setState.id}
        />

        <TextInput
          placeholder="item name"
          onChangeText={(item_name) => this.setState({ item_name })}
          value={this.setState.item_name}
        />
        <TextInput
          placeholder="description"
          onChangeText={(description) => this.setState({ description })}
          value={this.setState.description}
        />
        <TextInput
          placeholder="unit_price"
          onChangeText={(unit_price) => this.setState({ unit_price })}
          value={this.setState.unit_price}
        />
        <TextInput
          placeholder="quantity"
          onChangeText={(quantity) => this.setState({ quantity })}
          value={this.setState.quantity}
        />
        <Button title="ADD +" onPress={() => this.addItem()} />
        <Button title="◀ Back" onPress={() => nav.goBack()} />
      </View>
    );
  }
}

export default about;

const ss = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "white",
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "black",
  },
  highlight: {
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
