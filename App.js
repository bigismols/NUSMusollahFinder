import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import UserInfoTab from "./screens/UserInfoTab";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MapInfo from "./screens/MapInfo";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
          >
            {user ? (
              <>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="UserInfoTab" component={UserInfoTab} />
                <Stack.Screen name="MapInfoScreen" component={MapInfo} />
              </>
            ) : (
              <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
              </>
            )}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
