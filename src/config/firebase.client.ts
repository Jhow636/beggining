// firebaseConfig.js
import { initializeApp } from "firebase/app";
// Importe SOMENTE 'initializeAuth' e 'getReactNativePersistence' para autenticação em RN
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey ?? "",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain ?? "",
  projectId: Constants.expoConfig?.extra?.firebaseProjectId ?? "",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket ?? "",
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId ?? "",
  appId: Constants.expoConfig?.extra?.firebaseAppId ?? "",
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId ?? "",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa e EXPORTA o serviço de autenticação
// Esta é a forma CORRETA e RECOMENDADA para React Native/Expo com persistência
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Inicializa e exporta os outros serviços
export const db = getFirestore(app);
export const storage = getStorage(app);

// Você pode continuar exportando a instância do app se precisar
export default app;
