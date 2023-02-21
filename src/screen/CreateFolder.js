import { async } from "@firebase/util";
import { collection, addDoc, doc } from "firebase/firestore";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { db } from "../firebase/firebaseConfig";

var widthfull = Dimensions.get("window").width; //full width
var heightfull = Dimensions.get("window").height; //full height
const CreateFolder = ({ navigation, route }) => {
  // console.log(route.params.userID)
  const [folder, setFolder] = useState({
    folderName: "",
    folerDes: "",
  });
  const [folderName, setFolderName] = useState("");
  const [folderDes, setFolderDes] = useState("");
  const submit = () => {
    setFolder({ folderName, folderDes });
    console.log(folder);
  };
  const pushFolder = async () => {
    try {
      const docFolder = await addDoc(collection(db, "Folder"), {
        // userID:route.params.userID,
        Lesson_Id: "",
        nameFolder: folderName,
        Description: folderDes,
      });
      console.log(docFolder.id);
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <SafeAreaView style={styles.name_page_ctn}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
            Tạo thư mục
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.text_ip_ctn}>
          <TextInput
            placeholder="Folder Name"
            placeholderTextColor={"white"}
            onChangeText={(newtext) => setFolderName(newtext)}
            style={styles.text_ip}
          />
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholder="Descripttion"
              placeholderTextColor={"white"}
              onChangeText={(newtext) => setFolderDes(newtext)}
              style={styles.text_ip}
            />
          </View>
        </SafeAreaView>
        <Button
          onPress={() => (submit(), pushFolder())}
          title="Xong"
          buttonStyle={{
            backgroundColor: "rgba(78, 116, 289, 1)",
            borderRadius: 3,
          }}
          containerStyle={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 50
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: widthfull,
    height: heightfull,
    backgroundColor: "#2E3856",
  },
  name_page_ctn: {
    width: widthfull,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text_ip: {
    borderBottomWidth: 2,
    borderColor: "white",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  text_ip_ctn: {
    width: widthfull,
  },
});
export default CreateFolder;
