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
import { useIsFocused } from "@react-navigation/native";

import {
  getItemFromAsyncStorage,
  mergeItemInAsyncStorage,
  deleteItemFromAsyncStorage,
} from "./AsyncStorageMethods";

export default function Account({ navigation }) {
  /// main navigation usage
  // const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getItemFromAsyncStorage("user");
      setUserData(user);
    };
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });
    return unsubscribe;
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageView}>
          <Image
            source={
              userData.userAvatar
                ? { uri: userData.userAvatar }
                : require("../assets/accounttablogoactive.png")
            }
            style={styles.logo}
          />
          <Text style={styles.accountName}>
            {userData ? userData.name : "Cherry Chevapravatdumrong"}
          </Text>
          <Text style={styles.email}>
            {userData.email ? userData.email : "default@mail.com"}
          </Text>
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
    marginBottom: 15,
    borderRadius: 25,
  },
  accountName: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
  },
  email: {
    fontFamily: "Roboto-Regular",
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
