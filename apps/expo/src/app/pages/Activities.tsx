import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import ActivityBox from "../components/ActivityBox";

const Activities = () => {
    const router = useRouter();

    const activities = [
        { id: '1', title: 'Quiz' },
        { id: '2', title: 'Log your meal' },
        { id: 'Waterbottle', title: 'Water refill' },
        { id: '3', title: 'View to plant' },
        { id: '5', title: 'Switch-off' },
        { id: '6', title: 'Recycle' },
        { id: '7', title: 'Steps' },
        { id: '8', title: 'Donate/resell' },
        { id: '9', title: 'Buy second hand' },
        { id: '9', title: 'More coming soon' },
          ];
    return (
        <View className="h-full">
            <View className="flex-v h-[800px]">
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
                    renderItem={({ item }) => <ActivityBox title={item.title} id={item.id}/>}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
           
            </View>
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