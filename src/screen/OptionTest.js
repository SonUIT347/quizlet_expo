import React from "react";
import { View,Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { Dimensions } from "react-native";
import Flashcards from "../component/FlashCards";
import { db } from "../firebase/firebaseConfig";
import { getDocs, collection, where, query, documentId } from "firebase/firestore";
import Flashcard_List from "../component/FlashCard_List";
import { useState, useEffect } from "react";
import Lesson from "../component/Lesson";
import { useRoute } from "@react-navigation/native";
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const OptionTest = () =>{
  const route = useRoute()
  const [card, setCard] = useState([])
  const [displayCard, setDisplayCard] = useState([])
  // useEffect(() =>{
  //   const getCard = async () =>{
  //     const docCard = await getDocs(collection(db, "Folder"))
  //       setCard(docCard.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
  //       console.log(card)
  //   }
  //   getCard()
  // },[])
  const [lesson, setLesson] = useState([])
  const [folder, setfolder] = useState([])
  useEffect(() =>{
    const q = query(collection(db, "Lesson"), where(documentId(), "==", `${route.params.lessonId}`))
    const getDataLesson = async () =>{
      const data = await getDocs(q)
      setLesson(data.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
    }
    getDataLesson()
  },[])
  // lesson.map((l) =>{
  //   l.Card.map((c) =>{
  //     console.log(c.Term)
  //   })
  // })
    return(
    <SafeAreaView style={styles.main}>
      <ScrollView horizontal = {false} style={styles.scroll}>
        
        {/* <Flashcard_List/> */}
        <SafeAreaView  >
          <Flashcards props={lesson}/>
        </SafeAreaView>

        <SafeAreaView style = {styles.lesson_name_ctn} >
        <Text style={styles.lesson} >{lesson.map((name) => {return name.Name})}</Text>
        <Text style={styles.user} >by User</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.touch_ctn}>
          <SafeAreaView >
          <TouchableOpacity style={styles.touch} >
            <Text style={styles.text} >Flashcards</Text>
            <Text style={styles.text}  >Review terms and their meaning</Text>
          </TouchableOpacity>
          </SafeAreaView>

          {/* <TouchableOpacity >
            <Text style={styles.text}  >Learn</Text>
            <Text style={styles.text}  >Study with help of a study path</Text>
          </TouchableOpacity> */}
          <SafeAreaView >
          <TouchableOpacity style={styles.touch} >
            <Text style={styles.text} >Flashcards</Text>
            <Text style={styles.text}  >Review terms and their meaning</Text>
          </TouchableOpacity>
          </SafeAreaView>

          {/* <TouchableOpacity >
            <Text >Match</Text>
            <Text >Match words with their definitions</Text>
          </TouchableOpacity> */}
        </SafeAreaView>

        {/* <SafeAreaView>
          <Image
              style={{height: 35, width: 35, alignSelf:'center', marginVertical:45}}
              />
        </SafeAreaView> */}

        <SafeAreaView>
          <Flashcard_List props={lesson} />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  main:{
    backgroundColor:"#0A092D",
    with: widthfull,
    height: heightfull,
    flexDirection:"column",
    justifyContent:"center"
  },

  scroll:{
    height: 150,
    width: widthfull,
  },
  lesson_name_ctn:{
    height:65,
    width:"90%",
    alignSelf:"flex-start",
    marginLeft:20,
    marginRight:20,
    borderRadius:5
  },
  lesson:{
    fontSize:30, fontWeight:"bold", alignSelf:"flex-start", color:'white', shadowRadius:5, shadowOpacity:.15,
    marginLeft:5,
  },
  user:{
    fontSize:18, marginLeft:5, color: 'white'
  },
  touch_ctn:{
    height:150,
    width:"100%",
    backgroundColor:"",
  },
  touch:{
    width:"90%",
    marginLeft:"5%",
    marginTop:"5%",
    height:50,
    backgroundColor:"#2E3856",
    borderRadius:5
  },
  text:{
    color:"white",
    margin:2,
    fontSize:15
  },

})
export default OptionTest