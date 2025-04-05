import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const MealCard = () => {
    const [fulfilled, setFulfilled] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null);


    const handleMealSelect = (mealTypeId: string) => {
        setSelectedMealId(selectedMealId === mealTypeId ? null : mealTypeId);
    };

  return (
  <View className="flex-1 flex-col gap-4">
                {mealTypes.map((mealType) => (
                    <Pressable
                        key={mealType.id}
                        onPress={() => handleMealSelect(mealType.id)}
                        className={`flex-1 size-8 flex justify-center items-center rounded-xl ${selectedMealId !== mealType.id ? 'bg-white' : 'green-bg-50'} w-full h-full border border-[#D9EBB2]`}
                        >
                            <View className={`absolute left-4 top-4 size-4 rounded-full ${selectedMealId !== mealType.id ? 'border border-[#E7E5E4]' : 'border-[2px] border-[#A1CE3F]'}`} />
                            <Image resizeMode="contain" source={mealType.icon} className="size-[100px]"/>
                            <Text className="text-sm font-semibold">{mealType.title}</Text>
                    </Pressable>
                ))}
                <TouchableOpacity disabled={!selectedMealId} className={`w-full py-3 rounded-lg ${!selectedMealId ? "opacity-50 disabled-bg" : "green-bg-500"}`}><Text className="text-center">Submit</Text></TouchableOpacity>
            </View>
  )
}

const mealTypes = [
    { id: 'vegan', title: 'Vegan', icon: require("../../../assets/icons/vegan-meal.png")},
    { id: 'vegetarian', title: 'Vegetarian', icon: require("../../../assets/icons/vegetarian-meal.png")},
    { id: 'flexitarian', title: 'Flexitarian', icon: require("../../../assets/icons/flexitarian-meal.png")},
]

export default MealCard