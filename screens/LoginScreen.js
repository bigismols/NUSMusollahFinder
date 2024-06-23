import { Image, View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View className='flex-1'> 
      <ImageBackground source={require('../assets/images/bg-green.jpg')} resizeMode='cover'
      className='w-full h-full absolute'/>
      <View className='flex space-y-4 mx-4 items-center'>
        <View className='w-full mt-80 rounded-2xl items-center bg-gray-100'>
          <TextInput placeholder='Email' placeholderTextColor={'gray'} />
        </View>
        <View className='w-full rounded-2xl items-center bg-gray-100'>
          <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
        </View>
        <TouchableOpacity onPress={() => navigation.push('HomeScreen')} className='w-full rounded-2xl items-center bg-green-200 p-2'>
            <Text>Login</Text>
        </TouchableOpacity>
        <View className='flex-row'>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
            <Text className='text-blue-500 underline'> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen