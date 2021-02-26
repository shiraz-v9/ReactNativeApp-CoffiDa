import React, { Component } from "react";

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
import updateReview from "./components/updateReview";
import Photo from "./components/displayPhoto";
import Settings from "./components/settings";
import Maps from "./components/maps";

const homeNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="locations" component={locations} />
      <Stack.Screen name="review" component={review} />

      <Stack.Screen
        name="Photo"
        component={Photo}
        options={{
          headerStyle: {
            backgroundColor: "#212529",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  );
};

export { homeNavigation };

const logScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={loginAsync} />
      <Stack.Screen name="signup" component={signup} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};
export { logScreen };

const profileNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Update" component={Update} />
      <Stack.Screen name="updateReview" component={updateReview} />
    </Stack.Navigator>
  );
};
export { profileNavigation };
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen // moving this here so I make sure it's the first thing user sees.
//         name="loginAsync"
//         component={loginAsync}
//         options={{
//           title: "Welcome!",
//           headerStyle: {
//             backgroundColor: "#f4511e",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//         }}
//       />
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Settings" component={Settings} />
//       <Stack.Screen name="Update" component={Update} />
//       <Stack.Screen
//         name="signup"
//         component={signup}
//         options={{
//           title: "Create Your account",
//           headerStyle: {
//             backgroundColor: "#f4511e",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//         }}
//       />
//       <Stack.Screen
//         name="locations"
//         component={locations}
//         options={({ route }) => ({ title: route.params.name })}
//       />
//
//       <Stack.Screen
//         name="review"
//         component={review}
//         options={({ route }) => ({ title: route.params.location_name })}
//       />
//       <Stack.Screen
//         name="updateReview"
//         component={updateReview}
//         options={({ route }) => ({
//           title: route.params.location_name,
//         })}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>
// );
// }

// export default screens;
