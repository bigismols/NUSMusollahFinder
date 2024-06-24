import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { selectOrigin } from '../slices/navSlice'
import { useSelector } from 'react-redux'

const Map = () => {
  const origin = useSelector(selectOrigin);

  return (
    <MapView style={styles.map}
    initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
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

export default Map