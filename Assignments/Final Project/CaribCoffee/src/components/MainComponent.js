import React, { useState } from 'react';
import { View, Text } from 'react-native';
import HomePage from '../screens/HomePage';
import CoffeeSearch from '../screens/CoffeeSearch';

const MainComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View>
      <Text onPress={toggleDarkMode}>Toggle Dark Mode</Text>
      <HomePage isDarkMode={isDarkMode} />
      <CoffeeSearch isDarkMode={isDarkMode} />
    </View>
  );
};

export default MainComponent;
