import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";

import icons from "~/lib/icons";

export default function Email() {
  return (
    <SafeAreaView className="flex-1 place-content-center items-center justify-center bg-white">
      <Text className="mb-10 text-2xl font-bold capitalize">
        Email verification
      </Text>
      <View className="my-4 w-3/4 flex-col items-center">
        <Image
          className="my-10 block"
          source={icons.emailIcon}
          style={{ width: 67, height: 53 }}
          alt="an icon"
        />
        <Text className="mt-5 text-center text-sm text-[#797C7C]">
          We've sent a verification link to your email. Please check your inbox
          and verify your email to continue.
        </Text>
      </View>
      <Link
        className="mt-10 w-[80%] rounded-lg bg-[var(--bright-lime)] p-4"
        href={"/pages/(auth)/login"}
      >
        <Text className="p-4 text-center">Go to login</Text>
      </Link>
    </SafeAreaView>
  );
}
