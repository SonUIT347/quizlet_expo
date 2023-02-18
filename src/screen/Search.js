import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, TextInput, StyleSheet, View, FlatList, Text } from "react-native";
import Nav_Search_Touch from "../component/Nav_Search_Touch";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const Search = ({navigation}) =>{
    const [touch, setTouch] = useState(true)
    const [touch1, setTouch1] = useState(false)
    const [docLess, setDocLes] = useState([])
    const [docFols,setDocFol] = useState([])
    const [search, setSearch] = useState([])
    const [folder, setFolder] = useState([])
    useEffect(() =>{
      const getDataLesson = async () =>{
        const docLes = await getDocs(collection(db, "Lesson"))
        setDocLes(docLes.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
        setSearch(docLes.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
      }
      const getDataFolder = async () =>{
        const docFol = await getDocs(collection(db, "Folder"))
        setDocFol(docFol.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
        setFolder(docFol.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
        // setFolder(docFols)
      }
      getDataLesson()
      getDataFolder()
    },[])



const [exam1, setExam1] = useState([
    {
        id:1,
        name:"nihon",
        user:"son"
    },
    {
        id:2,
        name:"english",
        user:"tai"
    },
    {
        id:3,
        name:"vietnamese",
        user:"thang"
    }
])
    return(
    <SafeAreaView style = {styles.main} >
    <SafeAreaView>
            <View style = {styles.text_ip}>
            <TextInput placeholder="Search" placeholderTextColor={'white'} style = {{color: 'white'} }
            onChangeText = {(search_string) =>{
              setSearch(docLess.filter((docLess) =>{
                return docLess.Name.toString().includes(search_string)
              //  || search.user_name.toString().includes(search_string.toLocaleLowerCase())
              }))
              setFolder(docFols.filter((docFols) => {
                return docFols.Name.toString().includes(search_string) 
                // || exam1.user.toString().includes(search_string.toLocaleLowerCase())
              }))
            }}
            
            /> 
            </View>
            {/* <SearchNav/> */}
    </SafeAreaView>
    <SafeAreaView>
        <SafeAreaView style={styles.touch_ctn}>
            <TouchableOpacity onPress={() => (setTouch(true),setTouch1(false))} style={touch?styles.touch:styles.ontouch} >
                <Text style={{color:"white",alignSelf:"center", padding:10}}>Lession</Text>
            </TouchableOpacity  >
            <TouchableOpacity onPress={() => (setTouch(false),setTouch1(true))} style={touch1?styles.touch:styles.ontouch}>
                <Text style={{color:"white", alignSelf:"center", padding:10}}>Folder</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </SafeAreaView>
    <SafeAreaView style = {styles.search_ctn}>
    <ScrollView>
{ 
    (touch?search:folder).map((search,index) => {
            return(
              <TouchableOpacity style = {styles.lesson} key={search.id} onPress={() => navigation.navigate("option",{
                lessonId:search.id
              })} >
                <SafeAreaView style = {styles.acm_name_text}>
                  <View style = {styles.name_ctn}>
                  <Text style={{fontSize:20, fontWeight:"bold", marginBottom: 3, color:"#FFFFFF"}} >{search.Name}</Text>
                  </View>
                  {(touch?
                  <View style = {styles.term_ctn}>
                    <Text style={{color:"#2E3856", fontSize:10, alignSelf:"center"}}>{search.Count + " thuat ngu"}</Text>
                  </View>:"")}
                </SafeAreaView>

                <Text style = {{top: 55, left:10, fontSize: 15 ,color: "#6384B0"}} >{search.user_name}</Text>
              </TouchableOpacity>
            )
          })}
    </ScrollView>

    </SafeAreaView>

      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  main:{
    width: widthfull,
    height:heightfull,
    backgroundColor: "#0A092D"
  },
    text_ip: {
        borderColor: "#FFFFFF",
        border: 3,
        with: 200,
        height:40,
        backgroundColor:"#2E3856",
        marginTop:20,
        marginLeft: 16,
        marginRight: 16,
        borderRadius:10,
    },
    name_ctn:{
      width: 150,
      height:30,
      marginTop:20,
      marginBottom:20
    },
    term_ctn:{
      width:80,
      height:18,
      backgroundColor:"white",
      borderRadius:20,
    },
    name_text:{
      color: 'white'
    },
    acm_name_text:{
      left:10,
      width: 240,
      height:50,
      backgroundColor:"",
      flexDirection:"column",
      justifyContent:"space-between"
    },   
    lesson:{
      height: 160,
      width: 360,
      backgroundColor: "#2E3856",
      borderRadius: 10,
      marginTop:10,
      marginBottom:10
    },
    search_ctn:{
      width: widthfull,
      height:heightfull,
      flexDirection:"column",
      alignItems:"center"
    },
    touch_ctn:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    touch:{
        width: "50%",
        borderBottomWidth:1,
        borderBottomColor:"white"
    },
    ontouch:{
        width: "50%",
    }
})
export default Search