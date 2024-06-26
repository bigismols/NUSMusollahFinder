import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrigin, setOrigin } from '../slices/navSlice'
import * as Location from 'expo-location'

const Map = () => {
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();

  useEffect(() => {
      const getPermissions = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Please grant location permissions!')
          return;
        } 

        let currentLocation = await Location.getCurrentPositionAsync();
        console.log(currentLocation);
        dispatch(setOrigin({
          location: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
        }))
      }
      getPermissions();
    }, [] 
  )

  return (
    <MapView style={styles.map}
    initialRegion={{
        latitude: origin.location.latitude,
        longitude: origin.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
              latitude: origin.location.latitude,
              longitude: origin.location.longitude,
            }
          }
          title='Current Location'
          identifier='Current Location'
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;