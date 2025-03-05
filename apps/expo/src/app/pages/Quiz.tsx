import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Quiz = () => {
    const router = useRouter();
    const [quizProgression, setQuizProgression] = useState(1);
    const [userAnswer, setUserAnswer] = useState<number>();

    // Temporary question and answer options, will take from API when available
    const question1 = "Question 1: Lorem ipsum random question"
    const answers1 = ["Wrong Answer", "Wrong Answer", "Right Answer", "Wrong Answer"]
    const rightAnswerIndex = 2;
    const [answerCorrect, setAnswerCorrect] = useState<boolean | undefined>(undefined);

    // Submit/Next Question button
    const handleSubmitAnswer = () => {
        if (answerCorrect !== undefined) {
            setAnswerCorrect(undefined);
            if (quizProgression < 5) {
                // progress to next question
                setQuizProgression(quizProgression + 1)
            } else {
                //stop quiz, for the user finished all 5 questions
            }
        } else {
            if (userAnswer) {
                if (rightAnswerIndex === userAnswer) {
                    setAnswerCorrect(true);
                } else {
                    setAnswerCorrect(false);
                }
            }

        }

    }

    return (
        <View>
            <SafeAreaView className="px-5 py-4 flex-v h-full">
                <View className="flex items-center justify-between">
                    <TouchableOpacity onPress={() => router.push("/pages/Homepage")}>
                        <Image source={require("../../../assets/icons/x-button.png")} />
                    </TouchableOpacity>
                    <View className="flex items-center">
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 1 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 2 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 3 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 4 ? "quiz-progress-active" : "quiz-progress"}`}/>
                        <View className={`mx-1 rounded-[999px] ${quizProgression >= 5 ? "quiz-progress-active" : "quiz-progress"}`}/>

                    </View>
                    <View className="flex items-center">
                        <Image source={require("../../../assets/icons/diamond.png")}/>
                        <Text className="raleway ml-1 font-semibold">50 pts</Text>
                    </View>
                </View>
                <View className="mt-[50px]">
                    <Text className="text-[20px] font-bold">
                        {question1}
                    </Text>
                    <View className="mt-10">
                        {answers1.map((option, index) => {return (
                            <TouchableOpacity 
                                key={index + 'answers'} className="quiz-option" 
                                style={{borderWidth: userAnswer === index ? 3 : 1.3}} 
                                onPress={() => setUserAnswer(index)}
                            >
                                <Text>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        )})}
                    </View>
                </View>
                
                <TouchableOpacity className="green w-full py-5 rounded-[8px] mt-auto" onPress={handleSubmitAnswer}>
                    <Text className="text-center raleway text-[14px] font-semibold">{answerCorrect !== undefined ? 'Submit' : 'Next'}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default Quiz;