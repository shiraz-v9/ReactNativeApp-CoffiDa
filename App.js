/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// import "react-native-gesture-handler";

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { homeNavigation, logScreen, profileNavigation } from './screens'

import Ionicons from 'react-native-vector-icons/Ionicons'
class App extends Component {
  render () {
    const Tab = createBottomTabNavigator()
    return (
      
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline'
                } else if (route.name === 'Login') {
                  iconName = focused ? 'log-in' : 'log-in-outline'
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />
              }
            })}
            tabBarOptions={{
              labelStyle: { fontSize: 12 },
              activeTintColor: 'red',
              inactiveTintColor: 'black',
              showIcon: true
            }}
          >
            <Tab.Screen
              name='Home'
              component={homeNavigation}
              options={{
                title: 'Home'
              }}
            />
            <Tab.Screen
              name='Profile'
              component={profileNavigation}
              options={{
                title: 'Profile'
              }}
            />
            <Tab.Screen
              name='Login'
              component={logScreen}
              options={{ title: 'Log-In' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      
    )
  }
}
export default App
