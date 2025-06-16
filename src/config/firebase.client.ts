// firebaseConfig.js
import { initializeApp } from "firebase/app";
// Importe SOMENTE 'initializeAuth' e 'getReactNativePersistence' para autenticação em RN
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA33Po02H_mcJWB9_ixyR6vvRiMl7oAoJI",
  authDomain: "beginning-1828d.firebaseapp.com",
  projectId: "beginning-1828d",
  storageBucket: "beginning-1828d.firebasestorage.app",
  messagingSenderId: "535982134543",
  appId: "1:535982134543:web:e3206e8483cb54892f1a7a",
  measurementId: "G-XRRVQTDJ9S",
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
