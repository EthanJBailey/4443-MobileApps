import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CoffeeSearch = ({ isDarkMode }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(delay);
  }, [selectedCategory, searchKeyword]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://142.93.185.100:8084/coffee/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const jsonData = await response.json();
      setCategories(jsonData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let apiUrl = `http://142.93.185.100:8084/coffee`;
      if (selectedCategory) {
        apiUrl += `?category=${selectedCategory}`;
        if (searchKeyword) {
          apiUrl += `&`;
        }
      } else {
        apiUrl += `?`;
      }
      if (searchKeyword) {
        apiUrl += `keyword=${searchKeyword}`;
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchKeyword(text);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
        <ActivityIndicator size="large" color="#97694F" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Find Your New Favourite:</Text>
      <Picker
        selectedValue={selectedCategory}
        style={[styles.categoryPicker, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
        onValueChange={(itemValue) => handleCategoryChange(itemValue)}>
        <Picker.Item label="All Categories" style={styles.pickerItem} value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} style={styles.pickerItem} />
        ))}
      </Picker>
      <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="Enter keyword"
          onChangeText={handleSearch}
          value={searchKeyword}
        />
      {data.length === 0 ? (
        <Text style={[styles.message, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>No coffee spots found for the selected category and keyword.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={[styles.name, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
              <Text style={[styles.category, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Category: {item.category}</Text>
              <Text style={[styles.price, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Price: ${item.price}</Text>
              <Text style={[styles.description, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  categoryPicker: {
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 4,
  },
  price: {
    fontWeight: 'bold',
  },
  category: {
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default CoffeeSearch;
