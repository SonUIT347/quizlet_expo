import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Folder from './Folder'
import ViewFolder from '../screen/ViewFolder'
import useViewFolder from './useViewFolder'
import Home from '../screen/Home'

const Stack = createStackNavigator()
const FolderNavigator = ({route}) => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{
        title:"",
        headerTintColor:"white",
        headerTitleAlign:"center",
        headerStyle:{
            backgroundColor:"#2E3856",
        }

    }} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="useViewFolder" component={Home} />
      <Stack.Screen name='ViewFolder' component={ViewFolder} />
      <Stack.Screen name='Folder' component={Folder} />
    </Stack.Navigator>
  )
}

export default FolderNavigator