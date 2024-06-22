import { Image, View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
  return (
    <View className='flex-1'> 
      <ImageBackground source={require('../assets/images/bg-green.jpg')} resizeMode='cover'
      className='w-full h-full absolute'/>
      <View className='flex space-y-4 mx-4 items-center'>
        <View className='w-full mt-80 rounded-2xl items-center bg-gray-200'>
          <TextInput placeholder='Email' placeholderTextColor={'gray'} />
        </View>
        <View className='w-full rounded-2xl items-center bg-gray-200'>
          <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
        </View>
        <TouchableOpacity className='w-full rounded-2xl items-center bg-green-200 p-2'>
            <Text>Login</Text>
        </TouchableOpacity>
        <View className='flex-row'>
          <Text>Don't have an account?</Text>
          <TouchableOpacity>
            <Text className='text-blue-500 underline'> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen