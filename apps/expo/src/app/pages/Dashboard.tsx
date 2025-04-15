import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import NavBar from "../components/NavBar";

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
            <View className="flex items-end justify-between">
              <Text className="raleway text-[20px] font-bold"> Dashboard</Text>
              <Image source={require("../../../assets/icons/profile.png")} />
            </View>
          </View>
          <View className="flex-v">
            <View className="flex-v p-5">
              <Text className="raleway my-3 text-[16px] font-semibold">
                Your impact
              </Text>
              <View className="mb-10 flex justify-between">
                <View className="flex-v">
                  <View className="blue-bg-300 my-2 w-[110px] rounded-[12px] p-3">
                    <Text className="sora text-center text-[25px] font-semibold">
                      {statCO + "kg"}
                    </Text>
                  </View>
                  <View className="flex w-[110px] items-center justify-between px-1">
                    <Text className="w-half raleway font-semibold">
                      CO2 saved
                    </Text>
                    <Image
                      className="stat-images"
                      resizeMode="contain"
                      source={require("../../../assets/icons/co2.png")}
                    />
                  </View>
                </View>

                <View className="flex-v">
                  <View className="blue-bg-300 my-2 w-[110px] rounded-[12px] p-3">
                    <Text className="sora text-center text-[25px] font-semibold">
                      {statTrees}
                    </Text>
                  </View>
                  <View className="flex w-[110px] items-center justify-between px-1">
                    <Text className="w-half raleway font-semibold">
                      Trees planted
                    </Text>
                    <Image
                      className="stat-images"
                      resizeMode="contain"
                      source={require("../../../assets/icons/trees.png")}
                    />
                  </View>
                </View>

                <View className="flex-v">
                  <View className="blue-bg-300 my-2 w-[110px] rounded-[12px] p-3">
                    <Text className="sora text-center text-[25px] font-semibold">
                      {statPlastic}
                    </Text>
                  </View>
                  <View className="flex w-[110px] items-center justify-between px-1">
                    <Text className="raleway font-semibold">
                      Plastics recycled
                    </Text>
                    <Image
                      className="stat-images"
                      resizeMode="contain"
                      source={require("../../../assets/icons/plastic.png")}
                    />
                  </View>
                </View>
              </View>
              <Text className="raleway my-3 text-[16px] font-semibold">
                Achievements
              </Text>
              <View className="blue-bg-300 mb-8 flex w-full justify-between rounded-[12px] px-7 py-5">
                <View className="flex-v justify-between">
                  <Text className="text-[16px] font-semibold">
                    Total points
                  </Text>
                  <Text className="my-5 text-[24px] font-semibold">
                    {totalPoints}
                  </Text>
                  <View className="flex items-center">
                    <Image
                      resizeMode="contain"
                      className="ml-[-3px] h-[25px]"
                      source={require("../../../assets/icons/increase-points.png")}
                    />
                    <Text className="raleway">+150 more points this week</Text>
                  </View>
                </View>
                <Image
                  resizeMode="contain"
                  className="h-[120px]"
                  source={require("../../../assets/icons/coins.png")}
                />
              </View>

              <View className="flex-v blue-bg-300 mb-4 w-full justify-between rounded-[12px] px-7 py-5">
                <View className="flex items-center justify-between">
                  <Text className="raleway text-[16px] font-semibold">
                    Total Badges
                  </Text>
                  <Text className="text-[12px]">
                    <Text className="text-[32px] font-semibold">47</Text>/100
                  </Text>
                </View>
                <View className="flex">
                  <View className="mr-6 flex items-center">
                    <Image
                      resizeMode="contain"
                      className="h-[30px] w-[30px]"
                      source={require("../../../assets/icons/bronze-badge.png")}
                    />
                    <Text className="sora text-[18px] font-semibold">
                      {bronzeBadges}
                    </Text>
                  </View>

                  <View className="mr-6 flex items-center">
                    <Image
                      resizeMode="contain"
                      className="h-[30px] w-[30px]"
                      source={require("../../../assets/icons/silver-badge.png")}
                    />
                    <Text className="sora text-[18px] font-semibold">
                      {silverBadges}
                    </Text>
                  </View>

                  <View className="mr-6 flex items-center">
                    <Image
                      resizeMode="contain"
                      className="h-[30px] w-[30px]"
                      source={require("../../../assets/icons/gold-badge.png")}
                    />
                    <Text className="sora text-[18px] font-semibold">
                      {goldBadges}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="green-bg-500 w-full rounded-[8px] py-4">
                <Text className="raleway text-center font-semibold">
                  View Badges
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <NavBar selectedPage={"Dashboard"} />
      </SafeAreaView>
    </View>
  );
};

export default Dashboard;
