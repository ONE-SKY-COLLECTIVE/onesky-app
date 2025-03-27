import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Dashboard = () => {
    // Temporary variables until we get API
    const statCO = 1740;
    const statTrees = 50;
    const statPlastic = 135;
    const totalPoints = 219863;
    const bronzeBadges = 20;
    const silverBadges = 15;
    const goldBadges = 12;

    return (
        <View className="h-full">
            <SafeAreaView className="h-full" edges={["bottom"]}>
                <View className="flex-v">
                    <View className="dashboard-header">
                        <View className="flex justify-between items-end">
                            <Text className="text-[20px] font-bold raleway"> Dashboard</Text>
                            <Image source={require("../../../assets/icons/profile.png")}/>
                        </View>
                    </View>
                    <View className="flex-v">
                        <View className="flex-v p-5">
                            <Text className="text-[16px] font-semibold my-3 raleway">Your impact</Text>
                            <View className="flex justify-between mb-10">
                                <View className="flex-v">
                                    <View className="blue-bg-300 p-3 w-[110px] rounded-[12px] my-2">
                                        <Text className="sora text-[25px] font-semibold text-center">{statCO + "kg"}</Text>
                                    </View>
                                    <View className="flex justify-between w-[110px] items-center px-1">
                                        <Text className="w-half font-semibold raleway">
                                            CO2 saved
                                        </Text>
                                        <Image className="stat-images" resizeMode="contain" source={require('../../../assets/icons/co2.png')}/>
                                    </View>
                                </View>

                                <View className="flex-v">
                                    <View className="blue-bg-300 p-3 w-[110px] rounded-[12px] my-2">
                                        <Text className="sora text-[25px] font-semibold text-center">{statTrees}</Text>
                                    </View>
                                    <View className="flex justify-between w-[110px] items-center px-1">
                                        <Text className="w-half font-semibold raleway">
                                            Trees planted
                                        </Text>
                                        <Image className="stat-images" resizeMode="contain" source={require('../../../assets/icons/trees.png')}/>
                                    </View>
                                </View>

                                <View className="flex-v">
                                    <View className="blue-bg-300 p-3 w-[110px] rounded-[12px] my-2">
                                        <Text className="sora text-[25px] font-semibold text-center">{statPlastic}</Text>
                                    </View>
                                    <View className="flex justify-between w-[110px] items-center px-1">
                                        <Text className="font-semibold raleway">
                                            Plastics recycled
                                        </Text>
                                        <Image className="stat-images" resizeMode="contain" source={require('../../../assets/icons/plastic.png')}/>
                                    </View>
                                </View>
                                
                            </View>
                            <Text className="text-[16px] font-semibold my-3 raleway">Achievements</Text>
                            <View className="flex justify-between blue-bg-300 w-full rounded-[12px] py-5 px-7 mb-8">
                                <View className="flex-v justify-between">
                                    <Text className="font-semibold text-[16px]">Total points</Text>
                                    <Text className="text-[24px] font-semibold my-5">{totalPoints}</Text>
                                    <View className="flex items-center">
                                        <Image resizeMode="contain" className="h-[25px] ml-[-3px]" source={require('../../../assets/icons/increase-points.png')}/>
                                        <Text className="raleway">
                                            +150 more points this week
                                        </Text>
                                    </View>
                                </View>
                                <Image resizeMode="contain" className="h-[120px]" source={require("../../../assets/icons/coins.png")}/>
                            </View>

                            <View className="flex-v justify-between blue-bg-300 w-full rounded-[12px] py-5 px-7 mb-4">
                                <View className="flex justify-between items-center">
                                    <Text className="text-[16px] raleway font-semibold">Total Badges</Text>
                                    <Text className="text-[12px]"><Text className="text-[32px] font-semibold">47</Text>/100</Text>
                                </View>
                                <View className="flex">
                                    <View className="flex items-center mr-6">
                                        <Image resizeMode="contain" className="h-[30px] w-[30px]" source={require('../../../assets/icons/bronze-badge.png')}/>
                                        <Text className="text-[18px] sora font-semibold">{bronzeBadges}</Text>
                                    </View>

                                    <View className="flex items-center mr-6">
                                        <Image resizeMode="contain" className="h-[30px] w-[30px]" source={require('../../../assets/icons/silver-badge.png')}/>
                                        <Text className="text-[18px] sora font-semibold">{silverBadges}</Text>
                                    </View>

                                    <View className="flex items-center mr-6">
                                        <Image resizeMode="contain" className="h-[30px] w-[30px]" source={require('../../../assets/icons/gold-badge.png')}/>
                                        <Text className="text-[18px] sora font-semibold">{goldBadges}</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity className="w-full green-bg-500 rounded-[8px] py-4">
                                <Text className="text-center font-semibold raleway">View Badges</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <NavBar selectedPage={"Dashboard"}/>
            </SafeAreaView>
        </View>
    )
}

export default Dashboard;