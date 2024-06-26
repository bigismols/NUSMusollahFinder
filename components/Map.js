import { StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { selectDestination, selectOrigin, setOrigin } from '../slices/navSlice'
import * as Location from 'expo-location'
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"; 
import { db } from '../firebase'

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [musollahs, setMusollahs] = useState([]);

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
        // latitude: origin.location.latitude,
        // longitude: origin.location.longitude,
        latitude: 1.2968749382461264, 
        longitude: 103.77642571509065,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [origin]);

  useEffect(() => {
    const fetchMusollahs = async () => {
      try {
        const colRef = collection(db, 'musollahs');
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => doc.data());
        console.log(data);
        setMusollahs(data);
      } catch (error) {
        console.error('Error fetching musollahs:', error);
      }
    };

    fetchMusollahs();
  }, []);

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
          coordinate={
            {
              latitude: destination.location.latitude,
              longitude: destination.location.longitude,
            }
          }
          title='Destination'
          identifier='Destination'
        />
      )}

      {musollahs.map((musollah) => (
        <Marker
          key={musollah.name}
          coordinate={
            {
              latitude: musollah.latitude,
              longitude: musollah.longitude
            }
          }
          title={musollah.name}
        />
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;