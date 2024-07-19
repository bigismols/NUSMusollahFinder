import { View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../FirebaseConfig'

const UserInfoTab = () => {
  const navigation = useNavigation();
  const user = FIREBASE_AUTH.currentUser;
    // const displayName = user.displayName;
    const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
    const uid = user.uid;
    const userName = user.displayName;

  return (
    <SafeAreaView>
      <View className='pl-4 flex-row items-center'>
        <FontAwesome 
        onPress={() => navigation.goBack()}
        name='angle-double-left'
        size={28}
        />
        <Text className='pl-3 pt-1 text-3xl font-semibold'>User Information</Text>
      </View>
      { email ? (
        <>
          <View className='mt-2 flex-row p-3 items-center border-t-2'>
            <Text className='text-gray-500  text-xl'>User Email: </Text>
            <Text className=' text-xl'>{email}</Text>
          </View>
          <View className='flex-row p-3 items-center border-t-2'>
            <Text className='text-gray-500  text-xl'>Username: </Text>
            <Text className=' text-xl'>{userName}</Text>
          </View>
          <View className='flex-row p-3 items-center border-t-2 border-b-2'>
            <Text className='text-gray-500  text-xl'>User UID: </Text>
            <Text className=' text-xl'>{uid}</Text>
          </View>
        </>
      ) :
        <Text>You have no email??</Text>
      }
    </SafeAreaView>
  )
}

export default UserInfoTab