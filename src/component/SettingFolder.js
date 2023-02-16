import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "@rneui/themed";
const SettingFolder = ({ modalVisible, setModalVisible }) => {
  return (
    <BottomSheet isVisible={modalVisible.checkSetting} containerStyle={{backgroundColor:'#0A092D'}}>
      <View style={styles.container}>
        <View style={styles.borderText}>
          <TouchableOpacity style={styles.marginContainer}
           onPress={() =>
            setModalVisible((modalVisible) => {
              return { ...modalVisible, checkSetting: false, checkEdit: true};
            })
          }>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 10 }}>
                <MaterialIcons name="edit" size={20} color={"white"} />
              </View>
              <Text style={styles.text}>Sửa thư mục</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.borderText}>
          <TouchableOpacity style={styles.marginContainer}
          onPress={() =>
            setModalVisible((modalVisible) => {
              return { ...modalVisible, checkSetting: false, checkAddFolder: true};
            })
          }>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 10 }}>
                <MaterialIcons name="add" size={20} color={"white"} />
              </View>
              <Text style={styles.text}>Thêm học phần</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.borderText}>
          <TouchableOpacity
            style={{ height: 60 }}
            onPress={() =>
              setModalVisible((modalVisible) => {
                return { ...modalVisible, checkSetting: false };
              })
            }
          >
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.text, { textAlign: "center" }]}>Huỷ</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A092D",
  },
  marginContainer: {
    margin: 15,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  borderText: {
    borderTopWidth: 1,
    borderColor: "#5A627D",
  },
});
export default SettingFolder;
