import "@bacons/text-decoder/install";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import "expo-dev-client";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need

export default function RootLayout() {
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

// import { useEffect } from "react";
// import { useFonts } from "expo-font";

// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     Raleway: require('../../assets/fonts/Raleway.ttf'),
//     Sora: require('./../assets/fonts/Sora.tff')
//   });

// useEffect(() => {
//   if (loaded) {
//     SplashScreen.hideAsync();
//   }
// }, [loaded]);

// if (!loaded) {
//   return null;
// }

//   return (
//     <TRPCProvider>
//     {/*
//         The Stack component displays the current page.
//         It also allows you to configure your screens
//       */}
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: "#ffffff",
//         },
//         contentStyle: {
//           backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
//         },
//       }}
//     />
//     <StatusBar />
//   </TRPCProvider>
//   );
// }
