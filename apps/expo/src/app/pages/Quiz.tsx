import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

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
            if (userAnswer) {
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
                animationRef.current.play(50, 70);
            }
    };
    if (answerCorrect === true) {
        playSuccess();
    };
  }, [answerCorrect])

    // If every part of the quiz is done, display this page instead
    if (quizProgression >= 6) {
        return (
            <SafeAreaView className=" pt-4 flex-v h-full green-bg-50" edges={["top"]}>
                    <TouchableOpacity className="px-5" onPress={() => router.push("/pages/Homepage")}>
                        <Image resizeMode="contain" source={require("../../../assets/icons/x-button.png")} />
                    </TouchableOpacity>
                    <View className="flex-v justify-center flex-grow pb-20">
                        <Text className="raleway text-[22px] font-bold text-center">
                            Yay, Congratulations!
                        </Text>
                        <Image resizeMode="contain" source={require("../../../assets/icons/quiz-done.png")} className="quiz-done"/>
                        <Text className="text-center mt-4 mb-8 gray-800">You have successfully completed the quiz!</Text>
                        <View className="flex items-center justify-center">
                            <Image className="diamond-large"source={require('../../../assets/icons/diamond.png')}/>
                            <Text className="raleway test-[16px] font-bold ml-2">50 pts</Text>
                        </View>
                        <Text className="gray-800 text-center mt-5">
                            50 pts are on your way!!
                        </Text>
                    </View>
            </SafeAreaView>
        )
    }

    return (
        <View>
            <SafeAreaView className=" pt-4 flex-v h-full" edges={["top"]}>
                <View className="flex items-center justify-between px-5">
                    <TouchableOpacity onPress={() => router.push("/pages/Homepage")}>
                        <Image resizeMode="contain" source={require("../../../assets/icons/x-button.png")} />
                    </TouchableOpacity>
                    <View className="flex items-center">
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 1 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 2 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 3 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 4 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 5 ? "quiz-progress-active" : "quiz-progress"}`}/>
                    </View>
                    <View className="flex items-center">
                        <Image resizeMode="contain" className="diamond-small" source={require("../../../assets/icons/diamond.png")}/>
                        <Text className="raleway ml-1 font-semibold">50 pts</Text>
                    </View>
                </View>
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