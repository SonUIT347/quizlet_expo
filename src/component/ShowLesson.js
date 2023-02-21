import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Card from "./Card";
import AntDesign from "react-native-vector-icons/AntDesign";
const ShowLesson = ({
  modalVisible,
  setModalVisible,
  lesson,
  navigation,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.showLesson}
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
                      return { ...modalVisible, showLesson: false };
                    })
                  }
                >
                  <AntDesign name="arrowleft" color="white" size={30} />
                </TouchableOpacity>
                <Text
                  style={[styles.text, { fontSize: 20, fontWeight: "700" }]}
                >
                  Học phần
                </Text>
                <AntDesign name="plus" color="white" size={30} />
              </View>
            </View>
            <ScrollView>
              {lesson.map((lesson, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate(
                        "Option" ,{
                        lessonId:index.id
                      }
                      )
                    }
                  >
                    <Card Name={lesson.Name} Count={lesson.Count} />
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
  
});
export default ShowLesson;
