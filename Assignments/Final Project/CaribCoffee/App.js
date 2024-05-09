import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { View, Image } from 'react-native';
import HomePage from './src/screens/HomePage';
import CoffeeSearch from './src/screens/CoffeeSearch';
import LocationPage from './src/screens/LocationPage';
import LoginPage from './src/screens/LoginPage';
import RegistrationPage from './src/screens/RegistrationPage';
import LoggedOutHomePage from './src/screens/LoggedOutHomePage';
import DiscussionPage from './src/screens/DiscussionPage'; // Import the ChatPage component
import BlogPage from './src/screens/BlogPage'; // Import the ChatPage component
import logo from './src/images/ccc-logo.png';
import logotextblack from './src/images/genlogo-tran-black.png';
import logotextwhite from './src/images/genlogo-tran.png';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userEmail, setUserEmail] = useState(''); // Track authenticated user email

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email); // Set the authenticated user email
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(''); // Clear the authenticated user email
  };


  const logoImage = isDarkMode ? logotextwhite : logotextblack;

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}>
        <Tab.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Home'} // Set initial route based on login status
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Search') {
                iconName = 'feature-search-outline';
              } else if (route.name === 'Near Me') {
                iconName = 'map-marker';
              } else if (route.name === 'Login') {
                iconName = 'login';
              } else if (route.name === 'Register') {
                iconName = 'account';
              }else if (route.name === 'Discussion') {
                iconName = 'chat';
              }
              else if (route.name === 'Blog') {
                iconName = 'post';
              }

              return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: isDarkMode ? '#97694F' : '#97694F',
            tabBarInactiveTintColor: isDarkMode ? '#FFFFFF' : 'black',
            tabBarStyle: {
              display: 'flex',
            },
            headerTitle: () => (
              <Image 
                source={logoImage} 
                style={{ width: 150, height: 50, borderRadius: 0 }} 
              />
            ),
          })}
        >
          {isLoggedIn ? (
            <>
              <Tab.Screen name="Home">
                {props => <HomePage {...props} userEmail={userEmail} isDarkMode={isDarkMode} />}
              </Tab.Screen>
              <Tab.Screen name="Blog" component={BlogPage} />
              <Tab.Screen name="Discussion" component={DiscussionPage} />
              <Tab.Screen name="Search">
                {props => <CoffeeSearch {...props} isDarkMode={isDarkMode} />}
              </Tab.Screen>
              <Tab.Screen name="Near Me" component={LocationPage} />
            </>
          ) : (
            <>
              <Tab.Screen name="Home" component={LoggedOutHomePage} />
              <Tab.Screen name="Login">
                {props => <LoginPage {...props} onLogin={handleLogin} />}
              </Tab.Screen>
              <Tab.Screen name="Register" component={RegistrationPage} />
            </>
          )}
        </Tab.Navigator>
        <IconButton
          icon={isDarkMode ? 'brightness-5' : 'brightness-3'}
          color="#000"
          style={{ position: 'absolute', top: 50, right: 20 }}
          onPress={toggleDarkMode}
        />
        {isLoggedIn && (
          <IconButton
            icon="logout"
            color="#808080" // Grey color for better visibility
            onPress={handleLogout}
            style={{ position: 'absolute', top: 50, right: 80 }}
          />
        )}
      </View>
    </NavigationContainer>
  );
};

export default App;
