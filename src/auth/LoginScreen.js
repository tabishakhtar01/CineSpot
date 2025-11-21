import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import Toaster from "../components/ToasterComponent";
import { useWindowDimensions } from "react-native";

const LoginScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { login } = useContext(AuthContext);
  const [allUserData, setAllUserData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const getUserData = async () => {
    const response = await AsyncStorage.getItem("users");
    const userData = response ? JSON.parse(response) : [];
    setAllUserData(userData);
  };

  const checkUserData = async () => {
    try {
      const isFormValid = email?.length > 0 && password?.length > 0;
      // console.log(allUserData);
      if (isFormValid) {
        const validateUser = allUserData?.find(
          (user) => user.email === email && user.password === password
        );
        if (validateUser) {
          const currentUser = {
            id: validateUser?.id,
            name: validateUser?.name,
            email: validateUser?.email,
            password: validateUser?.password,
          };
          // alert("Welcome");
          await AsyncStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
          );
          await AsyncStorage.setItem("isLoggedIn", "true");
          setToastMessage("LoggedIn Successfully");
          handleShowToast();
          setTimeout(() => {
            login();
          }, 1000);
        } else {
          setErrorMessage("Invalid credentials");
          // alert("Invalid credentials");
        }
      } else {
        setErrorMessage("Fields cant be empty");
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

  useEffect(() => {
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
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
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
        <TouchableOpacity style={styles.btn} onPress={checkUserData}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.newAcc}>Create new account</Text>
        </TouchableOpacity>
        {showToast && <Toaster message={toastMessage} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    marginTop: -22,
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginVertical: -29,
  },
});
