import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logoText}>CineSpot</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "700",
  },
});

export default SplashScreen;
