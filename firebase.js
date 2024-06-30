// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
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
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };

const analytics = getAnalytics(app);