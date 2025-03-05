import { Stack, useRouter } from "expo-router";
import { Button, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text";

const Onboarding = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="blue-background" edges={["top"]}>
            <Stack.Screen options={{ title: "Onboarding Page" }} />

            <View className="blue-background entire-screen flex-v">
                <Image source={require("../../../assets/icons/oneskylogo.png")} className="self-center my-12"/>
                <Image source={require("../../../assets/icons/onboardingBird.png")} className="self-center w-full "/>

                <View style={{marginTop: -30}} className=" grow white-background w-full rounded-tr-[36px] rounded-tl-[36px] p-10  flex-v items-center" >
                    <Text className="text-[22px] my-3 font-semibold">Our planet needs us</Text>
                    <Text className="text-center my-2">One small step at a time, one person at a time. Collectively, we can make a difference.</Text>
                    <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="green-background w-full rounded-[8px] my-2">
                        <Text className="text-center p-3">
                            Next
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="w-full rounded-[8px]">
                        <Text className="text-center p-3 mt-2">
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default Onboarding;