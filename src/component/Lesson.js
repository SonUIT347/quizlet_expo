import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { View,Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
// import StackNavigator from "./AhivementNav";
// import Search from "../Search";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const Lesson = ({props, navigation}) =>{
    const exam = [
        {
          id: "1",
          Name:"lesson 1",
          count: 32,
          user_name: "son"
        },
        {
          id: "2",
          Name:"lesson 2",
          count: 32,
          user_name: "son"
        },
        {
          id: "3",
          Name:"lesson 3",
          count: 32,
          user_name: "son"
        },
      ]
    return(
        <SafeAreaView style = {styles.scroll_ctn}>
        <ScrollView horizontal={true} style = {styles.scroll}>
          {props.map((props,index) => {
            return(
              <TouchableOpacity style = {styles.lesson} key={props.id} onPress={() => navigation.navigate("Option",{
                lessonId:props.id
              })}>
                <SafeAreaView style = {styles.acm_name_text}>
                  <Text style={{fontSize:20, fontWeight:"bold", marginBottom: 3, color: "white",marginBottom:15}} >{props.Name}</Text>
                  <Text style={{width:60, borderRadius: 10, padding:3, backgroundColor:"white", fontSize:10,paddingLeft:5,color:"red"}}>{props.Count + " tems"}</Text>
                </SafeAreaView>
  
                <Text style = {{top: 55, left:10, fontSize: 15}} >{props.user_name}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    scroll_ctn:{
      height:150,
      width: widthfull,
      positions: "relative",
      flexDirection: "row",
      justifyContent:"space-around",
      left:10,
    },
    lesson:{
      height: 133,
      width: 258,
      backgroundColor: "#2E3856",
      borderRadius: 10,
      marginLeft:10,
      marginRight:10,
    },
    acm_name_text:{
      left:10,
      width: 240,
      height:50,
      //backgroundColor:"red",
      flexDirection:"column",
      justifyContent:"space-between",
    }
  })

export default Lesson