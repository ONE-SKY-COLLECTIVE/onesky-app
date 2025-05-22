import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Image, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Onboarding from "./pages/Onboarding";
import Homepage from "./pages/Homepage";


const SplashScreen = () => {
  const { width } = Dimensions.get("window");
  const cloudPosition = useRef(new Animated.Value(width)).current;
  const cloudPosition2 = useRef(new Animated.Value(width)).current;
  const cloudPosition3 = useRef(new Animated.Value(width)).current;
  const cloudPosition4 = useRef(new Animated.Value(width)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCloud = () => {
        cloudPosition.setValue(width);

        Animated.timing(cloudPosition, {
            toValue: -200,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const animateCloudOthers = () => {
      cloudPosition2.setValue(width);
      cloudPosition3.setValue(width);
      cloudPosition4.setValue(width);

      Animated.timing(cloudPosition2, {
          toValue: -50,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
      }).start();

      Animated.timing(cloudPosition3, {
        toValue: 300,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloudPosition4, {
        toValue: -50,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start();

    animateCloud();
    setTimeout(() => {
      animateCloudOthers();
    }, 2000)
}, []);

  return (
    <View className="h-full w-full blue-bg-300 p-4">
      <Animated.View style={{ opacity: fadeAnim }} className="self-center my-auto">
        <Image source={require('../../assets/icons/oneskylogo.png')} className="self-center my-auto" />
      </Animated.View>
      <View className="absolute top-[350px]">
          <Animated.View style={{ transform: [{ translateX: cloudPosition }] }}>
              <Image
                  source={require('../../assets/icons/cloud1.png')}
                  resizeMode="contain"
              />
          </Animated.View>
      </View>
      <View className="absolute top-[220px]">
          <Animated.View style={{ transform: [{ translateX: cloudPosition2 }] }}>
              <Image
                  source={require('../../assets/icons/cloud2.png')}
                  resizeMode="contain"
              />
          </Animated.View>
      </View>
      <View className="absolute top-[250px]">
          <Animated.View style={{ transform: [{ translateX: cloudPosition3 }] }}>
              <Image
                  source={require('../../assets/icons/cloud3.png')}
                  resizeMode="contain"
              />
          </Animated.View>
      </View>
      <View className="absolute top-[600px]">
          <Animated.View style={{ transform: [{ translateX: cloudPosition2 }] }}>
              <Image
                  source={require('../../assets/icons/cloud4.png')}
                  resizeMode="contain"
              />
          </Animated.View>
      </View>
    </View>
  )
}

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);
  useEffect(() => {
    const initialize = async () => {
      // Include this line of code to see how a first-time user will see the onboarding
      // await SecureStore.deleteItemAsync("hasLaunched");
      await new Promise((res) => setTimeout(res, 8000));

      const launchStatus = await SecureStore.getItemAsync("hasLaunched");
      if (launchStatus === null) {
        await SecureStore.setItemAsync("hasLaunched", "true");
        setHasLaunched(true);
      } else {
        setHasLaunched(false);
      }
      setIsSplashVisible(false);
    };
    initialize();
  }, []);

  if (isSplashVisible || hasLaunched === null) {
    return <SplashScreen />;
  }

  return hasLaunched ? <Onboarding /> : <Homepage />;
}
