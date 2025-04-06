import { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from '../components/ProgressBar';

const Meal = () => {
    const [totalMeals, setTotalMeals] = useState(0);
    const [fulfilled, setFulfilled] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);


    const handleMealSelect = (mealTypeId: string) => {
        setSelectedMealId(selectedMealId === mealTypeId ? null : mealTypeId);
    };

    const handleSubmit = () => {
        if (selectedMealId) {
            setTotalMeals(totalMeals + 1);
            // Add any other logic you need when submitting
        }
    };

  return (
    <View className='meals'>
        <SafeAreaView className="h-full" edges={["top", "bottom"]}>
            <ProgressBar progression={totalMeals} numProgressions={3} points={50}/>
            <View className='mt-8'>
                <Text className="text-[20px] font-semibold sora py-5">Select the type of meal</Text>
            </View>
            <View className="flex-1 flex-col gap-4">
                {mealTypes.map((mealType) => (
                    <Pressable
                        key={mealType.id}
                        onPress={() => handleMealSelect(mealType.id)}
                        className={`meals-card ${selectedMealId !== mealType.id ? 'bg-white' : 'green-bg-50'} w-full h-full border border-[#D9EBB2]`}
                        >
                            <View className={`meals-radio ${selectedMealId !== mealType.id ? 'border border-[#E7E5E4]' : 'border-[2px] border-[#A1CE3F]'}`} />
                                <Image resizeMode="contain" source={mealType.icon} className="size-[100px]"/>
                                <Text className="text-sm font-semibold absolute bottom-3">{mealType.title}</Text>
                    </Pressable>
                ))}
                <TouchableOpacity
                    disabled={!selectedMealId}
                    onPress={alert.bind(null, `You selected the ${selectedMealId} meal`)}
                    className={`w-full py-3 rounded-lg ${!selectedMealId ? "opacity-50 disabled-bg" : "green-bg-500"}`}
                >
                    <Text className="text-center">Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
  )
}
const mealTypes = [
    { id: 'vegan', title: 'Vegan', icon: require("../../../assets/icons/vegan-meal.png")},
    { id: 'vegetarian', title: 'Vegetarian', icon: require("../../../assets/icons/vegetarian-meal.png")},
    { id: 'flexitarian', title: 'Flexitarian', icon: require("../../../assets/icons/flexitarian-meal.png")},
]



export default Meal