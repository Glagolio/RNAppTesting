import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  getItemFromAsyncStorage,
  mergeItemInAsyncStorage,
  deleteItemFromAsyncStorage,
} from "./AsyncStorageMethods";

export default function Account({ userData, setUserData }) {
  /// main navigation usage
  const navigation = useNavigation();
  //const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getItem = async () => {
      const data = await getItemFromAsyncStorage("users");
      console.log(data);
    };
    getItem();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageView}>
          <Image
            source={require("../assets/accounttablogoactive.png")}
            style={styles.logo}
          />
          <Text style={styles.accountName}>Cherry Chevapravatdumrong</Text>
          <TouchableOpacity
            style={styles.dontTouchBtn}
            onPress={() => {
              Alert.alert("I SAY: DON'T TOUCH!!!");
            }}
          >
            <Text style={styles.textBtn}>DON'T TOUCH</Text>
            <MaterialIcons name="do-not-touch" size={62} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 0,
    paddingTop: 44,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    display: "block",
    marginBottom: 15,
  },
  accountName: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 65,
  },
  dontTouchBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
  textBtn: {
    marginBottom: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "white",
  },
});
