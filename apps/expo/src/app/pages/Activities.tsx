import { useRouter } from "expo-router";
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

const Activities = () => {
    const router = useRouter();
    return (
        <View className="flex">
            <View className="header">
                <Pressable onPress={() => router.push("/pages/Homepage")} className="flex align-items-center">
                    <Image className="ml-2" source={require('../../../assets/icons/arrow.png')} />
                    <Text className="text-[13px] font-bold"> All Activities</Text>
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