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
import { homeNavigation, logScreen } from "./screens";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./components/HomeScreen";
import signup from "./components/signup";
import loginAsync from "./components/loginAsync";
import locations from "./components/locations";
import review from "./components/review";
import Profile from "./components/profile";
import Update from "./components/updateUser";
import updateReview from "./components/updateReview";
import Photo from "./components/displayPhoto";
import Settings from "./components/settings";

class App extends Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
      <>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: { fontSize: 20 },
              activeTintColor: "red",
              inactiveTintColor: "black",
              showIcon: true,
            }}
          >
            <Tab.Screen
              name="Home"
              component={homeNavigation}
              options={{
                title: "Home",
              }}
            />
            <Tab.Screen
              name="loginAsync"
              component={logScreen}
              options={{ title: "Log-In" }}
            />
            {/* <Tab.Screen name="Screen 3" component={Screen3} /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
export default App;
