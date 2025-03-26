import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import ProgressBar from "../components/ProgressBar";
import Completion from "../components/Completion";

const Quiz = () => {
    const router = useRouter();
    const [quizProgression, setQuizProgression] = useState(1);
    const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
    const animationRef = useRef<LottieView>(null);

    // Temporary question and answer options, will take from API when available
    const question1 = "Question 1: Lorem ipsum random question"
    const answers1 = ["Wrong Answer", "Wrong Answer", "Right Answer", "Wrong Answer"]
    const rightAnswerIndex = 2;
    const [answerCorrect, setAnswerCorrect] = useState<boolean | undefined>(undefined);

    // Submit/Next Question button
    const handleSubmitAnswer = () => {
        // Next route
        if (answerCorrect !== undefined) {
            setAnswerCorrect(undefined);
            setUserAnswer(undefined)
            setQuizProgression(quizProgression + 1)

        // Submit route
        } else {
            if (userAnswer || userAnswer === 0) {
                if (rightAnswerIndex === userAnswer) {
                    setAnswerCorrect(true);
                    // playSuccess();
                } else {
                    setAnswerCorrect(false);
                }
            }
        }
    }

    const bgClass = answerCorrect === true 
        ? "green-bg-200" 
        : answerCorrect === false 
        ? "yellow-bg-300" 
        : "";

  useEffect(() => {
    const playSuccess = () => {
            if (animationRef.current) {
                animationRef.current.play(50, 60);
            }
    };
    if (answerCorrect === true) {
        playSuccess();
    };
  }, [answerCorrect])

    // If every part of the quiz is done, display this page instead
    if (quizProgression >= 6) {
        return (
            <Completion points={50}/>
        )
    }

    return (
        <View>
            <SafeAreaView className=" pt-4 flex-v h-full" edges={["top"]}>
                <ProgressBar progression={quizProgression} numProgressions={5} points={50}/>
                <View className="mt-[50px] px-5">
                    <Text className="text-[20px] font-bold">
                        {question1}
                    </Text>
                    <View className="mt-10">
                        {answers1.map((option, index) => {return (
                            <TouchableOpacity 
                                key={index + 'answers'} className="quiz-option" 
                                style={{borderWidth: userAnswer === index ? 3 : 1.3}} 
                                onPress={() => userAnswer === index ? setUserAnswer(undefined) : setUserAnswer(index)}
                                disabled={answerCorrect !== undefined}
                            >
                                <Text>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        )})}
                    </View>
                </View>
                <SafeAreaView className={`h-[280px] mt-auto rounded-t-[36px] pt-5 ${bgClass}`} edges={['bottom']}>
                    <View className={`flex-v justify-end pt-5 px-5 h-full`}>
                        {answerCorrect !== undefined &&
                            <View className="flex mb-auto justify-between">
                                <View className="flex-v">
                                    <View className="flex items-center">
                                        {answerCorrect ? 
                                            <LottieView
                                                ref={animationRef}
                                                source={require("../../../assets/animations/SuccessAnimation.json")}
                                                style={{height: 50, width:40}}
                                                loop={false}
                                            />
                                        :
                                            <Image resizeMode="contain" className="mr-1" source={require('../../../assets/icons/incorrect.png')} />
                                        }
                                        <Text className="sora font-bold text-[20px]">
                                            {answerCorrect ? "Correct" : "Oops!!"}
                                        </Text>
                                    </View>
                                    <Text className="ml-3">
                                        {answerCorrect ? "Good job" : "The correct answer is:"}
                                    </Text>
                                    <Text className="ml-3">
                                        {answerCorrect ? "keep it up!" : `Option ${rightAnswerIndex + 1}`}
                                    </Text>
                                </View>
                                {answerCorrect ? 
                                <Image 
                                    source={answerCorrect ? require("../../../assets/icons/correct-world.png") : require("../../../assets/icons/incorrect-world.png")}
                                    resizeMode="contain"
                                    className="h-[120px] w-[138px]"
                                />
                                :
                                <Image 
                                    source={answerCorrect ? require("../../../assets/icons/correct-world.png") : require("../../../assets/icons/incorrect-world.png")}
                                    resizeMode="contain"
                                    className="h-[120px] w-[147px]"
                                />
                            }
                            </View>
                        }
                        <TouchableOpacity className="green-bg-500 w-full py-5 rounded-[8px] s" onPress={handleSubmitAnswer}>
                            <Text className="text-center raleway text-[14px] font-semibold">{answerCorrect === undefined ? 'Submit' : 'Next'}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        </View>
    )
}


export default Quiz;