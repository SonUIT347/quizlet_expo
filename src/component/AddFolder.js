import React, { useState } from "react";
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
const AddFolder = ({
  dataFolder,
  dataCards,
  modalVisible,
  setModalVisible,
  setDataFolder,
}) => {
  const checkCard = (data) => {
    for (let i = 0; i < dataFolder.length; i++) {
      if (dataFolder[i].id === data) return true;
    }
    return false;
  };
  console.log(dataFolder.length);
  const handleClick = (check, id, nameCard, quantity, img, nameAuthor) => {
    if (!check) {
      setDataFolder(dataFolder=>{return[...dataFolder, {
        id: id,
        nameAuthor: nameAuthor,
        nameCard: nameCard,
        quantity: quantity,
        img: img,
      }]});
      console.log(dataFolder.length, "hello");
    } else {
      setDataFolder(dataFolder.filter((data) => data.id !== id));
      console.log(dataFolder.filter((data) => data.id !== id).length, 'hi')
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.checkAddFolder}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderBottomWidth: 3,
                borderColor: "#5A627D",
                marginBottom: 30,
              }}
            >
              <View style={styles.header}>
                <Text> {} </Text>
                <Text style={[styles.text, { fontWeight: "700" }]}>
                  Thêm học phần
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setModalVisible((modalVisible) => {
                      return { ...modalVisible, checkAddFolder: false };
                    })
                  }
                >
                  <Text style={[styles.text, { fontWeight: "700" }]}>Xong</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity>
              <Text
                style={[styles.text, { textAlign: "center", color: "#A9B1F9" }]}
              >
                + Thêm học phần
              </Text>
            </TouchableOpacity>
            <ScrollView style={{ marginTop: 40 }}>
              {dataCards.map((dataCards, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleClick(
                        checkCard(dataCards.id, dataFolder),
                        dataCards.id,
                        dataCards.nameCard,
                        dataCards.quantity,
                        dataCards.img,
                        dataCards.nameAuthor
                      );
                    }}
                  >
                    <Card
                      nameCard={dataCards.nameCard}
                      quantity={dataCards.quantity}
                      img={dataCards.img}
                      nameAuthor={dataCards.nameAuthor}
                      borderColor={checkCard(dataCards.id, dataFolder)}
                    />
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
    marginTop: 30,
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
export default AddFolder;
