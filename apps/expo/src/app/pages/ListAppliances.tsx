import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";

import Completion from "../components/Completion";
// import Completion from "../components/Completion";
import ProgressBar from "../components/ProgressBar";
import { MapitemType } from "./Appliances";

const ListAppliances = () => {
  const router = useRouter();

  const applianceList: MapitemType[] = [
    {
      id: 1,
      text: "Desk or room lights",
      uri: require("../../../assets/icons/bulb-appl.png"),
    },
    {
      id: 2,
      text: "Laptop or desktop",
      uri: require("../../../assets/icons/laptop-appl.png"),
    },
    {
      id: 3,
      text: "TV",
      uri: require("../../../assets/icons/tv-appl.png"),
    },
    {
      id: 4,
      text: "Printer",
      uri: require("../../../assets/icons/printer-appl.png"),
    },
    {
      id: 5,
      text: "Game console",
      uri: require("../../../assets/icons/joystick-appl.png"),
    },
    {
      id: 6,
      text: "Microwave oven",
      uri: require("../../../assets/icons/oven-appl1.png"),
    },
  ];
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    applianceList.some((item) => checkedItems[item.id] === true),
  );
  const [allSelected, setAllSelected] = useState<boolean>(
    applianceList.every((item) => checkedItems[item.id] === true),
  );

  const [progressBarLength, setProgressBarLength] = useState<number>(1);

  const [ownedAppliances, setOwnedAppliances] = useState<MapitemType[]>([]);

  const [selectedOwnedAppliances, setSelectedOwnedAppliances] = useState<{
    [key: number]: boolean;
  }>({});

  const [barProgression, setBarProgression] = useState<number>(0);

  const [points, setPoints] = useState<number>(0);

  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    setIsButtonDisabled(
      !applianceList.some((item) => checkedItems[item.id] === true),
    );
    setAllSelected(
      applianceList.every((item) => checkedItems[item.id] === true),
    );
  }, [checkedItems]);

  useEffect(() => {
    setIsButtonDisabled(
      !ownedAppliances.some(
        (item) => selectedOwnedAppliances[item.id] === true,
      ),
    );
    setAllSelected(
      ownedAppliances.every(
        (item) => selectedOwnedAppliances[item.id] === true,
      ),
    );
    setBarProgression(
      ownedAppliances.filter(
        (item) => selectedOwnedAppliances[item.id] === true,
      ).length,
    );
    setPoints(
      ownedAppliances.filter(
        (item) => selectedOwnedAppliances[item.id] === true,
      ).length * 2,
    );
  }, [selectedOwnedAppliances]);

  useEffect(() => {
    setProgressBarLength(ownedAppliances.length);
  }, [ownedAppliances]);

  if (completed === true) {
    return (
      <Completion
        points={points}
        activityName="switching off lights and unplugging appliances!"
      />
    );
  }

  const func = (text: string, appliances: MapitemType[], step: number) => (
    <View className="flex-v gap-[22px] px-5 pt-3">
      <View className="flex-v gap-2">
        <Text className="raleway text-[20px] font-bold">
          Keep vampire power at bay
        </Text>
        <Text
          className="raleway pr-5 text-[14px] font-medium"
          numberOfLines={3}
        >
          {text}
        </Text>
      </View>
      <View className="-mx-[10px] flex-row flex-wrap gap-x-5 px-3">
        {appliances.map((item, index) => {
          const isChecked: boolean =
            step === 1
              ? (checkedItems[item.id] ?? false)
              : (selectedOwnedAppliances[item.id] ?? false);
          // const isChecked: boolean = checkedItems[item.id] ?? false;
          const listClass = isChecked
            ? "flex-v item-appliance-selected justify-between items-evenly gap-3 p-3 w-1/2 px-[10px] mb-[12px]"
            : "flex-v item-appliance justify-between gap-3 p-3 w-1/2 px-[10px] mb-[12px]";
          return (
            <TouchableOpacity
              key={index}
              className={listClass}
              onPress={() => {
                // setCheckedItems((prev) => ({
                //   ...prev,
                //   [item.id]: !isChecked,
                // }));
                if (step === 1) {
                  setCheckedItems((prev) => ({
                    ...prev,
                    [item.id]: !isChecked,
                  }));
                } else {
                  setSelectedOwnedAppliances((prev) => ({
                    ...prev,
                    [item.id]: !isChecked,
                  }));
                }

                setIsButtonDisabled(false);
              }}
            >
              <Checkbox
                style={styles.checkbox}
                color={isChecked ? "#A1CE3F" : "#E7E5E4"}
                value={isChecked}
                onValueChange={(val) => {
                  if (step === 1) {
                    setCheckedItems((prev) => ({
                      ...prev,
                      [item.id]: val,
                    }));
                  } else {
                    setSelectedOwnedAppliances((prev) => ({
                      ...prev,
                      [item.id]: val,
                    }));
                  }
                }}
              />
              <View className="flex-v items-center gap-3">
                <Image source={item.uri} />
                <Text className="raleway font-semibold">{item.text}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-v gap-3">
        <TouchableOpacity
          style={styles.selectbutton}
          onPress={() => {
            const newChecked: { [key: string]: boolean } = {};
            appliances.forEach((item) => {
              newChecked[item.id] = true;
            });
            if (step === 1) setCheckedItems(newChecked);
            else setSelectedOwnedAppliances(newChecked);
            setAllSelected(true);
          }}
        >
          <Text
            style={
              allSelected
                ? styles.allSelectedButtonText
                : styles.selectbuttonText
            }
            className="raleway w-80 text-[14px] font-medium"
          >
            Select All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isButtonDisabled}
          style={isButtonDisabled ? styles.disabledButton : styles.button}
          onPress={() => {
            if (step === 1) {
              setOwnedAppliances(
                applianceList.filter((item) => checkedItems[item.id] === true),
              );
              console.log(
                "progress bar length aka owned appl length",
                ownedAppliances.length,
              );
            } else {
              // congrats redirect to the cong page
              console.log("Congrats, you have earned some points");

              setCompleted(true);
            }
          }}
        >
          <Text
            style={
              isButtonDisabled ? styles.disabledButtonText : styles.buttonText
            }
            className="raleway w-80 text-[14px] font-medium"
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="h-full">
      <SafeAreaView className="h-full" edges={["top", "bottom"]}>
        <ScrollView className="flex-1 pb-9">
          <View className="h-[64px]">
            <ProgressBar
              progression={barProgression}
              numProgressions={progressBarLength}
              points={points}
              utility={() => {
                router.push("/pages/Homepage");
              }}
            />
          </View>
          {ownedAppliances.length > 0
            ? func(
                "Turn off or unplug all these appliances at home or in office. ",
                ownedAppliances,
                2,
              )
            : func(
                "Do you have any of these appliances that you can turn off or unplug from the power grid at home or in office?",
                applianceList,
                1,
              )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
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
  selectbutton: {
    height: 40,
    borderColor: "#E8EAEB",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectbuttonText: {
    color: "#262626",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#E7E5E4",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButtonText: {
    color: "#A8A29E",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  allSelectedButtonText: {
    color: "#A1CE3F",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ListAppliances;
