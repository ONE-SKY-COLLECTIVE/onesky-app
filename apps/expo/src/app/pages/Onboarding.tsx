import { Stack, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text";
import { useState } from "react";
import { Dimensions } from "react-native";


const Onboarding = () => {
    const { height, width } = Dimensions.get("window");
    const router = useRouter();
    const [onboardingProgress, setOnboardingProgress] = useState(1);
    if (onboardingProgress === 1) {
        return (
            <SafeAreaView className="blue-bg-300" edges={["top"]}>
                <Stack.Screen options={{ title: "Onboarding Page" }} />
                <View className="blue-bg-300 entire-screen flex-v">
                    <Image source={require("../../../assets/icons/oneskylogo.png")} className="self-center my-12"/>
                    <Image resizeMode="contain" source={require("../../../assets/icons/onboarding.png")} className="absolute top-[-80px]" style={{width: width, height: height}}/>
                    <View className="h-[30vh] grow white-bg w-full rounded-tr-[36px] rounded-tl-[36px] p-10 flex-v items-cente absolute bottom-0" >
                        <Text className="text-[22px] my-3 font-semibold text-center">Our planet needs us</Text>
                        <Text className="text-center text-[13px] my-2 gray-600 font-light">One small step at a time, one person at a time. Collectively, we can make a difference.</Text>
                        <TouchableOpacity onPress={() => setOnboardingProgress(onboardingProgress + 1)} className="green-bg-500 w-full rounded-[8px] my-2">
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
    } else if (onboardingProgress === 2) {
        return (
            <SafeAreaView className="blue-bg-300" edges={["top"]}>
                <Stack.Screen options={{ title: "Onboarding Page" }} />
                <View className="blue-bg-300 entire-screen flex-v">
                    <Image source={require("../../../assets/icons/oneskylogo.png")} className="self-center my-12"/>
                    <Image resizeMode="contain" source={require("../../../assets/icons/onboarding2.png")} className="absolute top-[-80px]" style={{width: width, height: height}}/>
                    <View className="h-[30vh] grow white-bg w-full rounded-tr-[36px] rounded-tl-[36px] p-10 flex-v items-cente absolute bottom-0" >
                        <Text className="text-[22px] my-3 font-semibold text-center">Take action & earn rewards</Text>
                        <Text className="text-center text-[13px] my-2 gray-600 font-light">Walk, cycle, ditch plastic waste and make living sustainable a habit. Get rewarded for your efforts</Text>
                        <TouchableOpacity onPress={() => setOnboardingProgress(onboardingProgress + 1)} className="green-bg-500 w-full rounded-[8px] my-2">
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
    } else if (onboardingProgress === 3) {
        return (
            <SafeAreaView className="blue-bg-300" edges={["top"]}>
                <Stack.Screen options={{ title: "Onboarding Page" }} />
                <View className="blue-bg-300 entire-screen flex-v">
                    <Image source={require("../../../assets/icons/oneskylogo.png")} className="self-center my-12"/>
                    <Image resizeMode="contain" source={require("../../../assets/icons/onboarding3.png")} className="absolute top-[-80px]" style={{width: width, height: height}}/>
                    <View className="h-[30vh] grow white-bg w-full rounded-tr-[36px] rounded-tl-[36px] p-10 flex-v items-cente absolute bottom-0" >
                        <Text className="text-[22px] my-3 font-semibold text-center">Build a greener future</Text>
                        <Text className="text-center text-[13px] my-2 gray-600 font-light">Start your journey, shop sustainably and track your achievements.</Text>
                        <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="green-bg-500 w-full rounded-[8px] my-2">
                            <Text className="text-center p-3">
                                I want to make an impact
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        );  
    }
}

export default Onboarding;