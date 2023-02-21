import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import Lesson from "../component/Lesson";
import Folder from "../component/Folder";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button } from "@rneui/base";
import { authentication } from "../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowLesson from "../component/ShowLesson";
import ShowFolder from "../component/ShowFolder";
var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height

const Home = ({ navigation, route}) => {
  const userName = `${route.params.userName}`
  const [modalVisible, setModalVisible] = useState({
    showLesson: false,
    showFolder: false,
  });
  console.log(navigation)
  const [lesson, setLesson] = useState([]);
  const [folder, setfolder] = useState([]);
  const logOut = () => {
    signOut(authentication)
      .then((result) => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const getDataLesson = async () => {
      const data = await getDocs(collection(db, "Lesson"));
      setLesson(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(lesson.id);
    };
    const getDataFolder = async () => {
      const docFol = await getDocs(collection(db, "Folder"));
      setfolder(docFol.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDataLesson();
    getDataFolder();
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <View style={{ borderBottomWidth: 2, borderBottomColor: "white" }}>
        <View style={styles.container}>
          <Text style={styles.name}>Quizzy </Text>
          <SafeAreaView style={{ left: 100, top: 10 }}>
            <TouchableOpacity onPress={() => logOut()}>
              <Ionicons name="log-out-outline" size={30} color="white" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
      <ScrollView>
        <View>
          <SafeAreaView style={styles.ac_text_ctn}>
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Học phần
            </Text>
            <TouchableOpacity
              onPress={() =>
                setModalVisible((modalVisible) => {
                  return { ...modalVisible, showLesson: true };
                })
              }
            >
              <Text
                style={{
                  color: "#FF8FA2",
                  textDecorationLine: "underline",
                  fontSize: 15,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <Lesson props={{lesson, userName}} navigation={navigation} />

        <SafeAreaView style={styles.ac_text_ctn}>
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Thư mục
          </Text>
          <TouchableOpacity
            onPress={() =>
              setModalVisible((modalVisible) => {
                return { ...modalVisible, showFolder: true };
              })
            }
          >
            <Text
              style={{
                color: "#FF8FA2",
                textDecorationLine: "underline",
                fontSize: 15,
              }}
            >
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <Folder props={{folder, userName}} navigation={navigation} />
      </ScrollView>
      <ShowLesson
        lesson={lesson}
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ShowFolder
        folder={folder}
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  name: {
    color: "#FFFFFF",
    fontSize: 30,
    padding: 5,
    alignSelf: "center",
    left: 20,
  },
  main: {
    flex: 1,
    backgroundColor: "#0A092D",
  },
  container: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    positions: "relative",
  },
  LessonCtn: {
    height: 180,
    width: widthfull,
    positions: "relative",
    flexDirection: "row",
    justifyContent: "center",
  },
  Lesson: {
    height: 160,
    width: 350,
    backgroundColor: "#2E3856",
    borderRadius: 10,
    positions: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Lesson_icon: {
    width: 100,
    height: 120,
    backgroundColor: "black",
    marginTop: 20,
  },
  ac_text_ctn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
export default Home;
