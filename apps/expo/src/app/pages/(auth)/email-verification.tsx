import { View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import icons from '~/lib/icons'


const Email = () => {
  return (
    <SafeAreaView className='bg-white flex-1 justify-center place-content-center items-center '>
      <Text className='text-2xl font-bold capitalize mb-10'>Email verification</Text>
      <View className='w-3/4 flex-col items-center my-4'>
     <Image
     className='block my-10'
     source={icons.emailIcon}
     style={{width:67, height:53}}
     alt='an icon'
     />
      <Text className='mt-5 text-sm text-center text-[#797C7C]'>We've sent a verification link to your email. Please check your inbox and verify your email to continue.</Text>
      </View>
      
    
     <Link className='p-4 mt-10 w-[80%] bg-[var(--bright-lime)] rounded-lg' href={'/pages/(auth)/login'}><Text className='p-4 text-center '>Go to login</Text></Link>
    </SafeAreaView>
  )
}

export default Email