// LoginPage.js
import React, { useState } from 'react';
import { Image, View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../images/applogo.gif"


const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://142.93.185.100:8084/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to log in');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success: Logging user in...');
        onLogin(email); // Pass the user's email to the onLogin function
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to log in. Please check your credentials.');
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#97694F' }}>
      <View style={{ paddingHorizontal: 20, width: '100%', maxWidth: 300 }}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View>

        {/* <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#fff' }}>Login</Text> */}

        <TextInput
          placeholder="Enter email address"
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, color: '#fff' }}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Enter password"
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15, color: '#fff' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

        <Button title="Log In" color="#5C4033" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoginPage;
