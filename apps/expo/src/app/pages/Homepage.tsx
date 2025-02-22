import { View, Text, Image, FlatList, Button, StyleSheet } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ActivityBox from "../components/ActivityBox";

export default function Homepage() {

    const activities = [
        { id: '1', title: 'Quiz' },
        { id: '2', title: 'Share meal' },
        { id: '3', title: 'Watching videos or ads' },
        { id: '4', title: 'Flights climbed' },
        { id: 'Waterbottle', title: 'Water Refills' },
        { id: 'Activities', title: 'More activities' },

      ];

    const styles = StyleSheet.create({
        title: {
            width: "60%",
            marginBottom: 100
        },
        separator: {
          height: 12,
        },
      });

  
  return (
    <View className="home-page" >
        <SafeAreaView edges={["top"]}>
            <View className="flex-v h-full ">
                <View className="flex justify-between mx-6">
                    <Image source={require('../../../assets/profile.png')} />
                    <View className="flex items-center">
                        <Image source={require('../../../assets/gold-badge.png')} />
                        <Text className="font-bold ml-1">3,363</Text>
                    </View>
                </View>
                <View style={styles.title} className="ml-4 mt-10">
                    <Text className="mb-3 text-13">Hello John!</Text>
                    <Text className="title">What would you like to do today?</Text>
                </View>
                <View className="main-content">
                    <Text>Activity/Event Switch</Text>
                    <View className="fit-content">
                    <FlatList 
                        className="pt-3"
                        data={activities} 
                        numColumns={2} 
                        keyExtractor={(item) => item.id} 
                        ItemSeparatorComponent={() => <View style={styles.separator} />} 
                        renderItem={({ item }) => <ActivityBox title={item.title} id={item.id}/>}>
                    </FlatList>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </View>
  );
}
