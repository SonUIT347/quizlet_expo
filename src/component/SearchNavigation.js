import { View, Text } from 'react-native'
import React from 'react'
import Search from '../screen/Search'
import OptionTest from '../screen/OptionTest'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()


const SearchNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Search' screenOptions={{
        headerShown:false
    }} >
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='option' component={OptionTest} />
    </Stack.Navigator>
  )
}

export default SearchNavigation