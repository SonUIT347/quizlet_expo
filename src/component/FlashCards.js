import React, { useState } from "react";
import { View,Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import { Dimensions } from "react-native";
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const Flashcards = ({props}) =>{
  const TEST_LIST = [
    {
      idi: "1",
      question:"d0g",
      answer: "con cho",
    },
    {
      idi: "2",
      question:"cat",
      answer: "con meo",
    },
    {
      idi: "3",
      question:"bird",
      answer: "con chim",
    },
    {
      idi: "4",
      question:"bird",
      answer: "con chim",
    },
  ]
  const [touch, setTouch] = useState(false)
    return(
        <SafeAreaView style={{}}>
          <ScrollView horizontal={true} style = {styles.scroll} >
          {props.map((l) =>{
              return(
                l.Card.map((list) => {
                  return(
                   <SafeAreaView style = {styles.text} key={list.id}>
                     <TouchableOpacity style={styles.button} onPress={()=>setTouch(!touch)}>
                       <Text style={{fontSize:40, fontWeight:"bold", alignSelf:"center",color:"white"}} >{!touch?list.Term:list.Define}</Text>
                       </TouchableOpacity>
                   </SafeAreaView>
                  )
               })
              )
          })}
          </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  name:{
    color: 'white',
    fontSize: 30,
    padding:5,
  },
  scroll:{
    height:200,
    width: widthfull,
    marginTop:10
  },
  text:{
    height: '100%',
    width: widthfull-100,
    // backgroundColor: "green",
    // borderRadius: 10,
    marginLeft:50,
    marginRight:50,
    alignSelf: "center",

  },

  button: {
    flex:1,
    backgroundColor: '#2E3856',
    padding: 1,
    flexDirection:"column",
    justifyContent:"center",
    borderRadius: 10,
  }
})
export default Flashcards