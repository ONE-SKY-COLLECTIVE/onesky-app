import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";

export interface MapitemType {
  id:number,
  uri: ImageSourcePropType;
  text: string;
}

const Appliances = () => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);

  const mapData: MapitemType[] = [
    {
      id:1,
      uri: require("../../../assets/icons/Vector-app1.png"),
      text: "Help reduce wasted energy by turning off lights and unplugging appliances in stand-by mode",
    },
    {
      id:2,
      uri: require("../../../assets/icons/Vector-app2.png"),
      text: "Vampire power can add up to 5% to 10% of your household energy bill",
    },
    {
      id:3,
      uri: require("../../../assets/icons/Vector-app3.png"),
      text: "Turn off all lights and unplug all stand-by appliances to earn maximum points",
    },
  ];

  const styles = StyleSheet.create({
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
    },
    container: {},
    button: {
      height: 40,
      borderRadius: 8,
      backgroundColor: "#A1CE3F",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#000000",
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
  });

  return (
    <View className="h-full">
      <SafeAreaView className="h-full" edges={["bottom"]}>
        <View className="flex-1">
          <View className="dashboard-header">
            <View className="flex items-end justify-between">
              <View className="flex items-center">
                <TouchableOpacity
                  onPress={() => router.push("../pages/Homepage")}
                >
                  <Image source={require("../../../assets/icons/arrow.png")} />
                </TouchableOpacity>
                <Text className="raleway text-[14px] font-semibold">
                  Appliances Off
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full flex-1 items-center justify-center gap-y-11">
            <Image
              className="socket-image"
              source={require("../../../assets/icons/socket-with-charger 1.png")}
            />
            <View className="flex-v w-[350px] gap-14">
              <View className="flex-v gap-4">
                <Text className="sora text-[20px] font-bold">
                  Keep vampire power at bay
                </Text>
                <View className="flex-v gap-6">
                  {mapData.map((d, id) => (
                    <View className="vamp-list" key={id}>
                      <Image source={d.uri} />
                      <Text
                        style={{ lineHeight: 18 }}
                        className="raleway flex-1 text-[14px] font-medium"
                      >
                        {d.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="flex-v gap-y-5">
                <View className="flex gap-3">
                  <Checkbox
                    style={styles.checkbox}
                    color="#A1CE3F"
                    value={isChecked}
                    onValueChange={setChecked}
                  />
                  <Text
                    style={{ lineHeight: 18 }}
                    className="raleway w-80 text-[14px] font-medium"
                  >
                    Got it! No need to remind me again
                  </Text>
                </View>
                <View style={styles.container}>
                  <TouchableOpacity style={styles.button} onPress={()=>{router.push("../pages/ListAppliances")}}>
                    <Text
                      style={styles.buttonText}
                      className="raleway w-80 text-[14px] font-medium"
                    >
                      Get Started
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Appliances;
