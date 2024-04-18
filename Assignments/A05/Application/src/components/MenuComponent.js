import React from 'react';
import { Button } from 'react-native-paper';

const MenuComponent = ({ navigation }) => {
  return (
    <Button
      icon="camera"
      mode="contained"
      onPress={() => navigation.navigate('Login')}
    >
      Go to Login
    </Button>
  );
};

export default MenuComponent;