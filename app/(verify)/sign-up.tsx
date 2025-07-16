import Custombutton from '@/components/CustomButton'
import Custominput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const signUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name:'',email:'',password:''});
  const Submit=async()=>{
    let {name , email , password} = form; // detsructute value from form 
    if(!name || !email || !password){
     return Alert.alert('Please Enter Name  valid Email & Password !')
    }
    setIsSubmitting(true)
    try {
      // call appwrite signUp function
      await createUser({ // passing props to create user function 
        name ,
        email,
        password,
      }) 
      
     router.replace('/') // bring user back to homepage after sign in 
    } catch (error : any) {
      Alert.alert(error.message)
       console.log('Full error:', error);
    }finally{
      setIsSubmitting(false) // stop the submitting proccess after user sign in or not 
    }
  }
  return ( 
    <SafeAreaView className='flex-1' >
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
         <Custominput 
        placeholder='Enter your full Name'
        value={form.name}
        onChangeText={(text) => setForm((prev)=>({...prev , name : text}))} // change text in previous state 
        label='Name'
         />
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
        title='Sign Up'
        isLoading={isSubmitting}
        onPress={Submit}
        />
        <View className='flex justify-center flex-row gap-2'>
          <Text className="base-regular text-gray-100">
          Already have an account?
          </Text>
          <Link href='/sign-in' className='base-bold text-primary'>
          Sign In
          </Link>
        </View>
    </View>
    </SafeAreaView>
  )
}

export default signUp