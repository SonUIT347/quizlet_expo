import { useState, useEffect } from "react";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const data = [
// ];

// const data_Folder = query(collection(db, "Folder"), where(documentId(), "==", FolderId))
// const getData_Folder = async () =>{
//   const data_Folders = await getDocs(data_Folder)
//   setdata = (data_Folders.docs.map((doc) =>({...doc.data(), id: doc.id}) )[0])
// }
// getData_Folder()
let temp = 0;

const dataCard = [

];

const Folder = 
  [{
    // nameAuthor: "quiz",
    // img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
    // nameFolder: 'Son'
  }]

const useViewFolder = () => {
  const [dataFolder, setDataFolder] = useState([]);
  const [dataFolders, setDataFolders] = useState({});
  const [headerFolder, setHeaderFolder] = useState({Lesson_Id:[]});
  const [dataCards, setDataCards] = useState(dataCard);
  useEffect(async() =>{
    const getDataCard = async () =>{
      const dataCards = await getDocs(collection(db, "Lesson"))
      setDataCards(dataCards.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
    }
    getDataCard()
    const FolderID = await AsyncStorage.getItem("FolderID")
    const q = query(collection(db, "Folder"), where(documentId(), "==", FolderID))
    const getDataFolder = async () =>{
      const headerFolders = await getDocs(q)
      setHeaderFolder(headerFolders.docs.map((doc) =>({...doc.data(), id: doc.id}) )[0])
      
      // setDataFolders(headerFolders.docs.map((doc) =>({...doc.data(), id: doc.id}))[0])
    }

    getDataFolder()

    // const b = query(collection(db, "Lesson"), where(documentId(), "==", headerFolder.Lesson_Id[0]))
    // const getTest = async () => {
    //   const abc = await getDocs(b)
    //   setDataFolders(abc.docs.map((doc) =>({...doc.data(), id: doc.id})))
    // }
    // getTest()

  },[])

  useEffect (() => {
    const arr=['1'];
      for (let i = 0; i < headerFolder.Lesson_Id.length; i++)
      {
        arr[i+1] = headerFolder.Lesson_Id[i];
      }

      const b = query(collection(db, "Lesson"), where(documentId(), 'in', arr))
      const getDataFolders = async () => {
      const abc = await getDocs(b)
      setDataFolder((abc.docs.map((doc) => ({...doc.data(), id: doc.id}))))
      }
      getDataFolders()
  },[headerFolder])

  // console.log(dataFolder)

  
  const [modalVisible, setModalVisible] = useState({
    checkAddFolder: false,
    checkSetting: false,
    checkEdit: false,
  });
  return {
    dataFolder,
    dataFolders,
    dataCards,
    modalVisible,
    setModalVisible,
    headerFolder, setHeaderFolder,
    setDataFolder,
    setDataFolders,
    temp,
  };
};
export default useViewFolder;
