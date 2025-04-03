import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { Link } from 'expo-router'

const success = () => {
  return (
    <View className='bg-white'>
      <Text>success</Text>
      <LottieView
        source={require("../../../../assets/animations/SuccessAnimation.json")} // ✅ Replace with your animation file
        autoPlay
        loop={false} // ✅ Stops after one play
        style={{ width: 200, height: 200 }}
      />

     <Text>Your password has been changed successfully!</Text>
     <Link href={'/pages/Homepage'}>Go to login</Link>
    </View>
  )
}

export default success