import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
const Searchbar = () => {
    const params = useLocalSearchParams<{query?:string}>()
    const [query, setQuery] =useState<string>(params.query || '')
    const handleSearch =(text:string) =>{
        setQuery(text)
        if(!text)router.setParams({query:undefined})
    }
   const handlesubmit = ()=>{
    if(query.trim()) router.setParams({query})
   }
  return (
    <View className='searchbar'>
      <TextInput className='flex-1 p-5'
      placeholder='Search for pizza, burgers ...'
      value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handlesubmit}
        returnKeyType='search'
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity className='pr-5' onPress={()=> router.setParams({query})}>
        <Image source={images.search} className='size-6' resizeMode="contain" tintColor="#5D5f6D"/>
      </TouchableOpacity>
    </View>
  )
}

export default Searchbar