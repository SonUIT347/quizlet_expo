import React from "react";
import { View,Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { Dimensions } from "react-native";
import Flashcards from "../component/FlashCards";
import { db } from "../firebase/firebaseConfig";
import { getDocs, collection, where, query, documentId } from "firebase/firestore";
import Flashcard_List from "../component/FlashCard_List";
import { useState, useEffect } from "react";
import Lesson from "../component/Lesson";
import Icon from 'react-native-vector-icons/Feather';
import IconCard from 'react-native-vector-icons/MaterialCommunityIcons';


import { useRoute } from "@react-navigation/native";
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const Avatar = 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-anime-1.jpg?ssl=1'


const OptionTest = ({navigation}) =>{
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
    const q = query(collection(db, "Lesson"), where(documentId(), "==", `eJGhI8VeAICAS42NvGMq`))
    // console.log(route.params.lessonId)
    // ${route.params.lessonId}
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
        <SafeAreaView>
            <Flashcards  props={lesson}/>
        </SafeAreaView>

        <SafeAreaView style = {styles.lesson_name_ctn} >
          <Text style={styles.lesson} >{lesson.map((name) => {return name.Name})}</Text>
          <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
            <Image source={{uri: Avatar}} style={{height: 30, width: 30, borderRadius: 20,}}/>
            <Text style={{color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center', padding: 5, marginLeft: 5}}>by User</Text>
            <Icon style={{color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center',  marginLeft: 10, marginRight: 10}} name='more-vertical'></Icon>
            <Text style={{color:'white', fontSize: 17, margin: 5}}>{lesson.map((item) => {return item.Count})}  thuật ngữ</Text>
          </View>
        </SafeAreaView>

        <SafeAreaView style={styles.touch_ctn}>
          <SafeAreaView >
          <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("Flashcard",{
            lessonId:route.params.lessonId
          })} >
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 15}}>
              <IconCard name='card-multiple' color={'white'} style={{}} size={30}></IconCard>
                <View style={{flexDirection: 'column', alignContent: 'center', marginLeft: 10}}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}} >Thẻ ghi nhớ</Text>
                  <Text style={styles.text}  >Ôn lại các thuật ngữ và định nghĩa</Text>
                </View>
            </View>
          </TouchableOpacity>
          </SafeAreaView>

          {/* <TouchableOpacity >
            <Text style={styles.text}  >Learn</Text>
            <Text style={styles.text}  >Study with help of a study path</Text>
          </TouchableOpacity> */}
          <SafeAreaView >
          <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("Test",{
            lessonId:route.params.lessonId
          })} >
            {/* <Text style={styles.text} >Learn</Text>
            <Text style={styles.text}  >Study with help of a study path</Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 15}}>
              <Icon name='book-open' color={'white'} style={{}} size={30}></Icon>
                <View style={{flexDirection: 'column', alignContent: 'center', marginLeft: 10}}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}} >Học</Text>
                  <Text style={styles.text}  >Tập trung học với các lộ trình trình cụ thể</Text>
                </View>
            </View>
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
        <Text style={{color:'white', fontSize: 25, fontWeight: '500', margin: 20, marginBottom: 10, marginTop: 5}}>Thẻ</Text>

        <SafeAreaView style={{ margin: 10, marginBottom: 7, marginTop: 0}}>
          <Flashcard_List props={lesson} />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  main:{
    backgroundColor:"#0A092D",
    backgroundColor:"#0A092D",
    with: widthfull,
    height: heightfull,
    flexDirection:"column",
    justifyContent:"center"
  },

  scroll:{
    height: 150,
    width: widthfull,
    marginTop: 20,
  },
  lesson_name_ctn:{
    width:"90%",
    alignSelf:"flex-start",
    marginLeft:20,
    marginRight:20,
    borderRadius:10,
    // backgroundColor: 'red',
    padding: 15,
  },
  lesson:{
    fontSize:30, fontWeight:"bold", alignSelf:"flex-start", color:'white', shadowRadius:5, shadowOpacity:.15,
    marginLeft:5, 
    // backgroundColor: 'red',
  },
  user:{
    fontSize:18, marginLeft:5, color: 'white'
  },
  touch_ctn:{
    // backgroundColor:"red",
    margin: 10,
    marginTop: 0,
  },
  touch:{
    backgroundColor:"#2E3856",
    borderRadius:10,
    margin: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  text:{
    color:"white",
    margin:2,
    fontSize:15
  },

})
export default OptionTest