// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZRVGH8jmTcOsrXEP7Meb2NirXAJsMK-4",
  authDomain: "nusmusollahfinder-940a3.firebaseapp.com",
  projectId: "nusmusollahfinder-940a3",
  storageBucket: "nusmusollahfinder-940a3.appspot.com",
  messagingSenderId: "231539240294",
  appId: "1:231539240294:web:5230f286e6368f2b246ca7",
  measurementId: "G-VB645D0QW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);