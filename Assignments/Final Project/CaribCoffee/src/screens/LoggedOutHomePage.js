import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import logo from "../images/applogo.gif"
import coffee from "../images/coffee.gif"

import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoggedOutHomePage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}/>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.headerText}>Welcome to the Carib Coffee!</Text>
        <Text style={styles.subHeaderText}>The coffee stories of the people and places across the Caribbean.</Text>
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Login')}>
            Log In
          </Button>
          <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Button>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Carib Coffee. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#97694F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  mainContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: '45%',
    backgroundColor: '#5C4033',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default LoggedOutHomePage;
