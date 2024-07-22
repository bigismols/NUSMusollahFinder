import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Linking } from "react-native";

const MapInfo = () => {
  const route = useRoute();
  const { musollah } = route.params || {};
  console.log(musollah);
  const navigation = useNavigation();

  if (!musollah) {
    return (
      <SafeAreaView className="flex-1">
        <Button
          title="go back to maps"
          onPress={() => navigation.goBack()}
          color="#86d99c"
        />
        <View className="justify-center items-center flex-1">
          <Text className="text-3xl text-gray-400">
            No Musollah data available!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Button
        title="go back to maps"
        onPress={() => navigation.goBack()}
        color="#86d99c"
      />
      <View className=" items-center">
        <Text className="p-6 text text-3xl font-bold">{musollah.name}</Text>
      </View>
      <View className="flex-1 justify-start">
        <View className="bg-slate-200">
          <Image
            source={{ uri: musollah.image }}
            resizeMode="cover"
            className="w-full h-full"
          />
        </View>
        <View className="flex-row p-6 z-50 bg-green-200 rounded-full absolute bottom-5 left-3">
          <Text>Click </Text>
          <TouchableOpacity onPress={() => Linking.openURL(musollah.link)}>
            <Text className="underline text-sky-500"> here</Text>
          </TouchableOpacity>
          <Text> for video directions!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapInfo;
