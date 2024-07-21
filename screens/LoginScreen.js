import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ActivityIndicator } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const Login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, Email, Password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/images/bg-green.jpg")}
        // source={{uri: 'https://cde.nus.edu.sg/wp-content/uploads/2023/08/NUS_SDE1_Finbarr_Fallon_198.png'}}
        resizeMode="cover"
        className="w-full h-full absolute"
      />
      <View className="flex space-y-4 mx-4 items-center">
        <View className="w-full mt-80 rounded-2xl items-center bg-gray-100">
          <TextInput
            placeholder="Email"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="w-full rounded-2xl items-center bg-gray-100">
          <TextInput
            placeholder="Password"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            value={Password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View className="flex-row"></View>
        {loading ? (
          <ActivityIndicator size="Large" color="#000ff" />
        ) : (
          <>
            <TouchableOpacity
              className="w-full rounded-2xl items-center bg-green-200 p-2"
              onPress={Login}
            >
              <Text>Login</Text>
            </TouchableOpacity>
          </>
        )}
        <View className="flex-row">
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
            <Text className="text-blue-500 underline"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
