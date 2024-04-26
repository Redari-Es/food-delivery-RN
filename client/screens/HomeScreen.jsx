import React, { useEffect,useLayoutEffect,useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather"
import {themeColors} from '../theme'
import Categories from '../components/Categories';
import FeaturedRow  from '../components/FeaturedRow';
import {categories, featured} from '../constants/index'
import { getFeaturedRestaurants } from '../api';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const [featuredCategories,setFeaturedCategories]=useState([])
  const navigation =useNavigation()
  useLayoutEffect(()=>{
    navigation.setOptions({headerShown:false})
  })

 useEffect(()=>{
  getFeaturedRestaurants().then(data=>{
    // console.log('got data:',data)
    setFeaturedCategories(data)
  })
 }) 

  return (
    // 区别View可以让内容不被覆盖
    <SafeAreaView className="bg-white">
    <StatusBar barStyle="dark-content"/>
    
    <View className="flex-row items-center space-x-2 px-4 pb-2">
    <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
    <Icon.Search height="25" width="25" stroke="gray"/>
    <TextInput placeholder='Restaurants' className="ml-2 flex-1"/>
    <View className='flex-row items-center min-w-screen space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
    <Icon.MapPin height="20" stroke='grey'/>
    <Text className="text-grey-600">Shenzhen,SZ</Text>
    </View>
    </View>
    <View style={{backgroundColor:themeColors.bgColor(1)}} className="p-3 rounded-full">
     <Icon.Sliders height="20" width="20" strokeWidth={2.5} stroke="white"/> 
    </View>
    </View>
    {/* main 主要内容显示 */}
    <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom:20
    }}
    >
    {/* categories */}
    <Categories/>
     {/* featured  */}
      <View className="mt-5">
        <View className="mt-5">
          {
            featuredCategories?.map((item,index)=>{
              return(
                <FeaturedRow
                  key={index}
                  title={item.name}
                  restaurants={item.restaurants }
                  description={item.description }
                />
              )
            })
          }
            </View>
      </View>
    </ScrollView>
     </SafeAreaView>
  );
}
