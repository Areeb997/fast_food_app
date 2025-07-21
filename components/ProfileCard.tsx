import { images } from '@/constants';
import { ProfileItemProps } from '@/type';
import React from 'react';
import { Image, Text, View } from 'react-native';

const ProfileCard = ({item:{name , email, phone , Address}}:{item:ProfileItemProps}) => {

  return (
    <View className='flex flex-row items-center h-1/2 w-full'>
      <View className='flex flex-col mr-5' >
        <Image source={images.user} className='size-5 my-3' resizeMode='contain'/>
        <Image source={images.envelope} className='size-5 my-3' resizeMode='contain'/>
        <Image source={images.phone} className='size-5 my-3' resizeMode='contain'/>
        <Image source={images.location} className='size-5 my-3' resizeMode='contain'/>
      </View>
     
     <View>

        <View >
            <Text className='text-xs text-gray-200 '>Full Name </Text>
            <Text className='text-xl text-black '>{name}</Text>
        </View>
     
        <View>
            <Text className='text-xs text-gray-200 '>Email</Text>
            <Text className='text-xl text-black '>{email}</Text>
        </View>
     
     
        <View>
            <Text className='text-xs text-gray-200 '>Phone number</Text>
            <Text className='text-xl text-black '>{phone}</Text>
        </View>
     
   
        <View>
            <Text className='text-xs text-gray-200 '>Address</Text>
            <Text className='text-xl text-black'>{Address}</Text>
        </View>
     </View>
    </View>
  )
}

export default ProfileCard