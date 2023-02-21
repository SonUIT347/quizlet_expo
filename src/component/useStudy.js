import { useEffect, useState } from "react";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LessonID = 'FFuNQeomrVf4ov8TIuIL'// id cua lesson dag test


const useStudy = () => {
  
const [arr, setArr] = useState([])
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

useEffect( async ()=>{
  // const LessonID = await AsyncStorage.getItem("lessonId")
  const dbArr = query(collection(db, 'Lesson'), where(documentId(), '==', LessonID))
  const getDataArr = async () =>{
    const DataArr = await getDocs(dbArr)
    setArr(DataArr.docs.map((doc) =>({...doc.data(), index: doc.id}))[0].Card)
    setDatas(shuffle(DataArr.docs.map((doc) =>({...doc.data(), index: doc.id}))[0].Card))
    setGetInf({ansLenght: (DataArr.docs.map((doc) =>({...doc.data(), index: doc.id}))[0].Card).length, check: true, index: 0})
  }
  getDataArr()
}, [])
// console.log(arr)
  
  const [result, setResult] = useState({ correct: 0, wrong: 0 });
  const [modalVisible, setModalVisible] = useState(true);
  const [datas, setDatas] = useState(shuffle(arr));
  const [tests, setTests] = useState([]);
  const [getInf, setGetInf] = useState({
    ansLenght: 2,
    check: true,
    index: 0,
  });
  console.log(datas)
  // console.log(tests, "test");//xem test
  const createMultipleChoice = (type1, type2, type) => {
    // console.log(type2)
    let tempArr = shuffle(arr).filter((item) => {
      return type !== 1 ? item.Term !== type2 : item.Define !== type2;
    });
    let randomAns =
      datas.lenght >= 4
        ? Math.floor(Math.random() * 4) + 1
        : datas.lenght === 3
        ? Math.floor(Math.random() * 3) + 1
        : Math.floor(Math.random() * 2) + 1;

    switch (randomAns) {
      case 1:
        setTests((tests) => [
          ...tests,
          {
            question: type1,
            ans1: type2,
            ans2: type === 1 ? tempArr[0]?.Define : tempArr[0]?.Term,
            ans3: type === 1 ? tempArr[1]?.Define : tempArr[1]?.Term,
            ans4: type === 1 ? tempArr[2]?.Define : tempArr[2]?.Term,
            ans: type2,
          },
        ]);
        break;
      case 2:
        setTests((tests) => [
          ...tests,
          {
            question: type1,
            ans1: type === 1 ? tempArr[0]?.Define : tempArr[0]?.Term,
            ans2: type2,
            ans3: type === 1 ? tempArr[1]?.Define : tempArr[1]?.Term,
            ans4: type === 1 ? tempArr[2]?.Define : tempArr[2]?.Term,
            ans: type2,
          },
        ]);
        break;
      case 3:
        setTests((tests) => [
          ...tests,
          {
            question: type1,
            ans1: type === 1 ? tempArr[0]?.Define : tempArr[0]?.Term,
            ans2: type === 1 ? tempArr[1]?.Define : tempArr[1]?.Term,
            ans3: type2,
            ans4: type === 1 ? tempArr[2]?.Define : tempArr[2]?.Term,
            ans: type2,
          },
        ]);
        break;
      case 4:
        setTests((tests) => [
          ...tests,
          {
            question: type1,
            ans1: type === 1 ? tempArr[0]?.Define : tempArr[0]?.Term,
            ans2: type === 1 ? tempArr[1]?.Define : tempArr[1]?.Term,
            ans3: type === 1 ? tempArr[2]?.Define : tempArr[2]?.Term,
            ans4: type2,
            ans: type2,
          },
        ]);
        break;
    }
  };
  useEffect(() => {
    
    if (!modalVisible) {
      let type = {
        mod: datas.length % 2,
        div: (datas.length - (datas.length % 2)) / 2,
      };
      console.log(datas)
      if (datas.length === 3) {
        for (let i = 0; i < 2; i++)
          createMultipleChoice(datas[i].Term, datas[i].Define, 1);
        for (let i = 2; i < 3; i++)
          createMultipleChoice(datas[i].Define, datas[i].Term, 2);
      } else if (datas.length === 2) {
        for (let i = 0; i < 1; i++)
          createMultipleChoice(datas[i].Term, datas[i].Define, 1);
        for (let i = 1; i < 2; i++)
          createMultipleChoice(datas[i].Define, datas[i].Term, 2);
      } else {
        if (type.mod === 0) {
          for (let i = 0; i < type.div; i++)
            createMultipleChoice(datas[i].Term, datas[i].Define, 1);

          for (let i = type.div; i < datas.length; i++)
            createMultipleChoice(datas[i].Define, datas[i].Term, 2);
        } else {
          for (let i = 0; i < type.div + type.mod; i++)
            createMultipleChoice(datas[i].Term, datas[i].Define, 1);

          for (let i = type.div + type.mod; i < datas.length; i++)
            createMultipleChoice(datas[i].Define, datas[i].Term, 2);
        }
      }
    }
  }, [modalVisible]);
  return [
    datas,
    tests,
    modalVisible,
    setModalVisible,
    getInf,
    setGetInf,
    setDatas,
    shuffle,
    result,
    setResult,
  ];
};
export default useStudy;
