import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toaster from "../components/ToasterComponent";
import { useWindowDimensions } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);

  // email validation
  const validateEmailId = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(text));
  };

  console.log({ isValid });

  const addUserData = async () => {
    const isFormValid = name?.length > 0 && isValid && password?.length > 4;
    try {
      if (isFormValid) {
        const user = {
          id: new Date().getTime().toString(),
          name,
          email,
          password,
        };
        // console.log("user", user);
        const response = await AsyncStorage.getItem("users");
        const userData = response ? await JSON.parse(response) : [];
        const isUserExist = userData?.some((user) => user?.email === email);
        if (!isUserExist) {
          userData.push(user);
          await AsyncStorage.setItem("users", JSON.stringify(userData));
          // alert("User Saved");
          setToastMessage("User Created");
          handleShowToast();
          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000);
        } else {
          setErrorMessage("User exists");
          // alert("User exist");
        }
      } else {
        // setErrorMessage(
        //   !isValid
        //     ? "Please enter a valid email address"
        //     : "Fields cant be empty"
        // );
        setErrorMessage(
          !isValid
            ? "Please enter a valid email address"
            : password.length < 5
            ? "Password must be at least 5 characters long"
            : "Fields cant be empty"
        );
        // alert("Fields cant be empty");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } catch (err) {
      console.error("error message", err);
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const clearAllUsers = async () => {
    try {
      await AsyncStorage.removeItem("users");
      console.log("All users deleted!");
    } catch (e) {
      console.error("Error deleting users:", e);
    }
  };
  useEffect(() => {
    // clearAllUsers();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const response = await AsyncStorage.getItem("users");
      const users = JSON.parse(response) || [];
    };
    getUserData();
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.viewContainer}>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingHorizontal: width > 768 ? 40 : 35,
          },
        ]}
      >
        <Text style={styles.title}> CineSpot</Text>
        <Text style={styles.title2}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
          autoComplete="off"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          // onChangeText={setEmail}
          onChangeText={(text) => validateEmailId(text)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        <TouchableOpacity onPress={addUserData} style={styles.btn}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        {/* <Text style={styles.forgotPass}>Forgot Password?</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.newAcc}>Already have an account? Login</Text>
        </TouchableOpacity>
        {showToast && <Toaster message={toastMessage} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    gap: 40,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
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
    marginBottom: -10,
  },
  input: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontSize: 24,
    letterSpacing: 1.2,
    color: "#f2f2f2",
    outlineStyle: "none",
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
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginVertical: -23,
  },
});
