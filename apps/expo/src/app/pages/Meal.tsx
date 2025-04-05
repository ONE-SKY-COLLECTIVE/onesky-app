import { useState } from 'react';
import { Image, InputAccessoryView, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from '../components/ProgressBar';

const Meal = () => {
    const [totalMeals, setTotalMeals] = useState(0);
    const [fulfilled, setFulfilled] = useState(false);
    let [mealChosen, setMealChosen] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

    // const chosenMeal = (mealTypeId: string) => {
    //     const mealType = mealTypes.find((meal) => meal.id === mealTypeId);
    //     if (mealType) {
    //         setMealChosen(true);
    //         setConfirm(true);
    //         setTotalMeals(totalMeals + 1);
    //     }
    //     return mealType;
    // };

    const handleMealSelect = (mealTypeId: string) => {
        // If the same meal is clicked again, deselect it; otherwise, select the new meal
        setSelectedMealId(selectedMealId === mealTypeId ? null : mealTypeId);
        setMealChosen(selectedMealId === mealTypeId ? mealChosen = !mealChosen : mealChosen);
    };

    const handleSubmit = () => {
        if (selectedMealId) {
            setTotalMeals(totalMeals + 1);
            // Add any other logic you need when submitting
        }
    };

  return (
    <View className='flex justify-center items-start h-full'>
        <SafeAreaView className="h-full" edges={["top", "bottom"]}>
            <ProgressBar progression={totalMeals} numProgressions={3} points={50}/>
            <View className='mt-8'>
                <Text className="text-[20px] font-semibold sora py-5">Select type of the meal</Text>
            </View>
                <View className="flex-1 flex-col gap-4">
                    {mealTypes.map((mealType) => (
                        <Pressable
                            key={mealType.id}
                            onPress={() => handleMealSelect(mealType.id)}
                            className={`flex-1 size-8 flex justify-center items-center rounded-xl ${selectedMealId !== mealType.id ? 'bg-white' : 'green-bg-100'} w-full h-full border border-[#D9EBB2]`}
                            >
                                <View className={`absolute left-4 top-4 size-4 rounded-full ${selectedMealId !== mealType.id ? 'border border-[#E7E5E4]' : 'border-4 border-[#A1CE3F]'}`} />
                                <Image resizeMode="contain" source={mealType.icon} className="size-[100px]"/>
                                <Text className="text-sm font-semibold">{mealType.title}</Text>
                        </Pressable>
                    ))}
                    <TouchableOpacity disabled={!selectedMealId} className={`w-full py-3 rounded-lg ${!selectedMealId ? "opacity-50 disabled-bg" : "green-bg-500"}`}><Text className="text-center">Submit</Text></TouchableOpacity>
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