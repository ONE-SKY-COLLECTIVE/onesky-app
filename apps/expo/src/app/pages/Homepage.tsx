import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ActivityBox from "../components/ActivityBox";
import NavBar from "../components/NavBar";
import { useState } from "react";

export default function Homepage() {
    const [contentSelect, setContentSelect] = useState(0);
    const activities = [
        { id: 'Quiz', title: 'Quiz', inactive: false },
        { id: '2', title: 'Log your meal', inactive: true },
        { id: 'Waterbottle', title: 'Water refill', inactive: false },
        { id: '3', title: 'View to plant', inactive: true },
        { id: '4', title: 'Steps', inactive: true },
        { id: 'Activities', title: 'View more...', inactive: false },
      ];
      const events = [
        { id: '1', title: 'Attend a Beach Clean', inactive: true },
        { id: '2', title: 'Organise a Beach Clean', inactive: true },
        { id: 'Waterbottle', title: 'Download Refill App', inactive: true },
        { id: '3', title: 'Download Vinted/Depop App', inactive: true },
        { id: '4', title: 'Join a sustainability or a Vegan group', inactive: true },
        { id: '6', title: 'More coming soon', inactive: true },
      ];

    const styles = StyleSheet.create({
        title: {
            width: "60%",
            marginBottom: 100
        },
        separator: {
          height: 20,
        },
      });
    
    // Temporary streak and points until we get API
    const streak = 10;
    const points = '3,363';
  
  return (
    <View className="home-page" >
        <SafeAreaView edges={["top"]}>
            <View className="flex-v h-full">
                <Image className="absolute top-[130px] w-full" source={require('../../../assets/icons/home-background.png')}/>
                <View className="flex justify-between mx-8">
                    <Image resizeMode="contain" source={require('../../../assets/icons/profile.png')} />
                    <View className="flex items-center">
                        <Image resizeMode="contain" className="h-[26px] w-[25px]" source={require('../../../assets/icons/fire.png')} />
                        <Text className="font-bold ml-1">{streak}</Text>
                        <Image resizeMode="contain" className="h-[25px] w-[25px] ml-4" source={require('../../../assets/icons/diamond.png')} />
                        <Text className="font-bold ml-1">{points}</Text>
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
                                Today's Activities
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
                        {contentSelect === 0 ?
                            <FlatList
                                className="pt-3"
                                data={activities}
                                numColumns={2}
                                keyExtractor={(item) => item.id + "activities"}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                renderItem={({ item }) => <ActivityBox title={item.title} id={item.id} inactive={item.inactive}/>}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <FlatList
                                className="pt-3"
                                data={events}
                                numColumns={2}
                                keyExtractor={(item) => item.id + "events"}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                renderItem={({ item }) => <ActivityBox title={item.title} id={item.id} event={true} inactive={item.inactive}/>}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                    </View>
                </View>
                <NavBar selectedPage="Home"/>
            </View>
        </SafeAreaView>
    </View>
  );
}
