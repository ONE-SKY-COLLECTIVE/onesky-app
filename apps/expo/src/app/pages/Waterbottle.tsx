import { useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";


const Waterbottle = () => {
    const animationRef = useRef<LottieView>(null);
    const [refillNum, setRefillNum] = useState(0);
    const router = useRouter();

    // Temporary daily goal 
    const dailyGoal = 7

    const handleIncrease = () => {
        setRefillNum(refillNum + 1);
        if (refillNum + 1 <= dailyGoal) {
            if (animationRef.current) {
                // Actual filling animation runs from 0-43
                animationRef.current.play(0, 43);
                const startPoint = 43 * (refillNum / dailyGoal)
                const endPoint = 43 * ((refillNum + 1) / dailyGoal)
                animationRef.current.play(startPoint, endPoint);
            }
        }
    };

    const handleDecrease = () => {
        setRefillNum(refillNum - 1);
        if (refillNum - 1 < dailyGoal) {
            if (animationRef.current) {
                animationRef.current.play(0, 43);

                const startPoint = 43 * (refillNum / dailyGoal)
                const endPoint = 43 * ((refillNum - 1) / dailyGoal)
                animationRef.current.play(startPoint, endPoint);
            }
        }
    }

    return (
        <View className="waterbottle-page">
            <View className="hold-waterbottle-text">
                <Text className="waterbottle-text">Refill Water Bottle</Text>
                <Pressable onPress={() => router.push("/pages/Homepage")} style={{backgroundColor: 'white'}}>
                    <Text>temp back button</Text>
                </Pressable>
            </View>
            <View className="refill-animation-div">
                <LottieView
                    ref={animationRef}
                    source={require("../../../assets/animations/RefillAnimation1.json")}
                    style={styles.refillAnimation}
                    autoPlay={false}
                    loop={false}
                />
            </View>
            
            <View className="refill-div">
                <View className="flex align-self-center">
                    <TouchableOpacity disabled={refillNum <= 0} onPress={handleDecrease} className="refill-button gray">
                        <Text className="text-[50px]">-</Text>
                    </TouchableOpacity>
                    <Text className="text-[50px] sora align-self-center mx-10">
                        {refillNum}
                    </Text>
                    <TouchableOpacity disabled={refillNum >= 7} onPress={handleIncrease} className="refill-button green">
                        <Text className="text-[40px]">+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    refillAnimation: {
        height: 300,
        width: '100%',
        padding: 0,
        margin: 0,

    },
  });

export default Waterbottle;
