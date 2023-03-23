import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getItemFromAsyncStorage,
  mergeItemInAsyncStorage,
  deleteItemFromAsyncStorage,
  storeItemToAsyncStorage,
} from "./AsyncStorageMethods";

const UserCard = ({ info }) => {
  const onPressUserCard = async (item) => {
    await storeItemToAsyncStorage("user", item);
    Alert.alert("Done");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPressUserCard(info);
      }}
    >
      <Image
        source={
          info.userAvatar
            ? { uri: info.userAvatar }
            : require("../assets/accounttablogoactive.png")
        }
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>{info.name}</Text>
        <Text>{info.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
});

export default UserCard;
