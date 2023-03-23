import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import UserCard from "./UserCard";
import LoadMoreBtn from "./LoadMoreBtn";

import {
  getItemFromAsyncStorage,
  mergeItemInAsyncStorage,
  deleteItemFromAsyncStorage,
  storeItemToAsyncStorage,
} from "./AsyncStorageMethods";

export default function Homepage({ userData, setUserData }) {
  /// main navigation usage
  const navigation = useNavigation();
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("https://moduleblocks.net/testing/Users.json")
      .then((res) => res.json())
      .then((allUsers) => {
        setAllUsers(allUsers);
        setUsers(allUsers.slice(0, 8));
        setCurrentPage(1);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const onPressLoadMoreBtn = (currentPage) => {
    const nextUsersIndex = currentPage + 7;
    const nextUsers = allUsers.slice(nextUsersIndex, nextUsersIndex + 8);
    setUsers((prevState) => [...prevState, ...nextUsers]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.homeView}>
          {/* <Text style={styles.text}>MB testing</Text> */}
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <UserCard info={item} />}
            ListFooterComponent={
              <LoadMoreBtn
                onPress={async () => {
                  onPressLoadMoreBtn(currentPage);
                }}
              />
            }
            ListFooterComponentStyle={
              users.length >= allUsers.length
                ? { display: "none" }
                : styles.loadMoreBtn
            }
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 0,
    paddingLeft: 15,
    paddingTop: 44,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  homeView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Roboto-Bold",
  },
  loadMoreBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
  },
});
