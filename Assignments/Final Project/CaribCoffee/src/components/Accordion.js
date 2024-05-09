import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0', // light grey background color
    borderRadius: 10, // rounded edges
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  content: {
    padding: 10,
  },
});

export default Accordion;
