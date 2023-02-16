import AntDesign from "react-native-vector-icons/AntDesign";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import Card from "../component/Card";
import useViewFolder from "../component/useViewFolder";
import AddFolder from "../component/AddFolder";
import SettingFolder from "../component/SettingFolder";
import EditFolder from "../component/EditFolder";
const ViewFolder = () => {
  const {
    dataFolder,
    modalVisible,
    setModalVisible,
    dataCards,
    headerFolder,
    setHeaderFolder, setDataFolder,
  } = useViewFolder();
  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={{ width: "70%" }}>
            <AntDesign name="arrowleft" color="white" size={30} />
          </TouchableOpacity>
          <View
            style={{
              width: "30%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                setModalVisible((modalVisible) => {
                  return { ...modalVisible, checkAddFolder: true };
                })
              }
            >
              <AntDesign name="plus" color="white" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setModalVisible((modalVisible) => {
                  return { ...modalVisible, checkSetting: true };
                })
              }
            >
              <AntDesign name="ellipsis1" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 50, marginBottom: 10 }}>
          <Text style={[styles.text, { fontSize: 30, fontWeight: "700" }]}>
            {headerFolder.nameCard}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={{ marginRight: 30, justifyContent: "center" }}>
            <Text style={[styles.text]}>{dataFolder.length} học phần</Text>
          </View>
          <Image
            style={styles.img}
            source={{
              uri: headerFolder.img,
            }}
          />
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={styles.text}>{headerFolder.nameAuthor}</Text>
          </View>
        </View>
        <Button
          title="Học thư mục này"
          buttonStyle={{
            backgroundColor: "#4654F6",
            borderRadius: 7,
          }}
          containerStyle={{
            marginTop: 30,
            marginBottom: 30,
          }}
        />
      </View>
      <ScrollView style={{ marginLeft: 30, marginRight: 30 }}>
        {dataFolder.map((dataFl, index) => {
          return (
            <TouchableOpacity key={index}>
              <Card
                nameCard={dataFl.nameCard}
                quantity={dataFl.quantity}
                img={dataFl.img}
                nameAuthor={dataFl.nameAuthor}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <AddFolder
        dataFolder={dataFolder}
        dataCards={dataCards}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setDataFolder={setDataFolder}
      />
      <SettingFolder
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <EditFolder
        headerFolder={headerFolder}
        setHeaderFolder={setHeaderFolder}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A092D",
  },
  marginContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
  },
});
export default ViewFolder;
