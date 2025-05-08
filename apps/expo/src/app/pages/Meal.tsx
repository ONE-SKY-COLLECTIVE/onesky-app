import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Completion from '../components/Completion';
import ProgressBar from '../components/ProgressBar';

const Meal = () => {
    const [totalMeals, setTotalMeals] = useState<number>(0);
    const [collectPoints, setCollectPoints] = useState<boolean>(false);
    const confettiAnimationRef = useRef<LottieView>(null);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
    const [remindMeMealLog, setRemindMeMealLog] = useState<boolean>(false);
    const [remindMe, setRemindMe] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [exitWithoutMealLog, setExitWithoutMealLog] = useState<boolean>(false);

    const dailyGoal = 3;
    const router = useRouter();

    useEffect(() => {
        const checkRemindMeMealLog = () => {
            try {
                setRemindMe(!!SecureStore.getItem('remindMeMealLog'));
            } catch (error) {
                console.error('Error reading from SecureStore:', error);
            }
        };

        checkRemindMeMealLog();
    }, []);

    const mealImages: Record<string, any> = {
        'vegan': require("../../../assets/images/vegan-meal.png"),
        'vegetarian': require("../../../assets/images/vegetarian-meal.png"),
        'flexitarian': require("../../../assets/images/flexitarian-meal.png"),
     };

     const trackYourMealInformation = [
         { id: 'thecloud', icon: require("../../../assets/icons/thecloud.png"), description: "Help to reduce carbon footprint by lowering your meat intake."},
         { id: 'star', icon: require("../../../assets/icons/star.png"), description: "Log your meal 3x a day and earn maximum points."},
         { id: 'planet', icon: require("../../../assets/icons/planet.png"), description: "Join the One Sky community in making a difference for our environment."},
     ];

    const mealTypes = [
        { id: 'vegan', title: 'Vegan meal:', icon: require("../../../assets/icons/vegan-meal.png"), description: "You’re a star! Switching to a vegan diet slashes greenhouse gas and land use by up to 75%, also uses 54% less water than meat-based meals."},
        { id: 'vegetarian', title: 'Vegetarian meal:', icon: require("../../../assets/icons/vegetarian-meal.png"), description: "Way to go! Vegetarian diets produce about 50% fewer greenhouse gases, require 27% less energy, and leave a 41.5% smaller environmental footprint compared to meat-based meals"},
        { id: 'flexitarian', title: 'Flexitarian meal:', icon: require("../../../assets/icons/flexitarian-meal.png"), description: "Great work! By swapping out your red meat, you have helped reduce our reliance on cattle farming which releases 74.5 million tons of methane, which is 30x more potent than CO2, each year."},
    ];

    const toggleCheckbox = () => {
        setChecked(prevChecked => {
            const newValue = !prevChecked

            return newValue;
        });
    };

    const handleContinueMealLog = () => {
        setExitWithoutMealLog(false);
    }
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

    const handleRemindMe = async () => {
        if (checked) {
            try {
                SecureStore.setItem('remindMeMealLog', 'true');
            } catch (error) {
                console.error('Error saving to SecureStore:', error);
            }
        }
        setRemindMeMealLog(true);
    };


    const handleAdditionalSubmit = () => {
        setConfirm(false);
        setSelectedMealId(null);
    };

    const handleExitWithoutMealLog = () => {
        if (!confirm && (remindMeMealLog || remindMe) && !exitWithoutMealLog ) {
            setExitWithoutMealLog(true);
        }  else {
            router.push("/pages/Homepage");
        }
    }

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
            {!remindMeMealLog && !remindMe ? (
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
                    <ProgressBar progression={totalMeals} numProgressions={3} points={50} utility={handleExitWithoutMealLog}/>
                </View>
            )}
            {!remindMeMealLog && !remindMe && (
                <View className="flex-1 gap-4 mt-32 w-11/12 mx-auto">
                    <Image resizeMode="contain" source={require("../../../assets/images/plates.png")} className="w-full h-80" />
                    <Text className='text-left text-2xl font-bold mt-12'>Track your meals</Text>
                    {trackYourMealInformation.map((item) => (
                        <View key={item.id} className='flex flex-row justify-start items-center w-11/12 my-2'>
                            <Image resizeMode="contain" source={item.icon} className="size-6"/>
                            <Text className='text-left text-lg leading-tight ml-4'>{item.description}</Text>
                        </View>
                    ))}
                    <View className="absolute bottom-20 flex-row items-center">
                        <Pressable
                            onPress={() => toggleCheckbox()}
                            className={`h-6 w-6 items-center justify-center rounded-md border ${
                            checked ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'
                            }`}
                        >
                            {checked && (
                            <Text className="text-white font-bold">✓</Text>
                            )}
                        </Pressable>

                        <Text className="ml-3 text-left text-lg leading-tight">
                            Got it! No need to remind me again
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleRemindMe()}
                        className={`w-full py-3 rounded-lg ${"green-bg-500"} absolute bottom-0`}
                        >
                        <Text className="text-center">Get started</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!confirm && (remindMeMealLog || remindMe) && (
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

            {confirm && (remindMeMealLog || remindMe) && (
                <>
                    <Image resizeMode="contain" source={selectedMealId ? mealImages[selectedMealId] : undefined} className="w-3/5 mx-auto"/>
                    <View className='mx-auto w-10/12 -mt-12'>
                        <Text className='text-center text-4xl'>{selectedMealId ? mealTypes.find(meal => meal.id === selectedMealId)?.title : undefined}</Text>
                    </View>
                    <View className='mx-auto w-10/12 mt-4'>
                        <Text className='text-center text-xl'>{selectedMealId ? mealTypes.find(meal => meal.id === selectedMealId)?.description : undefined}</Text>
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

            {exitWithoutMealLog && (
                <View className="refill-div">
                    <View className="flex items-center">
                        <Image resizeMode="contain" source={require("../../../assets/icons/warning.png")} className="w-[40px] h-[40px]"/>
                        <Text className="text-[20px] font-semibold sora py-5">
                            Don't leave us!
                        </Text>
                    </View>
                    <Text className="text-[14px] raleway w-half">Don’t leave us yet without logging your meal.</Text>
                    <Image resizeMode="contain" source={require("../../../assets/icons/leave-icon.png")} className="absolute h-[100px] w-[100px] left-3/4 top-[20px]"/>

                    <View>
                        <TouchableOpacity onPress={() => router.push("/pages/Homepage")} className="border-2 rounded-[8px] py-3 mb-2 mt-8"><Text className="text-center">Quit</Text></TouchableOpacity>
                        <TouchableOpacity onPress={handleContinueMealLog} className="green-bg-500 w-full py-3 rounded-[8px] mt-2"><Text className="text-center">Continue logging</Text></TouchableOpacity>
                    </View>
                </View>
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