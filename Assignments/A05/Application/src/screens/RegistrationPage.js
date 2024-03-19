import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegistrationPage = ( ) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    // Implement registration logic here
    // Example POST request to your FastAPI backend
    fetch('http://142.93.185.100:8084/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      navigation.navigate('Home'); // Navigate to the home page
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={'flex-1 justify-center items-center'}>
      <TextInput
        style={'border border-gray-300 p-2 rounded mb-4'}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={'border border-gray-300 p-2 rounded mb-4'}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={'border border-gray-300 p-2 rounded mb-4'}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={'border border-gray-300 p-2 rounded mb-4'}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={'border border-gray-300 p-2 rounded mb-4'}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <View style={'mt-4'}>
        <Text>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={'text-blue-500'}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegistrationPage;