import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@styles/theme";

import {
  StickNoBills_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/stick-no-bills";
import { Prompt_400Regular, Prompt_700Bold } from "@expo-google-fonts/prompt";
import {
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";

import SignUp from "@screens/SingUp";

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    StickNoBills_800ExtraBold,
    Prompt_400Regular,
    Prompt_700Bold,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <SignUp />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
