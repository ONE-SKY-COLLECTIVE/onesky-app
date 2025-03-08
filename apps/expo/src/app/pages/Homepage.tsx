import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ActivityBox from "../components/ActivityBox";
import NavBar from "../components/NavBar";
import { useState } from "react";

export default function Homepage() {
    const [contentSelect, setContentSelect] = useState(0);
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
            <View className="flex-v h-full">
                <View className="flex justify-between mx-8">
                    <Image source={require('../../../assets/icons/profile.png')} />
                    <View className="flex items-center">
                        <Image source={require('../../../assets/icons/gold-badge.png')} />
                        <Text className="font-bold ml-1">3,363</Text>
                    </View>
                </View>
                <View style={styles.title} className="ml-8 mt-10">
                    <Text className="mb-3 text-13">Hello John!</Text>
                    <Text className="title">What would you like to do today?</Text>
                </View>
                <View className="main-content">
                    <View className="content-switch">
                        <TouchableOpacity onPress={() => setContentSelect(0)} 
                                          className="switch-button" 
                                          style={{backgroundColor: 
                                                    contentSelect === 0 ? '#A1CE3F' : undefined
                                          }}>
                            <Text className={`text-[14px] ${contentSelect === 0 && 'font-semibold'}`}>
                                Activities
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setContentSelect(1)} 
                                          className="switch-button" 
                                          style={{backgroundColor: 
                                                    contentSelect === 1 ? '#A1CE3F' : undefined
                                          }}>
                            <Text className={`text-[14px] ${contentSelect === 0 && 'font-semibold'}`}>
                                Events
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1}}>
                        {contentSelect === 0 &&
                            <FlatList
                                className="pt-3"
                                data={activities}
                                numColumns={2}
                                keyExtractor={(item) => item.id}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                renderItem={({ item }) => <ActivityBox title={item.title} id={item.id} />}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                    </View>
                </View>
                <NavBar />
            </View>
        </SafeAreaView>
    </View>
  );
}
