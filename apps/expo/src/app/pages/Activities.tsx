import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ActivityBox from "../components/ActivityBox";
import { SafeAreaView } from "react-native-safe-area-context";

const Activities = () => {
    const router = useRouter();

    const activities = [
        { id: 'Quiz', title: 'Quiz', inactive: false },
        { id: '2', title: 'Log your meal', inactive: true },
        { id: 'Waterbottle', title: 'Water refill', inactive: false },
        { id: '3', title: 'View to plant', inactive: true },
        { id: '5', title: 'Switch-off', inactive: true },
        { id: '6', title: 'Recycle', inactive: true },
        { id: '7', title: 'Steps', inactive: true },
        { id: '8', title: 'Donate/resell', inactive: true },
        { id: '9', title: 'Buy second hand', inactive: true },
        { id: '9', title: 'More coming soon', inactive: true },
          ];
    return (
        <View className="h-full">
            <SafeAreaView edges={["bottom"]}>
                <View className="flex-v h-full">
                    <View className="header">
                        <Pressable onPress={() => router.push("/pages/Homepage")} className="flex align-items-center">
                            <Image className="ml-2" source={require('../../../assets/icons/arrow.png')} />
                            <Text className="text-[13px] font-bold raleway"> All Activities</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 1}} className="activities-page">
                        <FlatList
                            className="pt-4"
                            data={activities}
                            numColumns={2}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => <ActivityBox title={item.title} id={item.id} inactive={item.inactive}/>}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    Navbar: {
        backgroundColor: '#D8F5FA',
        width: '100%',
    },
    separator: {
        height: 18
    }
});

export default Activities;