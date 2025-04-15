import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

import icons from "~/lib/icons";

const success = () => {
  return (
    <SafeAreaView className="flex-1 place-content-center items-center justify-center bg-white">
      <Text className="text-2xl font-bold capitalize">success!</Text>
      <View className="w-3/4 flex-col items-center">
        <LottieView
          source={icons.success} // ✅ Replace with your animation file
          autoPlay
          loop={false} // ✅ Stops after one play
          style={{ width: 100, height: 100 }}
        />
        <Text className="text-center text-sm text-[#797C7C]">
          A link has been sent to reset your password to your email
        </Text>
      </View>

      <View className="mt-10">
        <Text className="text-[#797C7C]">Didn’t receive the email?</Text>
        <Link
          className="text-center text-[#797C7C] underline"
          href={"/pages/(auth)/set-password"}
        >
          Click here to resend
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default success;
