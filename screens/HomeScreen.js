import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Touchable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import {selectDestination, setDestination, setOrigin} from '../slices/navSlice'
import { useNavigation} from '@react-navigation/native';
import Map from '../components/Map';
import SearchBar from "react-native-dynamic-search-bar";
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../firebase'
import { SelectList } from 'react-native-dropdown-select-list';
import { hasStartedGeofencingAsync } from 'expo-location';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const [musollahs, setMusollahs] = useState([]);
  const [selected, setSelected] = useState([]);

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

  const musollahNames = musollahs.map((obj) => ({
    key: obj.name,
    value: obj.name,
  }))

  const handleSelect = () => {
    console.log(selected);
    const selectedMusollah = musollahs.find((musollah) => selected == musollah.name);
    if (selectedMusollah) {
      dispatch(setDestination({
          location: {
            latitude: selectedMusollah.latitude,
            longitude: selectedMusollah.longitude,
          }
        }
      ))
      // console.log(destination);
    }
  }

  return (
    <SafeAreaView className=' bg-white'>
      {/* header */}
      <View className='flex-row items-center pb-3 mt-8 mx-4 space-x-2'>
        <Image 
          // source={require("../assets/images/Masjid_icon.jpg")} 
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/NUS%2C_Science%2C_Nov_06.JPG'}}
          className='w-12 h-12 rounded-full'
        />
        <View className='justify-around'>
          <Text className='font-bold text-black text-xl'>
            N U S M U S O L L A H S
          </Text>         
        </View>
      </View>
      {/* <SearchBar
          placeholder="Search here"
          onChangeText={(text) => console.log(text)}
          className='mb-6'
        /> */}
      <SelectList 
      placeholder='Search for Musollah Names Here!'
      className='mb-6'
      data={musollahNames}
      setSelected={setSelected} 
      dropdownStyles={styles.dropdown}
      onSelect={handleSelect}
      />
      {/* searchbar */}
      {/* <TouchableOpacity onPress={() => navigation.push('MapScreen')}>
        <SearchIcon size={20} color='#000000'/>
      </TouchableOpacity> */}
      <View className='h-full w-full'>
        <Map />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: 60,
    backgroundColor: 'white'
  },
});

export default HomeScreen;
