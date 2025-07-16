import Custombutton from '@/components/CustomButton'
import Custominput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import * as Sentry from '@sentry/react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email:'',password:''});
  const Submit=async()=>{
    const {email , password} = form;
    if(!email || !password){
     return Alert.alert('Please Enter valid Email & Password !')
    }
    setIsSubmitting(true)
    try {
      // call appwrite signin function 
      await signIn({email , password})
     Alert.alert("Sign in Successfull !")
     router.replace('/') // bring user back to homepage after sign in 
    } catch (error : any) {
      Alert.alert(error.message)
      Sentry.captureEvent(error) // capture error using sentry for more details 
    }finally{
      setIsSubmitting(false) // stop the submitting proccess after user sign in or not 
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

         <Custominput 
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => setForm((prev)=>({...prev , email : text}))} // change text in previous state 
        label='Email'
        keyboardType='email-address'
         />
         <Custominput 
        placeholder='Enter your Password'
       value={form.password}
        onChangeText={(text) => setForm((prev)=>({...prev , password : text}))} // change text in previous state 
        label='Password'
        secureTextEntry = {true}
         />
        <Custombutton
        title='Sign In'
        isLoading={isSubmitting}
        onPress={Submit}
        />
        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className="base-regular text-gray-100">
          Don't have an account?
          </Text>
          <Link href='/sign-up' className='base-bold text-primary'>
          Sign Up
          </Link>
        </View>
    </View>
  )
}

export default signin