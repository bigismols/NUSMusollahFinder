import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='MapScreen' component={MapScreen} 
              options={headerShown=false}/>
            </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


