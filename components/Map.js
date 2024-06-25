import { StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import * as Location from 'expo-location'

const Map = () => {
  const origin = useSelector(selectOrigin);

  return (
    <MapView style={styles.map}
    initialRegion={{
        latitude: 1.29687857263656,
        longitude: 103.77639389634254,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    />
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;