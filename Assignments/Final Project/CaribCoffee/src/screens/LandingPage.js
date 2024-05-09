import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CCC!</Text>
      <Button icon="login" mode="contained" onPress={()=>navigation.navigate('Login')}>
        Login
      </Button>
      <Button icon="account-plus" mode="contained" onPress={()=>navigation.navigate('Registration')}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LandingPage;