import { useState, useEffect } from "react";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


// const data = [
// ];

// const data_Folder = query(collection(db, "Folder"), where(documentId(), "==", FolderId))
// const getData_Folder = async () =>{
//   const data_Folders = await getDocs(data_Folder)
//   setdata = (data_Folders.docs.map((doc) =>({...doc.data(), id: doc.id}) )[0])
// }
// getData_Folder()



const dataCard = [

];

const FolderId = "jtOjniEeGlpuxHQg4txg"
const Folder = 
  [{
    // nameAuthor: "quiz",
    // img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
    // nameFolder: 'Son'
  }]

const useViewFolder = () => {
  const [dataFolder, setDataFolder] = useState([]);
  const [dataFolders, setDataFolders] = useState({});
  const [headerFolder, setHeaderFolder] = useState({Lesson_Id: []});
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


  // if (a == 12)
  // {
  //   for(let i = 0; i < headerFolder.Lesson_Id.lenght; i++)
  //     {
  //       const b = query(collection(db, "Lesson"), where(documentId(), "==", headerFolder.Lesson_Id[i]))
  //       const getDataFolders = async () => {
  //       const abc = await getDocs(b)
  //       setDataFolders((abc.docs.map((doc) => ({...doc.data(), id: doc.id}))[0]).push())
  //       }
  //       console.log(dataFolders)
  //       a++
  //       getDataFolders()
  //     }
  // }
  // useEffect (() => {
  //   for(let i = 0; i < headerFolder.Lesson_Id.lenght; i++)
  //     {
  //       const b = query(collection(db, "Lesson"), where(documentId(), "==", headerFolder.Lesson_Id[i]))
  //       const getDataFolders = async () => {
  //       const abc = await getDocs(b)
  //       setDataFolders((abc.docs.map((doc) => ({...doc.data(), id: doc.id}))[0]).push())
  //       }
  //       console.log(dataFolders)

  //       getDataFolders()
  //     }
  // }, )
  // console.log(headerFolder.Lesson_Id)
  // console.log(headerFolder.Lesson_Id)

  
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
