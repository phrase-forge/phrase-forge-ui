import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth/";
import { browserSessionPersistence } from '@firebase/auth/dist/rn/index.js'
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

const firebase = {
    apiKey: "AIzaSyDvYg4HWgaVf3gPng5cmWB8spBoqKMe5Xw",
    authDomain: "phrase-forge.firebaseapp.com",
    projectId: "phrase-forge",
    storageBucket: "phrase-forge.appspot.com",
    messagingSenderId: "1097300863191",
    appId: "1:1097300863191:web:b50a281ef30e16ef74a892",
    measurementId: "G-Y0RNNECTX1"
};

const app = initializeApp(firebase);
const auth = initializeAuth(app, {
    persistence:
    Platform.OS === "web"
      ? browserSessionPersistence
      : getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };