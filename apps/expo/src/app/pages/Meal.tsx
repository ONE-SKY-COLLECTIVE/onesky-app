import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


import Completion from '../components/Completion';
import ProgressBar from '../components/ProgressBar';
import { rem } from "react-native-css-interop";

const Meal = () => {
    const [totalMeals, setTotalMeals] = useState(0);
    const [collectPoints, setCollectPoints] = useState<boolean>(false);
    const confettiAnimationRef = useRef<LottieView>(null);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
    const [remindMeMealLog, setRemindMeMealLog] = useState<boolean>(false);

    const dailyGoal = 3;
    const router= useRouter();

    const mealImages: Record<string, any> = {
        'vegan': require("../../../assets/images/vegan-meal.jpg"),
        'vegetarian': require("../../../assets/images/vegetarian-meal.jpg"),
        'flexitarian': require("../../../assets/images/flexitarian-meal.jpg"),
     };

     const trackYourMealInformation = [
         { id: 'thecloud', icon: require("../../../assets/icons/thecloud.png"), description: "Help to reduce carbon footprint by lowering your meat intake."},
         { id: 'star', icon: require("../../../assets/icons/star.png"), description: "Log your meal 3x a day and earn maximum points."},
         { id: 'planet', icon: require("../../../assets/icons/planet.png"), description: "Join the One Sky community in making a difference for our environment."},
     ];

    const mealTypes = [
        { id: 'vegan', title: 'Vegan', icon: require("../../../assets/icons/vegan-meal.png"), description: "Eating a vegan diet can reduce your carbon footprint by 73%, save water, forests and hundreds of animals a year."},
        { id: 'vegetarian', title: 'Vegetarian', icon: require("../../../assets/icons/vegetarian-meal.png"), description: "It only takes 25 gallons of water to produce 1 pound of wheat, but 2500 gallons to produce 1 pound of meat."},
        { id: 'flexitarian', title: 'Flexitarian', icon: require("../../../assets/icons/flexitarian-meal.png"), description: "1.3 billion people could be fed by the grain that is currently being fed to livestock for meat production."},
    ];

    const handleMealSelect = (mealTypeId: string) => {
        setSelectedMealId(selectedMealId === mealTypeId ? null : mealTypeId);
    };

    const handleSubmit = () => {
        if (selectedMealId) {
            setConfirm(true);
            setTotalMeals(prevTotal => prevTotal + 1);

            if (confettiAnimationRef.current) {
                confettiAnimationRef.current.play(0, 110);
            }
        }
    };

    const handleRemindMe = () => {
        setRemindMeMealLog(true);

    }

    const handleAdditionalSubmit = () => {
        setConfirm(false);
        setSelectedMealId(null);
    };

    useEffect(() => {
        if (confettiAnimationRef.current) {
            confettiAnimationRef.current.play(110, 110);
        }
    }, [])


     if (collectPoints) {
         return <Completion points={50} activityName="meal log" />
     }
  return (

      <View className="meals flex-1">
          <SafeAreaView className="h-full w-full relative" edges={["top", "bottom"]}>
            {!remindMeMealLog ? (
                <View className='absolute bg-[#C4EFF7] h-36 w-screen inset-0  rounded-b-[36px]'>
                    <Pressable
                        className='w-full flex flex-row justify-start items-center absolute left-5 bottom-5 cursor-pointer'
                        onPress={() => router.push("/pages/Homepage")}
                    >
                        <Image resizeMode="contain" source={require("../../../assets/icons/arrow.png")} />
                        <Text className='text-left text-lg'>Log your meal</Text>
                    </Pressable>
                </View>
            ) : (
                <View className='w-full'>
                    <ProgressBar progression={totalMeals} numProgressions={3} points={50} />
                </View>
            )}
            {!remindMeMealLog && (
                <View className="flex-1 gap-4 mt-36 w-11/12 mx-auto">
                    <Image resizeMode="contain" source={require("../../../assets/images/plates.png")} className="w-full h-80" />
                    <Text className='text-left text-2xl font-bold mt-12'>Track your meals</Text>
                    {trackYourMealInformation.map((item) => (
                        <View key={item.id} className='flex flex-row justify-start items-center w-11/12'>
                            <Image resizeMode="contain" source={item.icon} className="size-6"/>
                            <Text className='text-left text-lg leading-tight ml-4'>{item.description}</Text>
                        </View>
                    ))}
                    <View className="mt-8">

                        <Text className='text-left text-lg leading-tight'>Got it! No need to remind me again</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleRemindMe()}
                        className={`w-full py-3 rounded-lg ${"green-bg-500"} absolute bottom-0`}
                        >
                        <Text className="text-center">Get started</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!confirm && remindMeMealLog && (
                <>
                    <View className='mt-8 mx-4'>
                        <Text className="text-[20px] font-semibold sora py-5">Select the type of meal</Text>
                    </View>
                    <View className="flex-1 flex-col gap-4 m-4">
                        {mealTypes.map((mealType) => (
                            <Pressable
                                key={mealType.id}
                                onPress={() => handleMealSelect(mealType.id)}
                                className={`meals-card ${selectedMealId !== mealType.id ? 'bg-white' : 'green-bg-50'}`}
                            >
                                <View className={`meals-radio ${selectedMealId !== mealType.id ? 'border border-[#E7E5E4]' : 'border-[2px] border-[#A1CE3F]'}`} />
                                <Image resizeMode="contain" source={mealType.icon} className="size-[100px]"/>
                                <Text className="text-sm font-semibold absolute bottom-3">{mealType.title}</Text>
                            </Pressable>
                        ))}
                        <TouchableOpacity
                            disabled={!selectedMealId}
                            onPress={() => handleSubmit()}
                            className={`w-full py-3 rounded-lg ${!selectedMealId ? "opacity-50 disabled-bg" : "green-bg-500"}`}
                        >
                            <Text className="text-center">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {confirm && (
                <>
                    <Image resizeMode="center" source={selectedMealId ? mealImages[selectedMealId] : undefined} className="w-full"/>
                    <View className='mx-auto w-10/12 -mt-36'>
                        <Text className='text-center'>{selectedMealId ? mealTypes.find(meal => meal.id === selectedMealId)?.description : undefined}</Text>
                    </View>
                    <View className={`${confirm ? "refill-div-confirm" : ""} refill-div `}>
                        <View className="yellow-bg-500 rounded-[100px] p-3 text-[12px] fit-width self-start">
                            <Text>+{totalMeals} {totalMeals === 1 ? 'log added today' : 'logs added today'}</Text>
                        </View>
                        <Text className="text-[20px] font-semibold sora py-5">
                            {!confirm
                                ? "How many bottles do you have"
                                : totalMeals >= dailyGoal
                                    ? "You're Amazing!"
                                    : "Good job!"
                            }
                        </Text>
                        <Text className="text-[14px] raleway">{totalMeals >= dailyGoal ? "Today's activity is complete!\nCome back tomorrow to keep saving the planet." : "Keep sharing your meal log"}</Text>
                        {confirm &&
                            <Image resizeMode="contain" source={require("../../../assets/icons/meal-planet.png")} className="absolute size-[100px] left-3/4 top-[20px]"/>
                        }
                        {!confirm ?
                            <TouchableOpacity className={"w-full py-3 rounded-[8px] green-bg-500"}><Text className="text-center">Confirm meal log</Text></TouchableOpacity>
                            :
                            <View>
                                {totalMeals >= dailyGoal ?
                                    <TouchableOpacity onPress={() => setCollectPoints(true)} className="green-bg-500 rounded-[8px] py-3 mb-2 mt-8"><Text className="text-center">Collect your points</Text></TouchableOpacity>
                                    :
                                    <View>
                                    <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="border-2 rounded-[8px] py-3 mb-2 mt-8"><Text className="text-center">Go to home</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleAdditionalSubmit()} className="green-bg-500 w-full py-3 rounded-[8px] mt-2"><Text className="text-center">Submit another meal log</Text></TouchableOpacity>
                                    </View>
                                }
                            </View>
                        }
                        <LottieView
                            ref={confettiAnimationRef}
                            source={require("../../../assets/animations/ConfettiAnimation.json")}
                            style={styles.confettiAnimation}
                            autoPlay={true}
                            loop={false}
                        />
                    </View>
                </>
            )}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
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


export default Meal