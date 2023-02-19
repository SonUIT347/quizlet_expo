import { View,
         Text, 
         SafeAreaView, 
         StyleSheet, 
         TouchableOpacity, 
         Dimensions, 
         ScrollView } from 'react-native'
import React  from 'react'
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height


const Folder = ({props, navigation}) => {
  return (
    <SafeAreaView style = {styles.scroll_ctn}>
    <ScrollView horizontal={true} style = {styles.scroll}>
      {props.map((props,index) => {
        // console.log(props.id)
        return(
          <TouchableOpacity style = {styles.lesson} key={props.id} onPress={() => navigation.navigate('ViewFolder',{
            FolderID:props.id
          })} >
            <SafeAreaView style = {styles.acm_name_text}>
              <Text style={{fontSize:20, fontWeight:"bold", marginBottom: 3, color: "white",marginBottom:15}} >{props.nameFolder}</Text>
              {/* <Text style={{width:60, borderRadius: 10, padding:3, backgroundColor:"white", fontSize:10,paddingLeft:5,color:"red"}}>{props.count + " tems"}</Text> */}
            </SafeAreaView>

            {/* <Text style = {{top: 55, left:10, fontSize: 15}} >{props.user_name}</Text> */}
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
export default Folder