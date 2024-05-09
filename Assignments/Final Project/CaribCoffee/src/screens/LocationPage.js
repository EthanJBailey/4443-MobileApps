import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [showCoffeeShops, setShowCoffeeShops] = useState(true);
  const [showUserLocations, setShowUserLocations] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        const responseUserLocations = await axios.get('http://142.93.185.100:8084/api/user_locations');
        setUserLocations(responseUserLocations.data);

        const responseCoffeeShops = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&radius=8045&keyword=coffee&key=AIzaSyC3bq5W_D0BV-LHsfP6HrnKYi06TeyorWg`
        );
        setCoffeeShops(responseCoffeeShops.data.results);
      } catch (error) {
        console.error('Error:', error);
        setErrorMsg('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            pinColor="#D2B48C"
          />
          {showUserLocations &&
            userLocations.map((userLocation, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                title={`${userLocation.first_name} ${userLocation.last_name}`}
              >
                <FontAwesome name="user" size={24} color="#975C40" />
              </Marker>
            ))}
          {showCoffeeShops &&
            coffeeShops.map((coffeeShop, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: coffeeShop.geometry.location.lat,
                  longitude: coffeeShop.geometry.location.lng,
                }}
                title={coffeeShop.name}
                description={coffeeShop.vicinity}
              >
                <FontAwesome name="coffee" size={24} color="#975C40" />
              </Marker>
            ))}
        </MapView>
      ) : (
        <Text>{errorMsg || 'Loading...'}</Text>
      )}
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => setShowUserLocations(!showUserLocations)}>
          <Text style={styles.filterText}>Coffee Lovers</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.overlayRight}>
        <TouchableOpacity onPress={() => setShowCoffeeShops(!showCoffeeShops)}>
          <Text style={styles.filterText}>Coffee Shops</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  overlayRight: {
    position: 'absolute',
    bottom: 20,
    right: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#975C40',
  },
});

export default LocationScreen;
