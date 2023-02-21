import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Input } from "@rneui/themed";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
// import { Button, TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, doc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons"
// import { Alert } from "react-native/Libraries/Alert/Alert";
var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height

const Create = ({ navigation, route }) => {
  // console.log(route.params.userID)
  const [lessonName, setLessonName] = useState("");
  const [lesson, setLesson] = useState({
    name: "",
    id: "",
    means: "",
    vocabularies: "",
  });
  const [count, setCount] = useState(1);
  const [inputFlield, setInputField] = useState([1]);
  const addTextField = () => {
    setCount((count) => count + 1);
    setInputField([...inputFlield, count + 1]);
  };
  const [vocabulary, setVocabulary] = useState("");
  const [vocabularies, setVocabularies] = useState({});
  const [mean, setMean] = useState("");
  const [means, setMeans] = useState({});
  const submit = async () => {
    var a = [];
    // a.push({
    //     name:lessonName})
    for (let i = 1; i <= inputFlield.length; i++) {
      if (lesson.vocabularies[i] == undefined && lesson.means[i] == undefined) {
        a.push({
          id: i,
          Term: "",
          Define: "",
        });
      } else if (
        lesson.vocabularies[i] == undefined &&
        lesson.means[i] != undefined
      ) {
        a.push({
          id: i,
          Term: "",
          Define: lesson.means[i].mean,
        });
      } else if (
        lesson.vocabularies[i] !== undefined &&
        lesson.means[i] == undefined
      ) {
        a.push({
          id: i,
          Term: lesson.vocabularies[i].voca,
          Define: "",
        });
      } else
        a.push({
          id: i,
          Term: lesson.vocabularies[i].voca,
          Define: lesson.means[i].mean,
        });
    }
    console.log(a);
    // setLessonArray(a)
    // console.log(lessonArray)
    // const pushData = async () =>{
    try {
      // const docCard = await addDoc(collection(db, "Card"),{

      // });
      const docLesson = await addDoc(collection(db, "Lesson"), {
        userID: route.params.userID,
        Card: a,
        Name: lessonName,
        Count: a.length,
      });
      navigation.goBack();
      setCount(1);
      setInputField([1]);
      setVocabularies({});
      setMeans({});
      setVocabulary("");
      setMean("");
      setLesson({
        name: "",
        id: "",
        means: "",
        vocabularies: "",
      });
      setLessonName("");
    } catch (error) {
      console.log(error);
    }
  };
  // }
  // console.log(lessonArray)

  // console.log(lessonArray)
  return (
    <SafeAreaView style={styles.main}>
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 30 }}>
        <SafeAreaView style={styles.lesson_text_ctn}>
          <TouchableOpacity onPress={() => navigation.navigate("createfolder")}>
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 13,
                marginTop: 10,
                width: 50,
              }}
            >
              Tạo thư mục
            </Text>
          </TouchableOpacity>
          <SafeAreaView>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                top: 10,
                color: "white",
              }}
            >
              Tạo học phần
            </Text>
          </SafeAreaView>

          <TouchableOpacity onPress={() => submit()}>
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                marginTop: 18,
                fontSize: 15,
                marginRight: 10,
              }}
            >
              Xong
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* <TextInput
                placeholder="text some thing"
            /> */}
        <SafeAreaView
          style={{
            color: "black",
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 30,
            marginTop: 10,
          }}
        >
          <Input
            placeholder="Chủ đề, chương, đơn vị"
            inputStyle={{ color: "white" }}
            inputContainerStyle={{
              borderBottomWidth: 3,
              borderBottomColor: "white",
            }}
            errorStyle={{
              color: "white",
              fontSize: 10,
              fontWeight: "500",
              margin: 0,
            }}
            errorMessage="TIÊU ĐỀ"
            onChangeText={(newtext) => setLessonName(newtext)}
          />
        </SafeAreaView>

        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={10}
        >
          <ScrollView>
            {inputFlield.map((inputFlield, index) => {
              return (
                <SafeAreaView style={styles.text_input_ctn} key={inputFlield}>
                  {/* {console.log(inputFlield)} */}
                  {index > 1 && <TouchableOpacity>
                    <AntDesign name="close" color="white" size={15} />
                  </TouchableOpacity>}
                  <TextInput
                    clearButtonMode="always"
                    name="vocabulary"
                    autoFocus={true}
                    onChangeText={(e) => {
                      setVocabulary({ ...vocabulary, voca: e });
                      vocabularies[inputFlield] = { ...vocabulary, voca: e };
                      setVocabularies(vocabularies);
                      setLesson({ ...lesson, vocabularies });
                    }}
                    style={styles.text_ip_vocabulary}
                  />
                  <Text style={styles.text_name}>THUẬT NGỮ</Text>
                  <TextInput
                    clearButtonMode="always"
                    name="mean"
                    onChangeText={(e) => {
                      setMean({ ...mean, mean: e });
                      means[inputFlield] = { ...mean, mean: e };
                      setMeans(means);
                      setLesson({ ...lesson, means });
                    }}
                    style={styles.text_ip_vocabulary}
                  />
                  <Text style={styles.text_name}>ĐỊNH NGHĨA</Text>
                </SafeAreaView>
              );
            })}
          </ScrollView>
          <TouchableOpacity onPress={() => addTextField()}>
            <Ionicons
              name="md-add-circle-outline"
              color="white"
              size={50}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  lesson_text_ctn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  main: {
    flex: 1,
    backgroundColor: "#0A092D",
    // backgroundColor: 'red',
  },
  text_input_ctn: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#2E3856",
    // backgroundColor: 'red',
  },
  text_ip_vocabulary: {
    height: 40,
    fontSize: 18,
    backgroundColor: "",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    color: "white",
  },
  text_name: {
    color: "#9CBCD5",
  },
});
export default Create;
