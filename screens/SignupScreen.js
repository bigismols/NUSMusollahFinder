
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ActivityIndicator } from "react-native";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [userName, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const SignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      console.log(response);
      await updateProfile(response.user, { displayName: userName });
      alert("Check your Emails!");
    } catch (error) {
      console.log(error);
      alert("Sign Up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/images/bg-green.jpg")}
        resizeMode="cover"
        className="w-full h-full absolute"
      />
      <View className="flex space-y-4 mx-4 items-center">
        <View className="w-full mt-80 rounded-2xl items-center bg-gray-200"></View>
        <View className="w-full rounded-2xl items-center bg-gray-100 pt-2 pb-2">
          <TextInput
            placeholder="Username"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            value={userName}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View className="w-full rounded-2xl items-center bg-gray-100 pt-2 pb-2">
          <TextInput
            placeholder="Email"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="w-full rounded-2xl items-center bg-gray-100 pt-2 pb-2">
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
              onPress={SignUp}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
        <View className="flex-row">
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
            <Text className="text-blue-500 underline"> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
