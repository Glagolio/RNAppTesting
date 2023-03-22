import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoadMoreBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name="download" size={36} color="black" />
      <Text>Load More</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default LoadMoreBtn;
