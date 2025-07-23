import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function GeoPage() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const alertedRef = useRef(false); // prevent multiple alerts

  useEffect(() => {
    let subscriber;

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
        return;
      }

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
        },
        (loc) => {
          setCurrentLocation(loc);

          if (targetLocation) {
            const distance = getDistanceFromLatLonInMeters(
              loc.coords.latitude,
              loc.coords.longitude,
              targetLocation.latitude,
              targetLocation.longitude
            );

            console.log(`Distance to target: ${distance} meters`);

            if (distance < 100 && !alertedRef.current) {
              Alert.alert('You are within 100 meters of the target!');
              alertedRef.current = true; // avoid spamming
            }
          }
        }
      );
    };

    getLocation();

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [targetLocation]); // re-run when target changes

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setTargetLocation(coordinate);
    alertedRef.current = false; // reset alert if new target
  };

  // Helper: Haversine formula
  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in meters
    return d;
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          region={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          {/* Current location marker */}
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />

          {/* Target marker */}
          {targetLocation && (
            <Marker
              coordinate={targetLocation}
              title="Target Location"
              pinColor="red"
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});