import AntDesign from "react-native-vector-icons/AntDesign";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
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
import { useEffect } from "react";
const ViewFolder = () => {
  const {
    dataFolder,
    dataFolders,
    modalVisible,
    setModalVisible,
    dataCards,
    headerFolder,
    setHeaderFolder, setDataFolder, setDataFolders,
  } = useViewFolder();

  useEffect (() => {
      // console.log(headerFolder.Lesson_Id.length)
      for(let i = 0; i < headerFolder.Lesson_Id.length; i++)
        {
          const b = query(collection(db, "Lesson"), where(documentId(), "==", headerFolder.Lesson_Id[i]))
          const getDataFolders = async () => {
          const abc = await getDocs(b)
          setDataFolders((abc.docs.map((doc) => ({...doc.data(), id: doc.id}))).push())
          }
          // console.log(dataFolders)

  
          getDataFolders()
        }
    },[headerFolder])
    // console.log(headerFolder)

  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
  {/* {console.log(headerFolder)} */}
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
            {headerFolder.nameFolder}
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
            {/* {console.log(headerFolder)} */}
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
        {/* {console.log(headerFolder)} */}
        {dataFolder.map((dataFl, index) => {
          return (
            <TouchableOpacity key={index}>
              <Card
                Name={dataFl.Name}
               Count={dataFl.Count}
                img={dataFl.img}
                nameAuthor={dataFl.nameAuthor}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <AddFolder
        dataFolder={dataFolder}
        headerFolder={headerFolder}
        setHeaderFolder={setHeaderFolder}
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
