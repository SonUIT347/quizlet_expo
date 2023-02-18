import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import OptionTest from '../screen/OptionTest';
import Lesson from './Lesson';
import ViewFolder from '../screen/ViewFolder';
import Folder from './Folder';
import FlashCard from '../screen/FlashCard';
const Stack = createStackNavigator();
const LessonNavigator = ({route}) => {
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
          <Stack.Screen name="Option" component={OptionTest}  />
          <Stack.Screen name='ViewFolder' component={ViewFolder} />
          <Stack.Screen name='Flashcard' component={FlashCard} />
          <Stack.Screen name='Lesson' component={Lesson} />
          <Stack.Screen name='Folder' component={Folder} />
        </Stack.Navigator>

      );
  }
  export default LessonNavigator


