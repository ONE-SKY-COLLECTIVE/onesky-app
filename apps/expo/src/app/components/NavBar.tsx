import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface NavBarProps {
    selectedPage: string;
}

const NavBar: React.FC<NavBarProps> = ({selectedPage}) => {
    const router = useRouter();
    const [selected, setSelected] = useState(selectedPage);
    return (
        <View className="navbar">
            <TouchableOpacity className="justify-center" onPress={() => {if (selected !== "Home") {setSelected("Home"); router.push('../pages/Homepage')}}}>
                {selected === "Home" ? 
                    <View className="items-center">
                        <Image className="navbar-images" source={require('../../../assets/icons/home-selected.png')}/>
                        <Text className="text-[10px] green-600 absolute navbar-text">Home</Text>
                    </View>
                :
                    <Image className="navbar-images" source={require('../../../assets/icons/home.png')}/>
                }
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center">
                <Image source={require('../../../assets/icons/light-bulb.png')}/>
                {/* <Text className="text-[10px] green-600">Challenges</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center" onPress={() => {if (selected !== "Dashboard") {setSelected("Dashboard"); router.push('../pages/Dashboard')}}}>
                {selected === "Dashboard" ? 
                    <View className="items-center">
                        <Image className="navbar-images" source={require('../../../assets/icons/dashboard-selected.png')}/>
                        <Text className="text-[10px] green-600 absolute navbar-text">Dashboard</Text>
                    </View>

                :
                    <Image className="navbar-images" source={require('../../../assets/icons/dashboard.png')}/>
                }
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center">
                <Image source={require('../../../assets/icons/bag.png')}/>
                {/* <Text className="text-[10px] green-600">ECOmmerce</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={require('../../../assets/icons/group.png')}/>
                {/* <Text className="text-[10px] green-600">Community</Text> */}
            </TouchableOpacity> 
        </View>
    )
}

export default NavBar;