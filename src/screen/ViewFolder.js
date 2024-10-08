import AntDesign from "react-native-vector-icons/AntDesign";
import { collection, getDocs, query, where, documentId,  } from "firebase/firestore";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../component/Card";
import useViewFolder from "../component/useViewFolder";
import AddFolder from "../component/AddFolder";
import SettingFolder from "../component/SettingFolder";
import EditFolder from "../component/EditFolder";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { async } from "@firebase/util";

const Avatar = 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-anime-1.jpg?ssl=1'
const ViewFolder = ({navigation}) => {
  const route = useRoute()
  console.log(route.params.FolderID)
  console.log(route.params.userName)
  const {
    dataFolder,
    dataFolders,
    modalVisible,
    setModalVisible,
    dataCards,
    // userName,
    headerFolder,
    setHeaderFolder, setDataFolder, setDataFolders,
  } = useViewFolder();

  useEffect(() =>{
    AsyncStorage.setItem("FolderID", `${route.params.FolderID}`)
    AsyncStorage.setItem("userName", `${route.params.userName}`)
  },[])
    // console.log(headerFolder)

  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
  {/* {console.log(headerFolder)} */}
        <View style={styles.header}>
          <TouchableOpacity style={{ width: "70%" }}onPress={() => navigation.goBack()} >
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
          <View style={{ justifyContent: "center"}}>
            {/* <Text style={styles.text}>{route.params.userName}</Text> */}
            <View style={{flexDirection: 'row'}}>
              <Image source={{uri: Avatar}} style={{ height: 30, width: 30, borderRadius: 20,}}/>
              <Text style={[styles.text, {color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center', padding: 5, marginLeft: 5}]}>{route.params.userName}</Text>
            </View>
            {/* {console.log(headerFolder)} */}
          </View>
        </View>
        <Button
          title="Học thư mục này"
          buttonStyle={{
            backgroundColor: "#4654F6",
            borderRadius: 10,
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
        // userName={route.params.userName}
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
        FolderId={route.params.FolderID}
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
    marginTop: 40,
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
