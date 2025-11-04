import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Toaster = ({ message }) => {
  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

export default Toaster;

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#333",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    // width: "100%",
    alignItems: "center",
    right: 50,
    left: 50,
  },
  toastText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 600,
  },
});
