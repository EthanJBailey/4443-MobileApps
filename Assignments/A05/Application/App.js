import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingPage from './src/screens/LandingPage';
import LoginPage from './src/screens/LoginPage';
import RegistrationPage from './src/screens/RegistrationPage';
import HomePage from './src/screens/HomePage';
import CoffeeSearch from './src/screens/CoffeeSearch';
//import LocationPage from './src/screens/LocationPage';


import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LandingPage"
        component={LandingPage}
        screenOptions={{
          "tabBarActiveTintColor": "blue",
          "tabBarInactiveTintColor": "black",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        }}
      >
         <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={CoffeeSearch}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="feature-search-outline" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Location"
          component={LocationPage}
          options={{
            tabBarLabel: 'Location',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="location" color={color} size={size} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Login"
          component={LoginPage}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
            //tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegistrationPage}
          options={{
            tabBarLabel: 'Register',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;