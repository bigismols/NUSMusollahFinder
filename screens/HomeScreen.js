import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch} from "react-redux";
import {
  setDestination,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [musollahs, setMusollahs] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchMusollahs = async () => {
      try {
        const colRef = collection(FIRESTORE_DB, "musollahs");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => doc.data());
        console.log(data);
        setMusollahs(data);
      } catch (error) {
        console.error("Error fetching musollahs:", error);
      }
    };

    fetchMusollahs();
  }, []);

  const musollahNames = musollahs.map((obj) => ({
    key: obj.name,
    value: obj.name,
  }));

  const handleSelect = () => {
    console.log(selected);
    const selectedMusollah = musollahs.find(
      (musollah) => selected === musollah.name
    );
    if (selectedMusollah) {
      dispatch(
        setDestination({
          location: {
            latitude: selectedMusollah.latitude,
            longitude: selectedMusollah.longitude,
          },
        })
      );
      // console.log(destination);
    }
  };

  return (
    <SafeAreaView className=" bg-white">
      <TouchableOpacity
        onPress={() => FIREBASE_AUTH.signOut()}
        className="flex-row items-center pl-3"
      >
        <FontAwesome name="angle-double-left" size={28} color="green" />
        <Text className="text-base ml-1">Sign out</Text>
      </TouchableOpacity>
      {/* header */}
      <View className="pb-3 mt-2 mx-4 space-x-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <Image
              source={require("../assets/images/Masjid_icon.jpg")}
              // source={{uri: 'https://i0.wp.com/theoctant.org/wp-content/uploads/2021/09/Joshua-Vargas-SDE_2-min-scaled.jpg?fit=2560%2C1707&ssl=1'}}
              className="w-12 h-12 rounded-full"
            />
            <View className="justify-around">
              <Text className="font-bold text-black text-xl">
                N U S M U S O L L A H S
              </Text>
            </View>
          </View>
          <FontAwesome
            name="user"
            size={28}
            onPress={() => navigation.navigate("UserInfoTab")}
          />
        </View>
      </View>
      {/* <SearchBar
          placeholder="Search here"
          onChangeText={(text) => console.log(text)}
          className='mb-6'
        /> */}
      <SelectList
        placeholder="Search for Musollah Names Here!"
        className="mb-6"
        data={musollahNames}
        setSelected={setSelected}
        dropdownStyles={styles.dropdown}
        onSelect={handleSelect}
      />
      {/* searchbar */}
      {/* <TouchableOpacity onPress={() => navigation.push('MapScreen')}>
        <SearchIcon size={20} color='#000000'/>
      </TouchableOpacity> */}
      <View className="h-full w-full">
        <Map />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    zIndex: 1000,
    marginTop: 60,
    backgroundColor: "white",
  },
});

export default HomeScreen;
