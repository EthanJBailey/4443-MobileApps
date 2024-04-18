import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Implement login logic here
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
      // .then(response => {
      //   if (!response.ok) {
      //     throw new Error('Failed to log in');
      //   }
      //   return response.json();
      // })
      .then(response => response.json())
      .then(data => {
        console.log('Success: Logging  user in...');
        // Navigate to the next screen upon successful login
        navigation.navigate('Search');
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to log in. Please check your credentials.');
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3498db' }}>
      <View style={{ paddingHorizontal: 20, width: '100%', maxWidth: 300 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#fff' }}>Login</Text>

        <TextInput
          placeholder="Enter email address"
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, color: '#fff' }}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Enter password"
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, color: '#fff' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

        <Button title="Log In" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginPage;
