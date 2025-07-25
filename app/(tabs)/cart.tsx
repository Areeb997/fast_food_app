import CartItem from '@/components/CartItem'
import Custombutton from '@/components/CustomButton'
import CustomHeader from '@/components/CustomHeader'
import { useCartStore } from '@/store/cart.store'
import { PaymentInfoStripeProps } from '@/type'
import cn from 'clsx'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const cart = () => {
  const {items , getTotalItems , getTotalPrice} = useCartStore()
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className='bg-white h-full'>
       <FlatList
       data={items} 
       renderItem={({item})=><CartItem item={item}/>}
       keyExtractor={(item)=>item.id}
      contentContainerClassName='pb-28 px-5 pt-5'
      ListHeaderComponent={()=><CustomHeader title='Your cart'/>}
      ListEmptyComponent={()=><Text>Cart Empty </Text>}
      ListFooterComponent={()=> totalItems>0 &&(
        <View className='gap-5'>
          <View className='mt-6 border-gray-200 p-5 rounded-2xl'>
            <Text className='h3-bold text-dark-100 mb-5'>
              payment Summery
            </Text>
            <PaymentInfoStripe
            label={`Total Items (${totalItems})`}
            value={`${totalPrice.toFixed(2)}`}            
            />
            <PaymentInfoStripe
            label={`Delivery fee`}
            value={`$5.00`}            
            />
            <PaymentInfoStripe
            label={`Discount`}
            value={`-0.50`} 
            valueStyle='!text-success'           
            />
            <View className='border-t border-gray-300 my-2'/>
             <PaymentInfoStripe
            label={`Total`}
            value={`${(totalPrice+5-0.5).toFixed(2)}`}            
            />
          </View>
          <Custombutton title='Order now'/>
        </View>
      )}
/>
    </SafeAreaView>
  )
}

export default cart