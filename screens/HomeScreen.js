import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleDownIcon } from 'react-native-heroicons/outline';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGKE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice'

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className='p-5 bg-white'>
      {/* header */}
      <View className='flex-row items-center pb-3 mt-8 mx-4 space-x-2'>
        <Image 
          source={require("../assets/images/Masjid_icon.jpg")} 
          className='w-12 h-12 rounded-full'
        />
        <View>
          <Text className='font-bold text-gray-400 text-xs'>
            Find your nearest Musollah Now!
          </Text>
              <TouchableOpacity className='flex-row'>
                <GooglePlacesAutocomplete
                  placeholder='Current Location'
                  nearbyPlacesAPI='GooglePlacesSearch'
                  debounce={400}
                  enablePoweredByContainer={false}
                  onPress={(data, details = null) => {
                    dispatch(
                      setOrigin({
                      location: details.geometry.location,
                      description: data.description
                    })
                  );

                    dispatch(setDestination(null));
                  }}
                  fetchDetails={true}
                  returnKeyType='search'

                  query={{
                    key: GOOGKE_MAPS_APIKEY,
                    language: 'en',
                  }}
                />
                <ChevronDoubleDownIcon className='' size={20} color='#000000' />
              </TouchableOpacity>
        </View>
      </View>
      {/* searchbar */}
      <View className='flex-row items-center mt-4 mx-4 space-x-2'>
        {/* <SearchIcon size={20} color='#000000'/> */}
        <TextInput 
          placeholder='Search Musollah location here' 
          className='flex-1 border border-gray-300 rounded-md p-2'
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;
