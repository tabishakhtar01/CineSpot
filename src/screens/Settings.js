import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toaster from "../components/ToasterComponent";
import { useWindowDimensions } from "react-native";

const Settings = ({ route, navigation }) => {
  const { width } = useWindowDimensions();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [currentUser, setCurrentuser] = useState();
  const [allUser, setAllUser] = useState();
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [toastMessage, setToastMessage] = useState();

  const { user } = route?.params;

  const fetchUserDetails = async () => {
    const userResponse = await AsyncStorage.getItem("users");
    const userData = userResponse ? JSON.parse(userResponse) : [];
    // console.log(user);
    setAllUser(userData);
    const currentUser = userData.find((currUser) => currUser.id === user?.id);
    setCurrentuser(currentUser);
  };

  const changeUserPassword = async () => {
    try {
      const isFormValid = oldPassword?.length > 0 && newPassword?.length > 0;
      if (isFormValid) {
        if (oldPassword === currentUser?.password) {
          if (oldPassword !== newPassword) {
            const newPass = allUser?.map((user) => {
              if (user?.id === currentUser?.id) {
                return { ...user, password: newPassword };
              }
              return user;
            });
            const currUser = {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              password: newPassword,
            };
            await AsyncStorage.setItem("users", JSON.stringify(newPass));
            await AsyncStorage.setItem("currentUser", JSON.stringify(currUser));
            handleShowToast();
            setToastMessage("Password Changed");
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          } else {
            setErrorMessage("New pass is same as old");
          }
        } else {
          setErrorMessage("Invalid credentials");
        }
      } else {
        setErrorMessage("Fields cant be empty");
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
    fetchUserDetails();
  }, []);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.viewContainer}>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingHorizontal: width > 768 ? 40 : 25,
          },
        ]}
        edges={["top"]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={{ position: "absolute", zIndex: 100, left: 20, top: 80 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </Pressable>

        <Text style={styles.changePasswordText}>Change your password</Text>

        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          placeholder="Enter your old password"
          value={oldPassword}
          onChangeText={setOldPassword}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry
        />

        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          placeholder="Enter your new password"
          value={newPassword}
          onChangeText={setNewPassword}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry
        />

        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        <TouchableOpacity
          onPress={() => changeUserPassword()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        {showToast && <Toaster message={toastMessage} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#0b0f14",
  //   paddingHorizontal: 25,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: 10,
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b0f14",
    gap: 10,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  changePasswordText: {
    color: "white",
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 50,
  },
  input: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    fontSize: 18,
    fontWeight: 500,
    color: "gray",
    marginBottom: 10,
    outlineStyle: "none",
  },
  button: {
    backgroundColor: "#8A2BE2",
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    padding: 10,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginVertical: -13,
  },
});
