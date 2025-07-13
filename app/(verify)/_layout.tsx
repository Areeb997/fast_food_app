import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

export default function auth_layout() {
  return (
    <SafeAreaView>
      <Text>auth_layout</Text>
      <Slot/>
    </SafeAreaView>
  )
}