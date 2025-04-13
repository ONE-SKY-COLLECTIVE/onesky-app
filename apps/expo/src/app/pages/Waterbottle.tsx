import { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Pressable, Image } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import ProgressBar from "../components/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Completion from "../components/Completion";


const Waterbottle = () => {
    const refillAnimationRef = useRef<LottieView>(null);
    const confettiAnimationRef = useRef<LottieView>(null);
    const [refillNum, setRefillNum] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [collectPoints, setCollectPoints] = useState(false);
    const router = useRouter();
    const [exitWithoutRefilling, setExitWithoutRefilling] = useState(false);

    // TODO: When integrated with backend, initialize totalRefills with backend data
    const [totalRefills, setTotalRefills] = useState(0);
    // TODO: When integrated with backend, take this from API
    const dailyGoal = 7;
    // TODO: When integrated with backend, must know when user has completed the activity
    const [fulfilled, setFulfilled] = useState(false);


    const handleRefillConfirm = () => {
        setTotalRefills(totalRefills + refillNum);
        setRefillNum(0);
        if (confettiAnimationRef.current) {
            confettiAnimationRef.current.play(0, 110);
        }
        if (refillAnimationRef.current) {
            refillAnimationRef.current.play(0, 43);
        }
        setConfirm(true);
    }

    const handleExitWithoutRefilling = () => {
        if (!confirm && !exitWithoutRefilling) {
            setExitWithoutRefilling(true);
        }  else {
            router.push("/pages/Homepage");
        }
    }

    const handleContinueRefilling = () => {
        setExitWithoutRefilling(false);
    }

    useEffect(() => {
        if (confettiAnimationRef.current) {
            confettiAnimationRef.current.play(110, 110);
        }
        if (refillAnimationRef.current) {
            refillAnimationRef.current.play(5, 5);
        }
    }, [])

    // Temporary fix for confetti animation showing prematurely
    useEffect(() => {
        if (confettiAnimationRef.current) {
            confettiAnimationRef.current.play(110, 110);
        }
    }, [exitWithoutRefilling])

    if (collectPoints) {
        return <Completion points={50} activityName="the refill activity"/>
    }

    return (
        <View className="waterbottle-page">
            <SafeAreaView className="h-full" edges={["top", "bottom"]}>
            <ProgressBar progression={totalRefills} numProgressions={7} points={50} utility={handleExitWithoutRefilling}/>
            <View className="refill-animation-div">
                <LottieView
                    ref={refillAnimationRef}
                    source={require("../../../assets/animations/RefillAnimation1.json")}
                    style={styles.refillAnimation}
                    autoPlay={false}
                    loop={false}
                />
            </View>
            {!exitWithoutRefilling ?
            <View className={`${confirm ? "refill-div-confirm" : ""} refill-div `}>
                    <View className="yellow-bg-500 rounded-[100px] p-3 text-[12px] fit-width self-start">
                        <Text>{totalRefills} bottles filled today</Text>
                    </View>
                    <Text className="text-[20px] font-semibold sora py-5">
                        {!confirm
                            ? "How many bottles do you have"
                            : totalRefills >= dailyGoal
                                ? "You're Amazing!"
                                : "Good job!"
                        }
                    </Text>
                    <Text className="text-[14px] raleway">{!confirm ? "With every refill, you take a step toward a greener planet." : totalRefills >= dailyGoal ? "Today's activity is complete!\nCome back tomorrow to keep saving the planet." : "Keep up the great work!"}</Text>
                    {confirm && totalRefills < dailyGoal &&
                        <Image resizeMode="contain" source={require("../../../assets/icons/refill-confirm.png")} className="absolute h-[100px] w-[100px] left-3/4 top-[20px]"/>

                    }
                    {!confirm &&
                    <View className="flex justify-between mt-8 mb-3">
                        {Array.from({length: 7}).map((_, index) => (
                            <TouchableOpacity key={index} className={`py-3 px-4 border-1 ${refillNum >= index + 1 && "green-bg-50" }`} onPress={() => setRefillNum(index + 1)}>
                                <Text>{index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    }
                    {!confirm ?
                        <TouchableOpacity onPress={handleRefillConfirm} disabled={refillNum <= 0} className={`w-full py-3 rounded-[8px] ${refillNum <= 0 ? "opacity-50 disabled-bg" : "green-bg-500"}`}><Text className="text-center">Confirm refill</Text></TouchableOpacity>
                        :
                        <View>
                            {totalRefills >= dailyGoal ?
                                <TouchableOpacity onPress={() => setCollectPoints(true)} className="green-bg-500 rounded-[8px] py-3 mb-2 mt-8"><Text className="text-center">Collect your points</Text></TouchableOpacity>
                                :
                                <View>
                                <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="border-2 rounded-[8px] py-3 mb-2 mt-8"><Text className="text-center">Go to home</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setConfirm(false)} className="green-bg-500 w-full py-3 rounded-[8px] mt-2"><Text className="text-center">Refill another bottle</Text></TouchableOpacity>
                                </View>
                            }
                        </View>
                }
                    <LottieView
                    ref={confettiAnimationRef}
                    source={require("../../../assets/animations/ConfettiAnimation.json")}
                    style={styles.confettiAnimation}
                    autoPlay={false}
                    loop={false}/>
            </View>
            :
            <View className="refill-div">
                <View className="flex items-center">
                    <Image resizeMode="contain" source={require("../../../assets/icons/warning.png")} className="w-[40px] h-[40px]"/>
                    <Text className="text-[20px] font-semibold sora py-5">
                        Don't leave us!
                    </Text>
                </View>
                <Text className="text-[14px] raleway w-half">Don’t leave us yet without refilling your bottle.</Text>
                <Image resizeMode="contain" source={require("../../../assets/icons/leave-icon.png")} className="absolute h-[100px] w-[100px] left-3/4 top-[20px]"/>

                <View>
                    <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="border-2 rounded-[8px] py-3 mb-2 mt-8"><Text className="text-center">Quit</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleContinueRefilling} className="green-bg-500 w-full py-3 rounded-[8px] mt-2"><Text className="text-center">Continue Refilling</Text></TouchableOpacity>
                </View>
            </View>
            }
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    refillAnimation: {
        height: 400,
        width: '100%',
        padding: 0,
        margin: 0,
    },
    confettiAnimation: {
        height: 400,
        width: '100%',
        padding: 0,
        margin: 0,
        bottom: '30%',
        left: '10%',
        position: 'absolute',
        zIndex: -1000
    }
  });

export default Waterbottle;
