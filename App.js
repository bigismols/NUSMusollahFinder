import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown: false}}>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='MapScreen' component={MapScreen} />
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='SignupScreen' component={SignupScreen} />
            </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


