import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
// import StackNavigator from "./AhivementNav";
// import Search from "../Search";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height

const Lesson = ({ props, navigation }) => {
  return (
    <SafeAreaView style={styles.scroll_ctn}>
      {console.log(props)}
      <ScrollView horizontal={true} style={styles.scroll}>
        {props.lesson.map((prop, index) => {
          return (
            <TouchableOpacity
              style={styles.card}
              key={prop.id}
              onPress={() =>
                navigation.navigate(
                  "Option" ,{
                lessonId:prop.id, userName: props.userName
              }
                )
              }
            >
              <SafeAreaView style={styles.acm_name_text}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  {prop.Name}
                </Text>
                <View
                  style={{
                    width: "20%",
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "red",
                      fontSize: 10,
                      padding: 2
                    }}
                  >
                    {prop.Count + " tems"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20}}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 100,
                      marginRight: 10,
                      justifyContent: "center",
                    }}
                    source={{
                      uri: "https://chocanh.vn/wp-content/uploads/cho-husky-sibir-ngao-2.jpg",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                  {props.userName}
                  </Text>
                </View>
              </SafeAreaView>
              {/* <Text style={{ top: 55, left: 10, fontSize: 15 }}>
                {props.user_name}
              </Text> */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scroll_ctn: {
    width: widthfull,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  acm_name_text: {
    margin: 10,
    width: "100%",
    //backgroundColor:"red",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  card: {
    width: "21%",
    backgroundColor: "#2E3856",
    marginLeft: 10,
    borderRadius: 7,
  },
});

export default Lesson;
