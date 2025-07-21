import CustomHeader from '@/components/CustomHeader';
import ProfileCard from '@/components/ProfileCard';
import { images } from '@/constants';
import { getCurrnetUser } from '@/lib/appwrite';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = () => {
  const [user, setuser] = useState();
  const [error, seterror] = useState(null);
  
  const fetchUser = async() =>{
      try {
          seterror(null)
          const data = await getCurrnetUser()
          // console.log(data)
          setuser(data)
      } catch (e) {
          console.log(e)
          throw new Error(e as string)
      }
  }
  useEffect(() => {
      if(!user)
          fetchUser()
  }, []);
  
  return (
    <SafeAreaView className='h-full w-full items-center mt-2'>
      <CustomHeader title='Profile'/>
    <View className='flex items-center justify-center mt-2 h-1/3'>
      <Image source={images.person} className='size-40' resizeMode="contain"/>
    </View>
    
    {user ? (
      <View className='items-center mx-5'>
        <ProfileCard item={user} />
      </View>
    ) : (
      <Text>Loading...</Text>
    )}
     
    </SafeAreaView>
  )
}

export default profile