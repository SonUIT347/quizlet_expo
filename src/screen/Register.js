import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { Dimensions } from "react-native";
import { authentication } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height

const Register = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [eyeIcon, setEyeicon] = useState("eye");
  const [typePass, setTypePass] = useState();
  const [isSecure, setIsSecure] = useState(true);
  const signUp = () => {
    createUserWithEmailAndPassword(authentication, userName, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user");
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("./signup.png")}
      />
      <View style={{ marginLeft: 30, marginRight: 30 }}>
        <SafeAreaView style={styles.textInput_ctn}>
          <Text style={styles.text}>User name</Text>
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
            onPress={() => signUp()}
            title="Đăng ký"
            buttonStyle={{
              backgroundColor: "rgba(78, 116, 289, 1)",
              borderRadius: 4,
            }}
            containerStyle={{
              marginTop: 40,
              marginLeft: 20,
              marginRight: 20,
            }}
          />
        </SafeAreaView>
      </View>
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

export default Register;
