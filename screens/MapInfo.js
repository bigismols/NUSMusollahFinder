import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native'

const MapInfo = () => {
    const route = useRoute();
    const { musollah } = route.params || {} ;
    console.log(musollah);
    const navigation = useNavigation();

if (!musollah) {
    return (
        <SafeAreaView>
            <Button
                title='go back to maps'
                onPress={() => navigation.goBack()}
                color='#86d99c'
            />
            <View className='justify-center items-center flex-1'>
                <Text className='text-3xl'>
                    No Musollah data available!
                </Text>
            </View>
        </SafeAreaView>
    )
}
  
return (
    <SafeAreaView>
        <View className='align-center'>
            <View className='text-7xl p-6'>
                <Text>
                    {musollah.name}
                </Text>
                <Image
                source={{uri: musollah.image}}
                resizeMode='cover'
                />
            </View>
            <TouchableOpacity
            onPress={() => Linking.openURL(musollah.link)}
            >
                <Text>Click here for more information!</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default MapInfo