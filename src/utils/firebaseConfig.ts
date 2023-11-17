import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

const app = initializeApp(firebaseConfig);

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, app };
