import { View, Text } from 'react-native'
import React from 'react'
import Create from '../screen/Create'
import CreateFolder from '../screen/CreateFolder'
import { createStackNavigator } from '@react-navigation/stack'
import OptionTest from '../screen/OptionTest'
import Home from '../screen/Home'
import { useRoute } from '@react-navigation/native'
const Stack = createStackNavigator()
const CreateNavigator = ({route}) => {
  return (
    <Stack.Navigator initialRouteName='create' screenOptions={{
        headerShown:true
    }} >
        <Stack.Screen initialParams={{userID:route.params.userID}} name='create' component={Create} />
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='createfolder' initialParams={{userID:route.params.userID}} component={CreateFolder} />
        <Stack.Screen name='option' component={OptionTest}/>
    </Stack.Navigator>
  )
}
export default CreateNavigator