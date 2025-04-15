import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import Text from "../components/Text";

const Onboarding = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="blue-bg-300" edges={["top"]}>
      <Stack.Screen options={{ title: "Onboarding Page" }} />
      <View className="blue-bg-300 entire-screen flex-v">
        <Image
          source={require("../../../assets/icons/oneskylogo.png")}
          className="my-12 self-center"
        />
        <Image
          source={require("../../../assets/icons/onboardingBird.png")}
          className="w-full self-center"
        />
        <View
          style={{ marginTop: -30 }}
          className="white-bg flex-v w-full grow items-center rounded-tl-[36px] rounded-tr-[36px] p-10"
        >
          <Text className="my-3 text-[22px] font-semibold">
            Our planet needs us
          </Text>
          <Text className="my-2 text-center">
            One small step at a time, one person at a time. Collectively, we can
            make a difference.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/pages/Homepage")}
            className="green-bg-500 my-2 w-full rounded-[8px]"
          >
            <Text className="p-3 text-center">Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/pages/(auth)/login")}
            className="w-full rounded-[8px]"
          >
            <Text className="mt-2 p-3 text-center">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
