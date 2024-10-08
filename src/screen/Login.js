import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "@rneui/base";
import React, { createContext, useState } from "react";
import { Dimensions } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { authentication } from "../firebase/firebaseConfig";
import { useContext } from "react";
var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [eyeIcon, setEyeicon] = useState("eye");
  const [typePass, setTypePass] = useState();
  const [isSecure, setIsSecure] = useState(true);
  const signIn = () => {
    signInWithEmailAndPassword(authentication, userName, Password)
      .then((userCredential) => {
        // Signed in
        onAuthStateChanged(authentication, (user) => {
          if (user) {
            console.log("abs")
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const userName = user.email.split('@gmail.com', 1);
            // console.log(userName);
            // const userId = createContext(uid)
            // console.log(userId.Provider)
            navigation.navigate("TabBar",{
              userID:uid, userName: userName,
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
        alert(errorCode);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("./Login.png")}
      />
      <SafeAreaView
        style={[styles.textInput_ctn, { marginLeft: 30, marginRight: 30 }]}
      >
        <Text style={styles.text}>Email</Text>
        <TextInput
          fontSize={15}
          onChangeText={(newtext) => setUserName(newtext)}
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={"gray"}
        ></TextInput>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            fontSize={15}
            onChangeText={(newtext) => setPassword(newtext)}
            style={styles.textInput}
            secureTextEntry={isSecure}
            placeholder="Password"
            placeholderTextColor={"gray"}
          ></TextInput>
        </View>
        {/* <TouchableOpacity onPress={() => setEyeicon("eye-off") } >
              <Ionicons
                        name={eyeIcon}
                        size={24}
                        color="white"
                      />
      </TouchableOpacity> */}
        <Button
          onPress={() => signIn()}
          title="Đăng nhập"
          buttonStyle={{
            backgroundColor: "rgba(78, 116, 289, 1)",
            borderRadius: 4,
          }}
          containerStyle={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
        <View style={{ flexDirection: "row" , marginTop: 20}}>
          <Text style={{ color: "white", fontWeight: "600" }}>
            Bạn đã đăng kí thành viên chưa?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                color: "#FF8FA2",
                textDecorationLine: "underline",
              }}
            >
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: widthfull,
    height: heightfull,
    backgroundColor: "#0A092D",
    flexDirection: "column",
    justifyContent: "center",
  },
  textInput_ctn: {
    //backgroundColor:"blue",
    height: "50%",
  },
  textInput: {
    alignSelf: "center",
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "white",
    backgroundColor: "white",
    height: 50,
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    alignSelf: "flex-start",
    fontSize: 20,
    color: "white",
  },
  text_color: {
    textColor: "white",
  },
});

export default Login;