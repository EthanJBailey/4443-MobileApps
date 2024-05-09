import React, { useState } from 'react';
import { StyleSheet, Image, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../images/applogo.gif"

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
      navigation.navigate('Login'); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#97694F'}}>
      <View className="px-4 w-full max-w-sm">
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View>

        {/* <Text style={{ fontSize: 20, fontStyle: 'italic', marginBottom: 8, color: '#D2D2D2'}}>
          Embark on your coffee journey with us:
        </Text> */}
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
        <Button title="Register" color="#5C4033" onPress={handleRegister} />
        <View className="mt-4">
          <Text className="text-white">Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-white">Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default RegistrationPage;