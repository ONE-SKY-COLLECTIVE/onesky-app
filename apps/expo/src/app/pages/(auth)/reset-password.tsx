import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '~/lib/icons'

const success = () => {
  return (
    <SafeAreaView className='bg-white flex-1 justify-center place-content-center items-center'>
      <Text className='text-2xl font-bold capitalize'>success!</Text>
      <View className='w-3/4 flex-col items-center'>
      <LottieView
       
        source={icons.success} // ✅ Replace with your animation file
        autoPlay
        loop={false} // ✅ Stops after one play
        style={{ width: 100, height: 100 }}
      />
      <Text className='text-sm text-center text-[#797C7C]'>A link has been sent to reset your password to your email</Text>
      </View>
      
    <View className='mt-10'>
        <Text className=' text-[#797C7C]'>Didn’t receive the email?
      </Text>
        <Link className='underline text-center text-[#797C7C]' href={'/pages/(auth)/set-password'}>Click here to resend</Link>
    </View>
     
    </SafeAreaView>
  )
}

export default success