import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import headerbg from "../images/testbg2.jpg"


const DiscussionPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user/group

  const users = [
    { id: 1, name: 'John Doe', image: require('../images/genlogo.png') },
    { id: 2, name: 'Jane Smith', image: require('../images/espresso.jpg') },
    { id: 3, name: 'Alice Johnson', image: require('../images/pumpkin_spice_latte.jpg') },
    { id: 4, name: 'Bob Brown', image: require('../images/recipes.jpg') },
    { id: 5, name: 'Cold Brew Lovers', image: require('../images/coldbrew.jpg') },
    { id: 6, name: 'Hot Spot', image: require('../images/pumpkin_spice_latte.jpg') },
    { id: 7, name: 'Only Caffeine', image: require('../images/iced_caramel_macchiato.jpg')},
    // Add more users as needed
  ];

  const selectUser = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear messages when selecting a new user
  };

  const phrases = [
    'Hi, how are you today?',
    'Good day!',
    'I am awesome!',
    'Thank you.',
    'Nice to meet you!',
    // Add more phrases as needed
  ];
  
  const sendMessage = () => {
    if (message.trim() === '') return; // Ensure message is not empty
    setMessages([...messages, { text: message, sender: 'user' }]);
    
    // Generate and add a single random response
    const randomResponse = {
      text: phrases[Math.floor(Math.random() * phrases.length)],
      sender: 'other',
    };
    setMessages((prevMessages) => [...prevMessages, randomResponse]);
    
    setMessage('');
  };  

  return (
    
    <View style={styles.container}>
      {/* Header Background Image */}
      <ImageBackground source={headerbg} style={styles.headerBackground}>
        {/* Logo */}
        {/* <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View> */}
       </ImageBackground>

      {/* User selection list */}
      <View style={styles.sliderContainer}>
        <FlatList
          data={users}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectUser(item)} style={styles.userContainer}>
              <Image source={item.image} style={styles.userImage} />
              <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Chat messages */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessageContainer : styles.otherMessageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageList}
      />

      {/* Message input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={sendMessage} // Submit message on pressing "Return" key
          multiline // Allow multiline input
          numberOfLines={4} // Set number of lines to display
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialIcons name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // Increased margin at the top
  },
  sliderContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  userContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    marginTop: 5,
  },
  userMessageContainer: {
    backgroundColor: '#97694F',
    alignSelf: 'flex-end',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    marginRight: 20,
  },
  otherMessageContainer: {
    backgroundColor: '#97694F',
    alignSelf: 'flex-start',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    marginLeft: 20,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#97694F',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center', // Center icon vertically
  },
  messageList: {
    paddingVertical: 10, // Added padding around chat messages
  },

  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.40, // semi-transparent
  },
});

export default DiscussionPage;
