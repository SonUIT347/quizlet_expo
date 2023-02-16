import { useState } from "react";
const data = [
  {
    id: "T1",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji1",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T2",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji2",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T3",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji3",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T4",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji4",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
];
const dataCard = [
  {
    id: "T1",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji1",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T2",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji2",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T3",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji3",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T4",
    nameAuthor: "quiz4",
    quantity: 27,
    nameCard: "kanji4",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T5",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji5",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
  {
    id: "T6",
    nameAuthor: "quiz",
    quantity: 27,
    nameCard: "kanji6",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
  },
];
const useViewFolder = () => {
  const [headerFolder, setHeaderFolder] = useState({
    nameAuthor: "quiz",
    img: "https://chimgogo.com/wp-content/uploads/2021/05/Pug-Feature-e1620301801946.jpg",
    nameCard: 'Son'
  });
  const [dataFolder, setDataFolder] = useState(data);
  const [dataCards, setDataCards] = useState(dataCard);
  const [modalVisible, setModalVisible] = useState({
    checkAddFolder: false,
    checkSetting: false,
    checkEdit: false,
  });
  return {
    dataFolder,
    dataCards,
    modalVisible,
    setModalVisible,
    headerFolder, setHeaderFolder,
    setDataFolder,
  };
};
export default useViewFolder;
