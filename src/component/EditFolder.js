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
import { Input, Icon, Button } from "@rneui/themed";
const EditFolder = ({
  modalVisible,
  setModalVisible,
  headerFolder,
  setHeaderFolder,
}) => {
  const [text, setText] = useState({ Name: headerFolder.Name });
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
                  if(text.Name.length !== 0){
                    setHeaderFolder((headerFolder) => {
                        return { ...headerFolder, Name: text.Name };
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
                defaultValue={text.Name}
                onChangeText={(value) =>
                  setText((text) => {
                    return { ...text, Name: value };
                  })
                }
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Input
                errorStyle={{ color: "white", fontWeight: "600" }}
                errorMessage="MÔ TẢ (TUỲ CHỌN)"
              />
            </View>
            <View style={{ height: "75%", justifyContent: "flex-end" }}>
              <Button
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
