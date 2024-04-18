import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import logo from "../images/ccc-logo.png"
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 w-full items-center justify-center bg-grey">
      {/* <Text className="text-xl font-bold">        
        Welcome to the Caribbean Coffee Collective App! 
      </Text>
      <Text>
        The coffee stories of the people and places across the Caribbean.
      </Text> */}
      <Image source={logo}/> 

      <Button mode="contained" onPress={() => navigation.navigate('Register')}>
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
});

export default HomePage;