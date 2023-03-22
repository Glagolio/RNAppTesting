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

// TODO merge crash simulator

const UserCard = ({ info }) => {
  const { userAvatar, name, email } = info;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        const user = await getItemFromAsyncStorage("users");
        if (user._id !== info._id) {
          Alert.alert("This user is already existing");
          return;
        }
        // await mergeItemInAsyncStorage("users", info);
        Alert.success("Done. User added successfully");
        console.log(info);
      }}
    >
      <Image
        source={
          userAvatar
            ? { uri: userAvatar }
            : require("../assets/accounttablogoactive.png")
        }
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text>{email}</Text>
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
    borderRadius: "50%",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
});

export default UserCard;
