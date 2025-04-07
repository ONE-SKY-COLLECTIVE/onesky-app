import { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from '../components/ProgressBar';

const Meal = () => {
    const [totalMeals, setTotalMeals] = useState(0);
    const [fulfilled, setFulfilled] = useState(false);
    const [confirm, setConfirm] = useState(false);
    // const [selectedMealId, setSelectedMealId] = useState<string | null>('vegan');
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);


    const handleMealSelect = (mealTypeId: string) => {
        setSelectedMealId(selectedMealId === mealTypeId ? null : mealTypeId);
    };

    const handleSubmit = () => {
        if (selectedMealId) {
            setTotalMeals(totalMeals + 1);
            setConfirm(true);
        }
    };

    const mealImages: Record<string, any> = {
        'vegan': require("../../../assets/images/vegan-meal.jpg"),
        'vegetarian': require("../../../assets/images/vegetarian-meal.jpg"),
        'flexitarian': require("../../../assets/images/flexitarian-meal.png"),
     };


  return (
    <View className='meals'>
        <SafeAreaView className="h-full" edges={["top", "bottom"]}>
            <View className='w-full'>
                <ProgressBar progression={totalMeals} numProgressions={3} points={50}/>
            </View>
            {!confirm ? (
                <>
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
                            onPress={() => handleSubmit()}
                            className={`w-full py-3 rounded-lg ${!selectedMealId ? "opacity-50 disabled-bg" : "green-bg-500"}`}
                        >
                            <Text className="text-center">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </>

            ): (
                <>
                    <Image resizeMode="center" source={selectedMealId ? mealImages[selectedMealId] : undefined} />
                    <View className='mx-auto w-1/2 -mt-36'>
                        {selectedMealId === 'vegan' && (
                            <Text className='text-center'>Eating a vegan diet can reduce your carbon footprint by 73%, save water, forests and hundreds of animals a year.</Text>
                        )}
                        {selectedMealId === 'vegetarian' && (
                            <Text className='text-center'>It only takes 25 gallons of water to produce 1 pound of wheat, but 2500 gallons to produce 1 pound of meat.</Text>
                        )}
                        {selectedMealId === 'flexitarian' && (
                            <Text className='text-center'>1.3 billion people could be fed by the grain that is currently being fed to livestock for meat production.</Text>
                        )}
                    </View>
                </>
            )}

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