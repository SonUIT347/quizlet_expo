import { Text, View, StyleSheet, Image } from "react-native";
const Card = ({nameCard, quantity, img, nameAuthor, borderColor}) => {
  return (
    <View style={[styles.container,{ borderColor: borderColor ? '#A9B1F9' : "#2F3856"}]}>
      <View style={styles.marginContainer}>
        <View style={{marginBottom: 5}}>
          <Text style={[styles.text, { fontSize: 20, fontWeight: '600' }]}>{nameCard}</Text>
        </View>
        <Text style={[styles.text, {fontSize: 10}]}>{quantity} thuật ngữ</Text>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
        <Image
            style={styles.img}
            source={{
              uri: img
            }}
          />
          <View style={{justifyContent:'center', marginLeft: 10}}>
            <Text style={styles.text}>{nameAuthor}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Card;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F3856",
    borderRadius: 7,
    marginTop: 10,
    borderWidth: 2,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  marginContainer: {
   marginBottom: 10,
   marginTop: 10,
   marginLeft: 20,
   marginRight: 20,
  },
  img: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
});
