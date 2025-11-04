import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> CineSpot</Text>
      <Text style={styles.title2}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#f2f2f2"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        // value={email}
        // onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#f2f2f2"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        // value={pass}
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPass}>Forgot Password?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.newAcc}>Create new account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    gap: 40,
    paddingHorizontal: 35,
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 25,
  },
  title2: {
    color: "white",
    fontSize: 35,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: -20,
  },
  input: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontSize: 24,
    letterSpacing: 1.2,
    color: "#f2f2f2",
  },
  btnText: {
    color: "white",
    padding: 10,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  btn: {
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 12,
  },
  forgotPass: {
    color: "#f2f2f2",
    fontSize: 18,
  },
  newAcc: {
    color: "#f2f2f2",
    fontSize: 18,
    marginTop: -22,
  },
});
