import { View, Text , Image, TextInput} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleDownIcon, SearchIcon } from "react-native-heroicons/outline";

const HomeScreen = () => {
  return (
    <SafeAreaView className='p-5 bg-white '>
      <Text>
        {/* header */}
        <View className='flex-row items-center pb-3 mt-8 mx-4 space-x-2 '>
          <Image 
          source={require("../assets/images/Masjid_icon.jpg")} 
          className='w-12 h-12 rounded-full'
          />
          <View className=''>
            <Text className='font-bold text-gray-400 text-xs '>
              Find your nearest Musollah Now! 
            </Text>
            <Text className='font-bold text-xl '>
              Current Location
              <ChevronDoubleDownIcon size={20} color='#000000' 
              className='pt-3'/>
            </Text>
          </View>
          {/* {searchbar} */}
             <View>
              <SearchIcon/>
              <TextInput placeholder='Search location here'></TextInput>
            </View>

        </View>
      </Text>
    </SafeAreaView>
  )
}

export default HomeScreen