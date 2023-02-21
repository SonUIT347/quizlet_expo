import React, { useState, useEffect } from "react";
import { doc, updateDoc, deleteField, setDoc, query, where, collection, documentId, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

// const FolderId = 'jtOjniEeGlpuxHQg4txg'

const AddFolder = ({
  dataFolder,
  dataCards,
  headerFolder,
  modalVisible,
  setModalVisible,
  setDataFolder,
  setHeaderFolder,
  
}) => {
  const checkCard = (data) => {
    for (let i = 0; i < dataFolder.length; i++) {
      if (dataFolder[i].id === data) return true;
    }
    return false;
  };

  function handleButton()  {
    if(!modalVisible.checkAddFolder)
    {
      console.log(modalVisible) 
      {console.log(dataFolder)}
    }
  }
  const [FolderId,setFolderID] = useState('')
  useEffect(async() =>{
    id = await AsyncStorage.getItem("FolderID")
    setFolderID(id)
  },[])
                  
  // console.log(dataFolder.length);
  const handleClick = (check, id, Name, Count, img, nameAuthor) => {
    if (!check) {
      setDataFolder(dataFolder=>{return[...dataFolder, {
        id: id,
        nameAuthor: nameAuthor,
        Name: Name,
        Count: Count,
        img: img,
      }]});
      // console.log(dataFolder.length, "hello");
    } else {
      setDataFolder(dataFolder.filter((data) => data.id !== id));
      // console.log(dataFolder.filter((data) => data.id !== id).length, 'hi')
      
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
                      const DataId = []
                      for (let i = 0; i < dataFolder.length; i++) {
                        DataId[i] = dataFolder[i].id
                      }
                      const cityRef = doc(db, 'Folder', FolderId);
                      const del = async () => {
                        const ha = await updateDoc(cityRef, {
                          Lesson_Id: deleteField()
                      })}

                      del()

                      const HoH = async () =>{
                      const ho = await updateDoc(doc(db, 'Folder', FolderId ), {

                        Lesson_Id: DataId,
                        // dsdfsd: ''00
                      }
                      
                      
                      );               
                      }
                      console.log(DataId)

                      HoH()
                      const b = query(collection(db, "Folder"), where(documentId(), "==", FolderId))
                      const getDataFolder = async () =>{
                      const headerFolders = await getDocs(b)
                      setHeaderFolder(headerFolders.docs.map((doc) =>({...doc.data(), id: doc.id}))[0])
                      }
                      getDataFolder()
    // console.log(headerFolder.Lesson_Id)

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
                        dataCards.Name,
                        dataCards.Count,
                        dataCards.img,
                        dataCards.nameAuthor
                      );
                    }}
                  >
                    <Card
                      Name={dataCards.Name}
                      Count={dataCards.Count}
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
    marginTop: 20,
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
