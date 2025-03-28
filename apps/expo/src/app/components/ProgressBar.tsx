import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native"

interface ProgressBarProps {
    progression: number;
    numProgressions: number;
    points: number;
    utility?: () => void;
}
const ProgressBar: React.FC<ProgressBarProps> = ({progression, points, numProgressions, utility}) => {
    const router = useRouter();
    const progressWidth = 230;
    const spacing = 10;
    const numDots = numProgressions;
    const dotWidth = (progressWidth - (spacing * (numDots - 1))) / numDots;

    return (
        <View className="flex items-center justify-between px-5">
            <TouchableOpacity onPress={utility ? utility : () => router.push("/pages/Homepage")}>
                <Image resizeMode="contain" source={require("../../../assets/icons/x-button.png")} />
            </TouchableOpacity>
            <View className="flex-row items-center" style={{width: progressWidth}}>
                {Array.from({length: numProgressions}).map((_, index) => (
                    <View 
                        key={index} 
                        style={{
                            width: dotWidth,
                            height: 8,
                            marginRight: index < numProgressions - 1 ? spacing : 0
                        }}
                        className={`rounded-[999px] ${progression >= index + 1 ? "quiz-progress-active" : "quiz-progress"}`}
                    />
                ))}
            </View>
            <View className="flex items-center">
                <Image resizeMode="contain" className="diamond-small" source={require("../../../assets/icons/diamond.png")}/>
                <Text className="raleway ml-1 font-semibold">+ {points}</Text>
            </View>
        </View>
    )
}

export default ProgressBar;