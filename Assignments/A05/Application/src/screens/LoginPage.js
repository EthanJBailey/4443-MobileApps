import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    // Example POST request to your FastAPI backend
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
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.success) {
        navigation.navigate('Home')
      } else {
        setError(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Log in to your CCC Account:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter email address"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Enter password"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
        <Button style={styles.button} title="Log In" onPress={handleLogin} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tan',
  },
  formContainer: {
    paddingHorizontal: 20,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fffff',
  },

  error: {
    color: '#ff0000',
    marginTop: 10,
  },
});

export default LoginPage;


// import React, { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = () => {
//     // Implement login logic here
//     // Example POST request to your FastAPI backend
//     fetch('http://142.93.185.100:8084/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//       if (data.success) {
//         // Navigate to home page or update state to show logged in status
          
//       } else {
//         setError(data.message);
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   };

//   return (
//     <View style={`flex-1 w-full items-center justify-center bg-gray-950`}>
//       <View style={`px-4 w-full max-w-sm`}>
//         <Text style={`text-5xl font-bold mb-6 text-gray-50`}>
//           Login
//         </Text>

//         <View style={`flex flex-col gap-4`}>
//           <TextInput placeholder="Enter email address"
//             style={'border border-gray-300 p-2 rounded mb-4'}
//             onChangeText={setEmail}
//             value={email}
//             keyboardType="email-address"
//           />
//           <TextInput
//             placeholder="Enter password"
//             style={'border border-gray-300 p-2 rounded mb-4'}
//             onChangeText={setPassword}
//             value={password}
//             secureTextEntry
//           />
//         </View>
//         <Button title="Log In" onPress={handleLogin} />
//         {error ? <Text style={'text-red-500 mt-2'}>{error}</Text> : null}
//       </View>
//     </View>
//   );
// };

// export default LoginPage;
