import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
const ShowFolder = ({ modalVisible, setModalVisible, folder, navigation }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.showFolder}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ borderBottomWidth: 2, borderBottomColor: "white" }}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setModalVisible((modalVisible) => {
                      return { ...modalVisible, showFolder: false };
                    })
                  }
                >
                  <AntDesign name="arrowleft" color="white" size={30} />
                </TouchableOpacity>
                <Text
                  style={[styles.text, { fontSize: 20, fontWeight: "700" }]}
                >
                  Thư mục
                </Text>
                <AntDesign name="plus" color="white" size={30} />
              </View>
            </View>
            <ScrollView>
              {folder.map((folder, index) => {
                return (
                  <TouchableOpacity
                    style={[styles.lesson, {marginTop: 10}]}
                    key={folder.id}
                    onPress={() =>
                      navigation.navigate("ViewFolder", {
                        FolderID: folder.id,
                      })
                    }
                  >
                    <View style={{ margin: 10 }}>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{ marginRight: 10, justifyContent: "center" }}
                        >
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
                          {folder.nameFolder}
                        </Text>
                        {/* <Text style={{width:60, borderRadius: 10, padding:3, backgroundColor:"white", fontSize:10,paddingLeft:5,color:"red"}}>{folder.count + " tems"}</Text> */}
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
                    {/* <Text style = {{top: 55, left:10, fontSize: 15}} >{folder.user_name}</Text> */}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "#0A092D",
  },
  modalView: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    height: "95%",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  lesson: {
    backgroundColor: "#2E3856",
    borderRadius: 7,
  },
});
export default ShowFolder;
