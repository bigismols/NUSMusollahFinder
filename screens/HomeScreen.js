import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleDownIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {
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
                <Text className='text-xl'>Current Location</Text>
                <ChevronDoubleDownIcon size={20} color='#000000' className='pt-3'/>
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
