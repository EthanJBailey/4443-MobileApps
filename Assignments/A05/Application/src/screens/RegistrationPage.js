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
    // console.log(firstName + " " + lastName);
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
      navigation.navigate('Home'); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View className="flex-1 w-full items-center justify-center bg-blue-400">
      <View className="px-4 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-gray-50">
          Register
        </Text>
        <TextInput
          className="border border-gray-300 p-2 rounded mb-4 text-white"
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
        />
        <TextInput
          className="border border-gray-300 p-2 rounded mb-4 text-white"
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
        />
        <TextInput
          className="border border-gray-300 p-2 rounded mb-4 text-white"
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          className="border border-gray-300 p-2 rounded mb-4 text-white"
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-gray-300 p-2 rounded mb-4 text-white"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
        <View className="mt-4">
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-grey-300">Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegistrationPage;