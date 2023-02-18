
import React from 'react';
import Search from '../screen/Search';
import Home from '../screen/Home';
import Create from '../screen/Create';
import CreateNavigator from './CreateNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import LessonNavigator from './Lessonnavigator';
import Personal from '../screen/Personal';
import SearchNavigation from './SearchNavigation';
import { useRoute } from '@react-navigation/native';

// import CreateNavigator from './CreateNavigator';


const Tab = createBottomTabNavigator()


const BottomTab = ({navigation}) =>{
    const route = useRoute()
    // console.log(route.params.userID)
    return(
        <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle: styles.tabBarStyle}  } >
            <Tab.Screen name = "LessonNavigator"  component={LessonNavigator} options={{
                tabBarLabel:"",
                tabBarIcon: () =>{
                    return(
                    <FontAwesome
                    name = "home"
                    size = {24}
                    color = {"#2E3856"}
                    />
                    )
                }
                
            }} />
            <Tab.Screen name = "SearchNavigation" component={SearchNavigation} options ={{
                tabBarLabel:"",
                tabBarIcon: ()=>{
                    return(
                        <FontAwesome
                        name = "search"
                        size = {24}
                        color = "#2E3856"
                        />
                    )
                }
            }} />
            <Tab.Screen name = "CreateNav" initialParams={{userID:route.params.userID}} component={CreateNavigator} options={{
                tabBarLabel:"",
                tabBarIcon: () => {
                    return(
                        <MaterialCommunityIcons
                        name = "plus-circle-outline"
                        size = {24}
                        color = {"#2E3856"}
                        />
                    )
                }
            }} />
            <Tab.Screen name = "personal" component={Personal} options = {{
                tabBarLabel:"",
                tabBarIcon: ()=>{
                    return(
                        <Ionicons
                        name = "person"
                        size = {24}
                        color = "#2E3856"
                        />
                    )
                }
            }} />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    tabBarStyle:{
        backgroundColor: "#0A092D"
    }
})
export default BottomTab