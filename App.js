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
import { homeNavigation, logScreen, profileNavigation } from "./screens";
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
import Ionicons from "react-native-vector-icons/Ionicons";
class App extends Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
      <>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Login") {
                  iconName = focused ? "log-in" : "log-in-outline";
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              labelStyle: { fontSize: 12 },
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
              name="Profile"
              component={profileNavigation}
              options={{
                title: "Profile",
              }}
            />
            <Tab.Screen
              name="Login"
              component={logScreen}
              options={{ title: "Log-In" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
export default App;
