import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native';
import Map from '../components/Map';
import SearchBar from "react-native-dynamic-search-bar";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      <SearchBar
          placeholder="Search here"
          onChangeText={(text) => console.log(text)}
          className='mb-6'
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

export default HomeScreen;
