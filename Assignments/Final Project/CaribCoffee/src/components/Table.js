import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Table = ({ data }) => {
  return (
    <View style={styles.table}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <Text key={cellIndex} style={styles.cell}>{cell}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
});

export default Table;
