import { View, Text, SafeAreaView, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import React, { createContext, useState } from "react";
import { Dimensions } from 'react-native'
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons"
import { authentication } from '../firebase/firebaseConfig';
import { useContext } from 'react';
var widthfull = Dimensions.get('window').width; //full width
var heightfull = Dimensions.get('window').height; //full height

const Login = ({navigation}) => {
  const [userName, setUserName] = useState("")
  const [Password, setPassword] = useState("")
  const [eyeIcon, setEyeicon] = useState("eye")
  const [typePass, setTypePass] = useState()
  const [isSecure, setIsSecure] = useState(true)
  const signIn = () =>{ 
    signInWithEmailAndPassword(authentication, userName, Password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      onAuthStateChanged(authentication, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // const userId = createContext(uid)
          // console.log(userId.Provider)
          navigation.navigate("TabBar",{
            userID: uid
          })
          // console.log(uid)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode)
    });

  }
  return (
    <SafeAreaView style = {styles.container} >
    <SafeAreaView style = {styles.textInput_ctn} >
      <Text style={styles.text} >User name</Text>
      <TextInput fontSize={15} onChangeText={(newtext) => setUserName(newtext) } style={styles.textInput} placeholder='email' placeholderTextColor={"gray"} >
      </TextInput>
      <Text style={styles.text} >Password</Text>
      <TextInput fontSize={15} onChangeText={(newtext) => setPassword(newtext) } style={styles.textInput} secureTextEntry={isSecure} placeholder='Password' placeholderTextColor={"gray"} >
      </TextInput>
      {/* <TouchableOpacity onPress={() => setEyeicon("eye-off") } >
              <Ionicons
                        name={eyeIcon}
                        size={24}
                        color="white"
                      />
      </TouchableOpacity> */}
      <TouchableOpacity style={{backgroundColor:"gray", marginTop:100, height:50,width:"60%", marginLeft:"20%", borderRadius:10}} onPress={() => (signIn())} >
        <Text style={{textAlign:"center", marginTop:10, fontSize:20, color:"white"}} >Login</Text>

    </TouchableOpacity>
    <TouchableOpacity style={{backgroundColor:"gray", marginTop:10, height:50,width:"60%", marginLeft:"20%", borderRadius:10}} onPress={() => navigation.navigate("Register")} >
        <Text style={{textAlign:"center", marginTop:10, fontSize:20, color:"white"}} >Register</Text>

    </TouchableOpacity>
    </SafeAreaView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    width: widthfull,
    height:heightfull,
    backgroundColor:"#0A092D",
    flexDirection:"column",
    justifyContent:"center"
  },
  textInput_ctn:{
    //backgroundColor:"blue",
    height:"50%",
  },
  textInput:{
    alignSelf:"center",
    borderBottomWidth:1,
    width:"100%",
    borderColor:"white",
    backgroundColor:"white",
    height:50
  },
  text:{
    alignSelf:"flex-start",
    fontSize:20,
    color:"white"
  },
  text_color:{
    textColor:"white"
  }
})
export default Login