import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MapInfo from './screens/MapInfo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown: false}}>
              <Stack.Screen name='HomeScreen' component={HomeScreen} />
              <Stack.Screen name='MapScreen' component={MapScreen} />
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='SignupScreen' component={SignupScreen} />
              <Stack.Screen name='MapInfoScreen' component={MapInfo} />
            </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


