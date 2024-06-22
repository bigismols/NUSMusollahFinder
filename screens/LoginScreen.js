import { Image, View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-web'

const LoginScreen = () => {
  return (
    <View>
        <Image source={require('../assets/images/bg-green.jpg')} />
        <View className='flex space-y-4 mx-4'>
            <View>
              <TextInput placeholder='Email' placeholderTextColor={'gray'} />
            </View>
            <View>
              <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
            </View>
            <View>
              <Button >
                LOGIN
              </Button>
            </View>
        </View>
    </View>
  )
}

export default LoginScreen