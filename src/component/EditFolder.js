import React, { useState } from "react";
import { doc, updateDoc, deleteField, setDoc, query, where, collection, documentId, getDocs, deleteDoc } from "firebase/firestore";
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
import { Input, Icon, Button } from "@rneui/themed";
import Folder from "./Folder";

const FolderId = 'jtOjniEeGlpuxHQg4txg'

const EditFolder = ({
  modalVisible,
  setModalVisible,
  headerFolder,
  setHeaderFolder,
}) => {
  const [text, setText] = useState({ nameFolder: headerFolder.nameFolder });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.checkEdit}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() =>
                  setModalVisible((modalVisible) => {
                    return {
                      ...modalVisible,
                      checkEdit: false,
                    };
                  })
                }
              >
                <Text style={[styles.text, { fontWeight: "700" }]}>Huỷ</Text>
              </TouchableOpacity>
              <Text style={[styles.text, { fontWeight: "700" }]}>
                Sửa thư mục
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if(text.nameFolder.length !== 0){
                    const UpdatenameFolder = async () => {
                      await updateDoc(doc(db, 'Folder', FolderId), {nameFolder: text.nameFolder})
                    }
                    UpdatenameFolder()
                    setHeaderFolder((headerFolder) => {
                        return { ...headerFolder, nameFolder: text.nameFolder};
                      });
                      setModalVisible((modalVisible) => {
                        return {
                          ...modalVisible,
                          checkEdit: false,
                        };
                      });
                  }
                }}
              >
                <Text style={[styles.text, { fontWeight: "700" }]}>Xong</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
              <Input
                inputStyle={{ color: "white", fontSize: 15 }}
                errorStyle={{ color: "white", fontWeight: "600" }}
                errorMessage="TIÊU ĐỀ THƯ MỤC"
                defaultValue={text.nameFolder}
                onChangeText={(value) =>
                  setText((text) => {
                    return { ...text, nameFolder: value };
                  })
                }
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Input
                inputStyle={{ color: "white", fontSize: 15 }}
                errorStyle={{ color: "white", fontWeight: "600" }}
                errorMessage="MÔ TẢ (TUỲ CHỌN)"
              />
            </View>
            <View style={{ height: "75%", justifyContent: "flex-end" }}>
              <Button onPress={()=>{
                const DeleteData = async () => {
                await deleteDoc(doc(db, "Folder", FolderId));
                }
                DeleteData()
              }}
                title="Xoá thư mục"
                buttonStyle={{
                  backgroundColor: "#C14024",
                  borderRadius: 7,
                }}
              />
            </View>
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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
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
  },
});
export default EditFolder;
