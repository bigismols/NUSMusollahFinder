import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGKE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
          <GooglePlacesAutocomplete
                  placeholder='Enter Location'
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
        </View>
      </View>
      {/* searchbar */}
      <TouchableOpacity onPress={() => navigation.push('MapScreen')}>
        {/* <SearchIcon size={20} color='#000000'/> */}
        <Text>Press here to go to map</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen;
