import React, { useState } from "react";
import { View,Text, StyleSheet, SafeAreaView} from "react-native";
import { Dimensions } from "react-native";

var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height


const Flashcard_List = ({props}) =>{
    return(
     
      <SafeAreaView >
        {props.map((l) =>{
          return(
            l.Card.map((quiz,index) => {
              return(
                <SafeAreaView style = {styles.text} key={quiz.id}>
                  <Text style={{fontSize:30, margin:10, marginBottom: 0, color:'white'}} >{quiz.Term}</Text>
                  <Text style={{fontSize:20, margin:10,color:'white'}} >{quiz.Define}</Text>
                </SafeAreaView>
              )})
          )
        })}
    </SafeAreaView>
)
}
const styles = StyleSheet.create({

  text:{
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    borderCurve: 25,
    shadowOpacity:.2,
    shadowRadius:5,
    justifyContent:"center",
    backgroundColor:"#2E3856",
    margin: 10,
  },
})
export default Flashcard_List