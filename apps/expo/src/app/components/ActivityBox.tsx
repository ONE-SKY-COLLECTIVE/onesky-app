import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

interface ActivityBoxProps {
  title: string;
  id: string;
  event?: boolean;
  inactive?: boolean;
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderColor: "#D9EBB2",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    width: "48%",
    height: 139,
    position: "relative",
  },
});
const ActivityBox: React.FC<ActivityBoxProps> = ({
  title,
  id,
  event,
  inactive,
}) => {
  const router = useRouter();
  const iconTracker = {
    Quiz: require("../../../assets/icons/quiz2.png"),
    "Log your meal": require("../../../assets/icons/log-meal.png"),
    "Water refill": require("../../../assets/icons/water-refill.png"),
    "View to plant": require("../../../assets/icons/view-plant.png"),
    Steps: require("../../../assets/icons/steps.png"),
    "View more...": require("../../../assets/icons/view-more.png"),
    "Switch-off": require("../../../assets/icons/switch.png"),
    Recycle: require("../../../assets/icons/recycle.png"),
    "Donate/resell": require("../../../assets/icons/donate.png"),
    "Buy second hand": require("../../../assets/icons/shop.png"),
    "More coming soon": require("../../../assets/icons/coming-soon.png"),
    "Attend a Beach Clean": require("../../../assets/icons/clean.png"),
    "Organise a Beach Clean": require("../../../assets/icons/organize.png"),
    "Download Refill App": require("../../../assets/icons/refill-app.png"),
    "Download Vinted/Depop App": require("../../../assets/icons/vinted-app.png"),
    "Join a sustainability or a Vegan group": require("../../../assets/icons/apple.png"),
  };
  return (
    <Pressable
      style={styles.card}
      disabled={inactive}
      className={`${title !== "More coming soon" ? "green-bg-50" : "gray-bg"} ${inactive && "opacity-50"}`}
      onPress={() =>
        title !== "More coming soon" && router.push(`../pages/${id}` as any)
      }
    >
      {title !== "More coming soon" && title !== "View more..." && (
        <View className="activity-points">
          <Image
            resizeMode="contain"
            className="diamond-small"
            source={require("../../../assets/icons/diamond.png")}
          />
          <Text className="text-[11px] font-semibold">+50 pts</Text>
        </View>
      )}
      <View className="flex-v">
        <Image
          resizeMode="contain"
          className="h-[65px]"
          source={iconTracker[title as keyof typeof iconTracker]}
        />
        <Text className="raleway mt-2 font-semibold">{title}</Text>
        {title !== "More coming soon" && title !== "View more..." && !event && (
          <View className="flex">
            <View className="progress-bar" />
            <Text className="raleway ml-2 text-[10px]">0 / 5</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ActivityBox;
