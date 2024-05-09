import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const Carousel = ({ data }) => {
  return (
    <ScrollView horizontal>
      {data.map((item, index) => (
        <View key={index} style={[styles.item, styles.card]}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            {/* Star rating can be added here */}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginRight: 10,
  },
  card: {
    backgroundColor: '#f0f0f0', // light grey background color
    borderRadius: 10, // rounded edges
    borderWidth: 1,
    borderColor: '#ccc',
    width: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Carousel;
