import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CoffeeSearch = () => {
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
    }, 500); // Add a delay of 500 milliseconds before searching
    return () => clearTimeout(delay);
  }, [selectedCategory, searchKeyword]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://142.93.185.100:8084/candies');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const jsonData = await response.json();
      if (!jsonData.success || !Array.isArray(jsonData.data)) {
        throw new Error('Invalid response format for categories');
      }
      const categories = jsonData.data.map(candy => candy.category);
      const uniqueCategories = Array.from(new Set(categories));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let apiUrl = `http://142.93.185.100:8084/candies`;
      if (selectedCategory) {
        apiUrl += `/category/${selectedCategory}`;
        if (searchKeyword) {
          apiUrl += `?keyword=${searchKeyword}`;
        }
      } else if (searchKeyword) {
        apiUrl += `/${searchKeyword}`;
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
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Candies:</Text>
      <Picker
        selectedValue={selectedCategory}
        style={styles.categoryPicker}
        onValueChange={(itemValue) => handleCategoryChange(itemValue)}>
        <Picker.Item label="All Categories" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} style={styles.pickerItem} />
        ))}
      </Picker>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter keyword"
        onChangeText={handleSearch}
        value={searchKeyword}
      />
      {data.length === 0 ? (
        <Text>No candies found for the selected category and keyword.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>Category: {item.category}</Text>
              <Text style={styles.price}>Price: ${item.price}</Text>
              <Text style={styles.description}>{item.desc}</Text>
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
    fontSize: 16, // Adjust the font size as needed
    color: 'black', // Adjust the color as needed
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default CoffeeSearch;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';

// const CoffeeSearch = () => {
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchData();
//     }, 1000);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchKeyword]);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);

//       //const apiUrl = `http://142.93.185.100:8084/candies/${searchKeyword}`;

//       const apiUrl = `http://142.93.185.100:8084/candies/category/${searchKeyword}`;
    
      
//       const response = await fetch(apiUrl);
//       const jsonData = await response.json();

//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (text) => {
//     setSearchKeyword(text);
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Search Candies:</Text>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Enter category"
//         onChangeText={handleSearch}
//         value={searchKeyword}
//       />
//       {data.length === 0 ? (
//         <Text>No candies found for the entered category.</Text>
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.category}>Category: {item.category}</Text>
//               <Text style={styles.price}>Price: ${item.price}</Text>
//               <Text style={styles.description}>{item.desc}</Text>
//             </View>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   searchInput: {
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgray',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   description: {
//     marginBottom: 4,
//   },
//   price: {
//     fontWeight: 'bold',
//   },
//   category: {
//     fontWeight: 'bold',
//   },
// });

// export default CoffeeSearch;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const CoffeeSearch = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, [selectedCategory]);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);

//       let apiUrl = 'http://142.93.185.100:8084/candies';

//       if (selectedCategory) {
//         apiUrl = `http://142.93.185.100:8084/candies/category/${selectedCategory}`;
//       }

//       const response = await fetch(apiUrl);
//       const jsonData = await response.json();

//       setData(jsonData.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select a Category:</Text>
//       <Picker
//         selectedValue={selectedCategory}
//         onValueChange={(itemValue) => handleCategoryChange(itemValue)}
//         style={styles.picker}
//         itemStyle={styles.pickerItem} // Add custom style for Picker items
//         dropdownIconColor={"black"} // Specify dropdown icon color if needed
//       >
//         <Picker.Item label="Select Category" value={null} />
//         <Picker.Item label="All" value="all" />
//         <Picker.Item label="None" value="none" />
//         <Picker.Item label="Some" value="some" />
//       </Picker>
//       {data.length === 0 ? (
//         <Text>No candies available for the selected category.</Text>
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//               <Text>{item.name}</Text>
//             </View>
//           )}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   picker: {
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black', // Add text color
//   },
//   pickerItem: {
//     color: 'black', // Add text color for Picker items
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgray',
//   },
// });

// export default CoffeeSearch;
