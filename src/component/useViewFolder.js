import { useState, useEffect } from "react";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const dataCard = [

];

const FolderId = "jtOjniEeGlpuxHQg4txg"// id folder đag mở

const useViewFolder = () => {
  const [dataFolder, setDataFolder] = useState([]);
  const [dataFolders, setDataFolders] = useState({});
  const [headerFolder, setHeaderFolder] = useState({Lesson_Id:[]});
  const [dataCards, setDataCards] = useState(dataCard);
  useEffect(() =>{
    const getDataCard = async () =>{
      const dataCards = await getDocs(collection(db, "Lesson"))
      setDataCards(dataCards.docs.map((doc) =>({...doc.data(), id: doc.id}) ))
    }
    getDataCard()

    const q = query(collection(db, "Folder"), where(documentId(), "==", FolderId))
    const getDataFolder = async () =>{
      const headerFolders = await getDocs(q)
      setHeaderFolder(headerFolders.docs.map((doc) =>({...doc.data(), id: doc.id}) )[0])
      
    }

    getDataFolder()

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
  };
};
export default useViewFolder;
