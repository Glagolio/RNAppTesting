import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
// import { useNavigation, useIsFocused } from "@react-navigation/native";
import UserCard from "./UserCard";
import LoadMoreBtn from "./LoadMoreBtn";

export default function Homepage({ userData, setUserData }) {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://moduleblocks.net/testing/Users.json")
      .then((res) => res.json())
      .then((allUsers) => {
        setAllUsers(allUsers);
        setUsers(allUsers.slice(0, 8));
      })
      .catch((err) => console.error(err.message));
  }, []);

  const onPressLoadMoreBtn = (currentPage) => {
    const nextUsersIndex = currentPage * 8;
    const nextUsers = allUsers.slice(nextUsersIndex, nextUsersIndex + 8);
    setUsers((prevState) => [...prevState, ...nextUsers]);
    setCurrentPage((prevState) => prevState + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.homeView}>
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <UserCard info={item} />}
            ListFooterComponent={
              <LoadMoreBtn
                onPress={() => {
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
