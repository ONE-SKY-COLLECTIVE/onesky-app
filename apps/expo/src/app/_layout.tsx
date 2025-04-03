import "@bacons/text-decoder/install";
import { Text } from 'react-native';


import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

// This is the main layout of the app
// It wraps your pages with the providers they need

// Load fonts
const loadFonts = async () => {
  await Font.loadAsync({
    Sora: require("../../assets/fonts/Sora.ttf"),
    Raleway: require("../../assets/fonts/Raleway.ttf"),
  });
};

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error("Error loading fonts:", error));
  }, []);
  const { colorScheme } = useColorScheme();

  
  return (
    <TRPCProvider>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          contentStyle: {
            backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
          },
        }}
      />
      <StatusBar />
    </TRPCProvider>
  );
}
