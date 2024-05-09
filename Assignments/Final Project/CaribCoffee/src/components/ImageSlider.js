import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';

const ImageSlider = ({ images }) => {
  return (
    <ScrollView horizontal>
      {images.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageSlider;
