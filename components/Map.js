import { StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { selectDestination, selectOrigin, setOrigin } from '../slices/navSlice'
import * as Location from 'expo-location'

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  useEffect(() => {
      const getPermissions = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        let {backStatus} = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted' && backStatus !== 'granted') {
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

  useEffect(() => {
    if (mapRef.current && origin?.location) {
      mapRef.current.animateToRegion({
        latitude: origin.location.latitude,
        longitude: origin.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [origin]);

  return (
    <MapView style={styles.map}
    initialRegion={{
        latitude: origin.location.latitude,
        longitude: origin.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    ref={mapRef}
    showsMyLocationButton={true}
    showsUserLocation={true}
    followsUserLocation={true}
    showsCompass={true}
    >
      {origin?.location && (
        <Marker
          coordinate={{
              latitude: origin.location.latitude,
              longitude: origin.location.longitude,
            }
          }
          title='Origin'
          identifier='Origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
              latitude: destination.location.latitude,
              longitude: destination.location.longitude,
            }
          }
          title='Destination'
          identifier='Destination'
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