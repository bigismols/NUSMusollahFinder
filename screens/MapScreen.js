import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from '../components/Map'

const MapScreen = () => {
  return (
      <View className='h-5/6'>
        <Map />
      </View>
  )

  
}

export default MapScreen;