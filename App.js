import "react-native-gesture-handler";

import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./components/HomeScreen";
import signup from "./components/signup";
import loginAsync from "./components/loginAsync";
import locations from "./components/locations";
import review from "./components/review";
import Profile from "./components/profile";
import Update from "./components/updateUser";

class App extends Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen // moving this here so I make sure it's the first thing user sees.
            name="loginAsync"
            component={loginAsync}
            options={{
              title: "Welcome!",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen
            name="signup"
            component={signup}
            options={{
              title: "Create Your account",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="locations"
            component={locations}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen
            name="review"
            component={review}
            options={({ route }) => ({ title: route.params.location_name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
