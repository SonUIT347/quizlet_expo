import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { async } from '@firebase/util';
// import { ScrollView } from 'react-native-web';

const Avatar = 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-anime-1.jpg?ssl=1'


// Từ userID lưu trên Lesson liên kết ra username r gán nó bằng nameAuthor dùm t nha
const nameAuthor = 'SonTran'


export default function Personal({navigation,route}) {

  const [Lesson, setLesson] = useState([]);
  const [Folder, setFolder] = useState([]);
  // const [Content, setContent] = useState(Lesson);
  const [Page, setPage] = useState('HOC_PHAN');
  const userID = `${route.params.userID}`//này là userID của tài khoản đag login
  // console.log(userID)
  useEffect (() => {
    const pLesson = query(collection(db, 'Lesson'), where('userID', '==', userID )) // trong la user id
    const pFolder  = query(collection(db, 'Folder',), where('userID', '==', userID))// trong la user id
    getDataLesson = async () => {
      const DataLesson = await getDocs(pLesson)
      setLesson(DataLesson.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getDataFolder = async () => {
      const DataFolder = await getDocs(pFolder)
      setFolder(DataFolder.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getDataLesson()
    getDataFolder()
  }, [])
  console.log(Lesson)
  console.log(Folder)


  return (
    
    <View style={{height: '100%'}}>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#2F3856', justifyContent: 'space-between', marginTop: 10}}>
          <TouchableOpacity style={styles.ButtonSetting}><Text style={{textAlign: 'center'}}><Icon name="settings" size={30} color="white" style={styles.setting}/></Text></TouchableOpacity>
          <TouchableOpacity style={styles.ButtonSetting1}><Text style={styles.Upgrade}>Nâng Cấp</Text></TouchableOpacity>
        </View>

        <View style={{flex: 4, alignItems: 'center',  width: '100%', height: '100%', marginTop: 20}}>
          <Image source={{uri: Avatar}} style={styles.Img}/>
          <Text style={styles.Name}>{nameAuthor}</Text>

          <View style={{flex: 1, flexDirection: 'row', marginTop: -5, bottom: 0}}>
            <TouchableOpacity style={styles.ButtonContent1} 
            onPress ={()=>{setPage('HOC_PHAN')}}
            disabled={(Page === 'HOC_PHAN') ? true : false}>
              <Text style={styles.Title}>Các học phần</Text>
              {Page === 'HOC_PHAN' ? <View style={{position: 'absolute', height: 4, width: '100%', backgroundColor: '#546999', bottom: 0}}></View> : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonContent2}
            onPress ={()=>{setPage('FOLDER')}}
            disabled={Page === 'FOLDER' ? true : false}>
              <Text style={styles.Title}>Thư  mục</Text>
              {Page === 'FOLDER' ? <View style={{position: 'absolute', height: 4, width: '100%', backgroundColor: '#546999', bottom: 0}}></View> : null}
            </TouchableOpacity>
          </View>

        </View>
        {/* <Text>abc {} </Text> */}
        {/* <StatusBar style="auto" /> */}
      </View>
      
      <View style={{flex:7, backgroundColor: '#09092B'}}>
      {Page === 'FOLDER' ? 
      <ScrollView style={{marginTop: 10}}>
        {Folder.map((Contents, index) => {
          return(
            <View style = {{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10}}>
              <TouchableOpacity key={index} onPress={() => navigation.navigate("ViewFolder", {lessonId:Contents.id})}
              style={{backgroundColor: '#2F3856', borderRadius: 10}}>
                <View style = {{margin: 15,}}>
                  <Icon name='folder' size={25} color='white' style={{margin: 5}}></Icon>

                  <Text style={{color:'white', fontSize: 25, fontWeight: '700', margin: 5}}>{Contents.nameFolder}</Text>

                  <View style={{flexDirection: 'row', margin: 5}}>
                    <Image source={{uri: Avatar}} style={styles.Hpimg}/>
                    <Text style={{color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center', padding: 5, marginLeft: 5}}>{Contents.nameAuthor}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
  
        {Folder.length === 0 ?
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingTop: 240}}>
          <Icon name="folder" color="white" size={40} style={{textAlign: 'center'}}></Icon>
          <Text style={{fontSize: 22, textAlign: 'center', color: 'white', paddingTop: 5}}>Bạn chưa có thư mục nào.</Text>
        </View> 
        :
          null
        }
      </ScrollView> :
      <ScrollView style={{marginTop: 10}}>
        {Lesson.map((Contents, index) => {
          return(
          <View style = {{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10}}>
            <TouchableOpacity key={index} onPress={() => navigation.navigate("Option",{lessonId:Contents.id})}
            style={{backgroundColor: '#2F3856', borderRadius: 10}}>
              <View style = {{margin: 15,}}>
                <Text style={{color:'white', fontSize: 25, margin: 5, fontWeight: '700'}}>{Contents.Name}</Text>

                <Text style={{color:'white', fontSize: 18, margin: 5}}>{Contents.Count} Thuật ngữ</Text>

                <View style={{flexDirection: 'row', margin: 5}}>
                  <Image source={{uri: Avatar}} style={styles.Hpimg}/>
                  <Text style={{color:'white',fontSize: 18,fontWeight: '500', textAlign: 'center', padding: 5, marginLeft: 5}}>{nameAuthor}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          )
        })}
        {Lesson.length === 0 ?
          <View style={{flexDirection: 'column', justifyContent: 'center', paddingTop: 240}}>
            <Icon name="book-open" color="white" size={40} style={{textAlign: 'center'}}></Icon>
            <Text style={{fontSize: 22, textAlign: 'center', color: 'white', paddingTop: 5}}>Bạn chưa tạo học phần nào.</Text>
          </View> 
          :
            null
        }

      </ScrollView>}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#2F3856',
    height: '32%',
    // alignContent: 'center' ,
  },
  ButtonSetting: {
    // color: 'red',
    marginTop: 30,
    marginLeft: 15,
    height: 40,
    width:  40,
    backgroundColor: '#2F3856',
    justifyContent: 'center',
    // padding: '10%',
  },
  Upgrade: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign:'center',

  },
  ButtonSetting1: {
    // color: 'green',
    height: 40,
    width:  110,
    marginTop: 30,
    marginRight: 15,
    justifyContent: 'center',
    // alignContent: 'center' ,
    backgroundColor: '#2F3856',
  },
  Img: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'green',
    
    // marginTop: -15,
    // alignContent: 'center'
    // textAlign: 'center',
  },
  Name: {
    marginTop: 5,
    fontSize: 25,
    color: 'white',
    flex: 1,
  },
  ButtonContent1: {
    width: '50%',
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  ButtonContent2: {
    width: '50%',
    // backgroundColor: 'blue',
    justifyContent: 'center',

  },
  Title: {
    fontSize: 23,
    textAlign: 'center',
    color: 'white',
  },
  Hpimg: {
    height: 30,
    width: 30,
    borderRadius: 20,
  }
});



{/* <TouchableOpacity key={index}
 style={{backgroundColor: 'green', margin: 20, marginBottom: 0, borderRadius: 10, padding: 15, paddingTop: 10}}>
  <Text style={{color:'white', fontSize: 20, fontWeight: '700'}}>{HOCPHANS.Name}</Text>
  <Text style={{color:'white'}}>{HOCPHANS.SL} Thuật ngữ</Text>
  <View style={{flexDirection: 'row', paddingTop: 10}}>
  <Image source={HOCPHANS.Avt} style={styles.Hpimg}/>
  <Text style={{color:'white', backgroundColor: 'red', textAlign: 'center', padding: 5, marginLeft: 5}}>{HOCPHANS.UserName}</Text>
  </View>
</TouchableOpacity> */}