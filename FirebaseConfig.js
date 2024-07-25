import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDZRVGH8jmTcOsrXEP7Meb2NirXAJsMK-4",
  authDomain: "nusmusollahfinder-940a3.firebaseapp.com",
  projectId: "nusmusollahfinder-940a3",
  storageBucket: "nusmusollahfinder-940a3.appspot.com",
  messagingSenderId: "231539240294",
  appId: "1:231539240294:web:5230f286e6368f2b246ca7",
  measurementId: "G-VB645D0QW1",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
