import { Image, View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LoginScreen from './LoginScreen';

const SignupScreen = () => {
    const navigation=useNavigation();
  return (
    <View className='flex-1'> 
      <ImageBackground source={require('../assets/images/bg-green.jpg')} resizeMode='cover'
      className='w-full h-full absolute'/>
      <View className='flex space-y-4 mx-4 items-center'>
        <View className='w-full mt-80 rounded-2xl items-center bg-gray-200'>
          <TextInput placeholder='Username' placeholderTextColor={'gray'} />
        </View>
        <View className='w-full rounded-2xl items-center bg-gray-200'>
          <TextInput placeholder='Email' placeholderTextColor={'gray'} />
        </View>
        <View className='w-full rounded-2xl items-center bg-gray-200'>
          <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
        </View>
        <TouchableOpacity className='w-full rounded-2xl items-center bg-green-200 p-2'>
            <Text>Login</Text>
        </TouchableOpacity>
        <View className='flex-row'>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
            <Text className='text-blue-500 underline'> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignupScreen;