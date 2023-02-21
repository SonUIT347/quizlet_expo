import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Folder = ({ props, navigation }) => {
  return (
    <SafeAreaView style={styles.scroll_ctn}>
      <ScrollView horizontal={true} style={styles.scroll}>
        {props.map((props, index) => {
          // console.log(props.id)
          return (
            <TouchableOpacity
              style={styles.lesson}
              key={props.id}
              onPress={() =>
                navigation.navigate("ViewFolder", {
                  FolderID: props.id,
                })
              }
            >
              <View style={{ margin: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, justifyContent: "center" }}>
                    <FontAwesome name="folder" color="white" size={15} />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    5 học phần
                  </Text>
                </View>
                <SafeAreaView style={{ marginBottom: 20, marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {props.nameFolder}
                  </Text>
                  {/* <Text style={{width:60, borderRadius: 10, padding:3, backgroundColor:"white", fontSize:10,paddingLeft:5,color:"red"}}>{props.count + " tems"}</Text> */}
                </SafeAreaView>
                <View style={{ flexDirection: "row" }}>
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
                    taitai
                  </Text>
                </View>
              </View>
              {/* <Text style = {{top: 55, left:10, fontSize: 15}} >{props.user_name}</Text> */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scroll_ctn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  lesson: {
    width: "30%",
    backgroundColor: "#2E3856",
    borderRadius: 8,
    marginLeft: 10,
  },
  acm_name_text: {
    //backgroundColor:"red",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
export default Folder;
