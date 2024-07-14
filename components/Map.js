import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { selectDestination, selectOrigin, setOrigin } from '../slices/navSlice'
import * as Location from 'expo-location'
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"; 
import { db } from '../firebase'
import { Linking } from 'react-native'
// import {Svg, Image as ImageSvg} from 'react-native-svg'
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions'

// hello
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
    if (mapRef.current && destination?.location) {
      mapRef.current.animateToRegion({
        // latitude: origin.location.latitude,
        // longitude: origin.location.longitude,
        latitude: destination.location.latitude, 
        longitude: destination.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [destination]);

  useEffect(() => {
    const fetchMusollahs = async () => {
      try {
        const colRef = collection(db, 'musollahs');
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => doc.data());
        // console.log(data);
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
    {origin && destination && (
      <MapViewDirections
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      origin={origin}
      destination={destination}
      />
    )}
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
        >
          <Callout style={{height: 200, width: 200, padding: 15, flex: 1}}>
            <View className='items-center justify-between align-middle'>
              <View>
                <Text>{musollah.name}</Text>
              </View>
              <View>
                <Text className='w-full h-full'>
                  <Image 
                  source={{uri: musollah.image}} 
                  // source={require("../assets/images/Masjid_icon.jpg")}
                  onError={(e) => console.log(`Image load error: ${e.nativeEvent.error}`)}
                  style={{height: 150, width:150}}
                  resizeMode='cover'
                  />
                </Text> 
              </View>
              {/* <TouchableOpacity style={{color: 'blue'}}
                  onPress={() => Linking.openURL(musollah.link)}>
                    <Text>More info here!</Text>
            </TouchableOpacity> */}
            </View>
          </Callout>
        </Marker>
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