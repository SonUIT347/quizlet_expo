import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import OptionTest from '../screen/OptionTest';
import Lesson from './Lesson';
import ViewFolder from '../screen/ViewFolder';
import Folder from './Folder';
import useFlashCard from "./useFlashCard"
import Test from '../screen/Test';
import ShowLesson from './ShowLesson';
import FlashCard from '../screen/FlashCard';
import { useRoute } from '@react-navigation/native';
const Stack = createStackNavigator();
const LessonNavigator = () => {
    const route = useRoute()
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{
            title:"",
            headerShown:false,
            headerTintColor:"white",
            headerTitleAlign:"center",
            headerStyle:{
                backgroundColor:"#2E3856",
            }

        }} >
          <Stack.Screen name="Home"  initialParams={{userID:route.params.userID, userName:route.params.userName}} component={Home} />
          <Stack.Screen name="Option" component={OptionTest}  /> 
          <Stack.Screen name='ViewFolder' component={ViewFolder} />
          <Stack.Screen name='Flashcard' component={FlashCard} />
          <Stack.Screen name='Test' component={Test} />
          <Stack.Screen name='Lesson' component={Lesson} />
          <Stack.Screen name='ShowLesson' component={ShowLesson} />
          <Stack.Screen name='Folder' component={Folder} />
        </Stack.Navigator>

      );
  }
  export default LessonNavigator


