import { router } from "expo-router"
import { TouchableOpacity, Text, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Completion = ({points, activityName}: {points: number, activityName: string}) => {
    return (
        <SafeAreaView className=" pt-4 flex-v h-full green-bg-50" edges={["top"]}>
            <TouchableOpacity className="px-5" onPress={() => router.push("/pages/Homepage")}>
                <Image resizeMode="contain" className="h-[40px] w-[40px]" source={require("../../../assets/icons/x-button.png")} />
            </TouchableOpacity>
            <View className="flex-v justify-center flex-grow pb-20">
                <Text className="raleway text-[22px] font-bold text-center">
                    Yay, Congratulations!
                </Text>
                <Image resizeMode="contain" source={require("../../../assets/icons/quiz-done.png")} className="quiz-done"/>
                <Text className="text-center mt-4 mb-8 gray-800">You have successfully completed {activityName}!</Text>
                <View className="flex items-center justify-center">
                    <Image className="diamond-large"source={require('../../../assets/icons/diamond.png')}/>
                    <Text className="raleway test-[16px] font-bold ml-2">{points} pts</Text>
                </View>
                <Text className="gray-800 text-center mt-5">
                {points} pts are on your way!!
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Completion;