import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, TextInput, StyleSheet, View, FlatList, Text } from "react-native";
// import { SearchBar } from 'react-native-elements';
import Nav_Search_Touch from "../component/Nav_Search_Touch";
import Icon from 'react-native-vector-icons/Feather';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const Avatar = 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-anime-1.jpg?ssl=1'

const Search = ({navigation}) =>{
    const [touch, setTouch] = useState(true)
    const [touch1, setTouch1] = useState(false)
    const [exam, setExam] = useState([])
    const [docLess, setDocLes] = useState([{}])
    const [docFols,setDocFol] = useState([])
    const [lesson, setLesson] = useState([])
    const [folder, setFolder] = useState([])
    useEffect(() =>{
      const getDataLesson = async () =>{
        const docLes = await getDocs(collection(db, "Lesson"))
        setDocLes(docLes.docs.map((doc) =>({...doc.data(), id: doc.id})))
        setLesson(docLes.docs.map((doc) =>({...doc.data(), id: doc.id})))
      }
      const getDataFolder = async () =>{
        const docFol = await getDocs(collection(db, "Folder"))
        setDocFol(docFol.docs.map((doc) =>({...doc.data(), id: doc.id})))
        setFolder(docFol.docs.map((doc) =>({...doc.data(), id: doc.id})))
        // setFolder(docFols)
      }
      getDataLesson()
      getDataFolder()
    },[])
    console.log(docFols)
    return(
    <SafeAreaView style = {styles.main} >
      <SafeAreaView style = {{padding: 15, marginTop: 10}}>
              <View style = {styles.text_ip}>
                <TextInput placeholder="Tìm kiếm" placeholderTextColor={'white'} style = {{color: 'white', padding: 5, paddingLeft: 15, fontSize: 18, paddingRight: 15} }
                onChangeText = {(search_string) =>{
                  setLesson(docLess.filter((docLess) =>{
                    return docLess.Name.toString().includes(search_string)
                  }))
                  setFolder(docFols.filter((docFols) => {
                    return docFols.nameFolder.toString().includes(search_string) 
                  }))
                }
              }/> 
              </View>
              {/* <SearchNav/> */}
      </SafeAreaView>
      <SafeAreaView>
          <SafeAreaView style={styles.touch_ctn}>
              <TouchableOpacity onPress={() => (setTouch(true),setTouch1(false))} style={touch?styles.touch:styles.ontouch} >
                  <Text style={{color:"white",alignSelf:"center", padding:10, fontSize: 23}}>Học phần</Text>
              </TouchableOpacity  >
              <TouchableOpacity onPress={() => (setTouch(false),setTouch1(true))} style={touch1?styles.touch:styles.ontouch}>
                  <Text style={{color:"white", alignSelf:"center", padding:10, fontSize: 23}}>Thư mục</Text>
              </TouchableOpacity>
          </SafeAreaView>
      </SafeAreaView>
      
      <SafeAreaView style = {styles.search_ctn}>
        <ScrollView style={{marginTop: 10}}>
        {touch?lesson
        .map((lesson,index) => {
          return(
            <View style = {{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10,}}>
              <TouchableOpacity style = {styles.lesson} key={lesson.id} onPress={() => navigation.navigate("option",{
                lessonId:lesson.id
              })} >
                <SafeAreaView style = {styles.acm_name_text}>
                  <View style = {styles.name_ctn}>
                    
                  <Text style={{fontSize:25, fontWeight:"bold", margin: 5, color:"#FFFFFF"}} >{lesson.Name}</Text>
                  </View>
                  {(touch?
                  <View style = {styles.term_ctn}>
                    <Text style={{color:"#2E3856", fontSize:14, padding: 3, alignSelf:"center"}}>{lesson.Count + " thuat ngu"}</Text>
                  </View>:"")}
                </SafeAreaView>

                {/* <Text style = {{fontSize: 16 ,color: "#6384B0", margin: 5}} >{lesson.user_name} UserName</Text> */}
                <View style={{flexDirection: 'row', margin: 20, marginTop: -5}}>
                  <Image source={{uri: Avatar}} style={{ height: 30, width: 30, borderRadius: 20,}}/>
                  <Text style={{color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center', padding: 5, marginLeft: 5}}>{lesson.user_name} UserName</Text>
                </View>

              </TouchableOpacity>
            </View>
            )
          }):
          folder.map((folder, index) =>{
            return(
              // <View style = {{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10,}}>
              //   <TouchableOpacity style = {styles.lesson} key={lesson.id} onPress={() => navigation.navigate("ViewFolder",{
              //     FolderID:folder.id
              //   })} >
              //     <SafeAreaView style = {styles.acm_name_text}>
              //       <View style = {styles.name_ctn}>
              //       <Text style={{fontSize:20, fontWeight:"bold", marginBottom: 3, color:"#FFFFFF"}} >{folder.nameFolder}</Text>
              //       </View>
              //     </SafeAreaView>
              //     {/* <Text style = {{top: 55, left:10, fontSize: 15 ,color: "#6384B0"}} >{search.user_name}</Text> */}
              //   </TouchableOpacity>
              // </View>
              <View style = {{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10}}>
                <TouchableOpacity key={index} onPress={() => navigation.navigate("ViewFolder",{
                  FolderID:folder.id
                })}
                style={{backgroundColor: '#2e3969', borderRadius: 10}}>
                  <View style = {{margin: 15,}}>
                    <Icon name='folder' size={25} color='white' style={{margin: 5}}></Icon>

                    <Text style={{color:'white', fontSize: 25, fontWeight: '700', margin: 5}}>{folder.nameFolder}</Text>

                    <View style={{flexDirection: 'row', margin: 5}}>
                      <Image source={{uri: Avatar}} style={{ height: 30, width: 30, borderRadius: 20,}}/>
                      <Text style={{color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center', padding: 5, marginLeft: 5}}>{folder.nameAuthor}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
        </ScrollView>

      </SafeAreaView>

    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  main:{
    width: widthfull,
    height:heightfull,
    backgroundColor: "#09092B"
  },
    text_ip: {
        borderColor: "#FFFFFF",
        border: 3,
        backgroundColor:"#2E3856",
        // backgroundColor:"blue",
        marginTop:20,
        borderRadius:15,
    },
    name_ctn:{
      // marginTop:20,
      margin: 0
      // marginBottom:20
    },
    term_ctn:{
      backgroundColor:"white",
      borderRadius:20,
      margin: 5,
      width: '25%',
    },
    name_text:{
      color: 'white'
    },
    acm_name_text:{
      // left:10,
      backgroundColor:"",
      flexDirection:"column",
      margin: 15,
      // justifyContent:"space-between"
    },   
    lesson:{
      backgroundColor: "#2F3856",
      borderRadius: 10
      // backgroundColor: 'green'
    },
    search_ctn:{
      width: widthfull,
      height:heightfull,
      flexDirection:"column",
      // alignItems:"center"
    },
    touch_ctn:{
        flexDirection:"row",
        justifyContent:"space-around",
        // backgroundColor: "red",
    },
    touch:{
        width: "50%",
        borderBottomWidth:4,
        borderBottomColor:"#546999"
    },
    ontouch:{
        width: "50%",
    }
})
export default Search