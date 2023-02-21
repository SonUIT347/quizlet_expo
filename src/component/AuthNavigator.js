import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Login'
import BottomTab from './BottomTab'
import Register from '../screen/Register'
import { useRoute } from '@react-navigation/native'
const Stack = createStackNavigator()

const AuthNavigator = ({navigation}) => { 
  // const route = useRoute()
  // console.log(route.params.userID)

  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{
      headerShown:false
    }} >
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} options={{
          headerShown:true,
          title:"",
          headerTintColor:"white",
          headerStyle:{
            backgroundColor:"#0A092D",
          }
        }} />
        <Stack.Screen name={'TabBar'} component={BottomTab} />
    </Stack.Navigator>
  )
}

export default AuthNavigator