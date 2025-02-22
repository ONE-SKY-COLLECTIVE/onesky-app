import { useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Activities = () => {
    const router = useRouter();
    return (
        <View className="flex">
            <View className="header">
                <Pressable onPress={() => router.push("/pages/Homepage")}>
                    <Text className="text-[13px] font-bold"> &lt;-  All Activities</Text>
                </Pressable>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    Navbar: {
        backgroundColor: '#D8F5FA',
        width: '100%',
    },
  });

export default Activities;