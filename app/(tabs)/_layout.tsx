import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/type'
import cn from 'clsx'
import { Redirect, Tabs } from 'expo-router'
import { Image, Text, View } from 'react-native'

const TabBarIcons = ({focused , icon , title}:TabBarIconProps)=>(
  <View className='tab-icon'>
    <Image source={icon} className='size-6' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5D5F6D'}/>
    <Text className={cn('text-sm font-bold w-full ', focused?'text-primary':'text-gray-200')}>{title}</Text>
  </View>
)

export default function TabLayout() {
   const {isAuthenticated} = useAuthStore()
    if(!isAuthenticated) return <Redirect href='/sign-in'/>
  return(
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarShowLabel:false,
      tabBarStyle:{
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        marginHorizontal:10,
        height:80,
        position:'absolute',
        bottom:48,
        backgroundColor:'white',
        shadowColor:'#1a1a1a',
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.1,
        shadowRadius:4,
        elevation:5,  
        paddingBottom: 0, // Remove extra padding
        paddingTop: 0,    // Remove extra padding
      }
    }}
    >
      <Tabs.Screen
      name='index'
      options={{
        title:'Home',
        tabBarIcon:({focused}) => <TabBarIcons
        icon={images.home}
        title='Home'
        focused={focused}
        />
      }}
      />
      <Tabs.Screen
      name='search'
      options={{
        title:'search',
        tabBarIcon:({focused}) => <TabBarIcons
        icon={images.search}
        title='Search'
        focused={focused}
        />
      }}
      />
      <Tabs.Screen
      name='cart'
      options={{
        title:'cart',
        tabBarIcon:({focused}) => <TabBarIcons
        icon={images.bag}
        title='Cart'
        focused={focused}
        />
      }}
      />
      <Tabs.Screen
      name='profile'
      options={{
        title:'Profile',
        tabBarIcon:({focused}) => <TabBarIcons
        icon={images.person}
        title='Profile'
        focused={focused}
        />
      }}
      />
    </Tabs>
  )
}
