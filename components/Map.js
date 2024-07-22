import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { selectDestination, selectOrigin, setOrigin } from "../slices/navSlice";
import * as Location from "expo-location";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";
// import {Svg, Image as ImageSvg} from 'react-native-svg'
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import { PROVIDER_GOOGLE } from "react-native-maps";
// hello
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [musollahs, setMusollahs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let { backStatus } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted" && backStatus !== "granted") {
        console.log("Please grant location permissions!");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync();
      // console.log(currentLocation);
      dispatch(
        setOrigin({
          location: {
            // latitude: currentLocation.coords.latitude,
            // longitude: currentLocation.coords.longitude,
            latitude: 1.2968749382461264,
            longitude: 103.77642571509065,
          },
        })
      );
    };
    getPermissions();
  }, []);

  // useEffect(() => {
  //   if (mapRef.current && origin?.location) {
  //     mapRef.current.animateToRegion({
  //       // latitude: origin.location.latitude,
  //       // longitude: origin.location.longitude,
  // latitude: 1.2968749382461264,
  // longitude: 103.77642571509065,
  //       latitudeDelta: 0.005,
  //       longitudeDelta: 0.005,
  //     });
  //   }
  // }, [origin]);

  useEffect(() =>
    //     {
    //   if (mapRef.current && destination?.location) {
    //     mapRef.current.animateToRegion({
    //       // latitude: origin.location.latitude,
    //       // longitude: origin.location.longitude,
    //       latitude: destination.location.latitude,
    //       longitude: destination.location.longitude,
    //       latitudeDelta: 0.005,
    //       longitudeDelta: 0.005,
    //     });
    //   }
    // }, [destination]
    {
      if (!origin || !destination) return;

      setTimeout(() => {
        mapRef.current.fitToSuppliedMarkers(["Origin", "Destination"], {
          edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
          animated: true,
        });
      }, 500);
    }, [destination]);

  useEffect(() => {
    const fetchMusollahs = async () => {
      try {
        const colRef = collection(FIRESTORE_DB, "musollahs");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => doc.data());
        // console.log(data);
        setMusollahs(data);
      } catch (error) {
        console.error("Error fetching musollahs:", error);
      }
    };

    fetchMusollahs();
  }, []);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
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
      onMapReady={() => {
        mapRef.current.animateToRegion([
          {
            latitude: 1.2968749382461264,
            longitude: 103.77642571509065,
          },
        ]);
      }}
    >
      {origin && destination && (
        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          origin={{
            latitude: origin.location.latitude,
            longitude: origin.location.longitude,
          }}
          destination={{
            latitude: destination.location.latitude,
            longitude: destination.location.longitude,
          }}
          onError={(errorMessage) => {
            // console.log('MapViewDirections Error: ', errorMessage);
            // console.log('Origin: ', origin.location);
            // console.log('Destination: ', destination.location);
          }}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.latitude,
            longitude: origin.location.longitude,
          }}
          // centerOffset={{ x: -10, y: -60 }}
          title="Origin"
          identifier="Origin"
          image={require('../assets/images/Man.png')}
        >
          {/* <Image
            style={{height: 50, width: 50}}
            source={require('../assets/images/Man.png')}
          /> */}
        </Marker>
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.latitude,
            longitude: destination.location.longitude,
          }}
          title="Destination"
          identifier="Destination"
          image={require('../assets/images/greenFlag_resized.png')}
        />
      )}

      {musollahs.map((musollah) => (
        <Marker
          key={musollah.name}
          coordinate={{
            latitude: musollah.latitude,
            longitude: musollah.longitude,
          }}
          title={musollah.name}
        >
          <Callout
            className='p-14 max-w-xs'
            onPress={() => {
              navigation.navigate("MapInfoScreen", { musollah });
              // console.log(musollah.image);
            }}
          >
            <View className="flex-wrap items-center justify-center p-10">
              <View>
                <Text className='mb-1'>{musollah.name}</Text>
              </View>
              <View>
                {/* <Image 
                  className="w-full h-full"
                  source={{ uri: musollah.image }}
                  // source={require("../assets/images/Masjid_icon.jpg")}
                  onError={(e) =>
                    console.log(`Image load error: ${e.nativeEvent.error}`)
                  }
                  style={{ height: 150, width: 150 }}
                  resizeMode="cover"
                /> */}
                <Text>Click for more info!</Text>
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
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
