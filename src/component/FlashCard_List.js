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
                  <Text style={{fontSize:20, marginLeft:10, marginBottom: 10, color:'white'}} >{quiz.Term}</Text>
                  <Text style={{fontSize:20, marginLeft:10,color:'white'}} >{quiz.Define}</Text>
                </SafeAreaView>
              )})
          )
        })}
    </SafeAreaView>
)
}
const styles = StyleSheet.create({

  text:{
    height: heightfull/10,
    width: "90%",
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    borderCurve: 25,
    marginTop:20,
    marginLeft:"5%",
    shadowOpacity:.2,
    shadowRadius:5,
    justifyContent:"center",
    backgroundColor:"#2E3856"
  },
})
export default Flashcard_List