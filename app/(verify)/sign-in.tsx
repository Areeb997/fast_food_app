import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const signin = () => {
  return (
    <View>
      <Text>signin</Text>
      <Button title='Sign Up' onPress={()=> router.push('/sign-up')}/> 
    </View>
  )
}

export default signin