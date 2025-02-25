import { Image, Text, TouchableOpacity, View } from "react-native";

const NavBar = () => {
    return (
        <View className="navbar">
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={require('../../../assets/icons/home-selected.png')}/>
                <Text className="text-[10px] green-600">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={require('../../../assets/icons/star.png')}/>
                <Text className="text-[10px] green-600">Challenges</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={require('../../../assets/icons/graph.png')}/>
                <Text className="text-[10px] green-600">Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={require('../../../assets/icons/leaf.png')}/>
                <Text className="text-[10px] green-600">ECOmmerce</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={require('../../../assets/icons/group.png')}/>
                <Text className="text-[10px] green-600">Community</Text>
            </TouchableOpacity> 
        </View>
    )
}

export default NavBar;