import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWindowDimensions } from "react-native";

const Profile = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const getUserDetails = async () => {
    const userResponse = await AsyncStorage.getItem("currentUser");
    const userData = userResponse ? JSON.parse(userResponse) : [];
    setUser({
      id: userData?.id,
      name: userData?.name,
      email: userData?.email,
      password: userData?.password,
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.viewContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: width > 768 ? 40 : 25,
          },
        ]}
      >
        <Pressable
          style={{ position: "absolute", zIndex: 100, left: 15, top: 75 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </Pressable>

        <View style={styles.profile}>
          <EvilIcons name="user" size={150} color="gray" />
          <Text style={styles.profileText}>{user?.name}</Text>
          <Text style={styles.name}>{user?.email}</Text>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate("Favorite")}
          >
            <Text style={styles.settingText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Watchlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings", { user: user })}
            style={styles.settingButton}
          >
            <Text style={styles.settingText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0b0f14",
    gap: 40,
    width: "100%",
    maxWidth: 500,
    // alignSelf: "center",
  },
  profile: {
    // flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  profileText: {
    color: "white",
    marginTop: 25,
    fontSize: 30,
    fontWeight: 700,
  },
  name: {
    color: "white",
    marginTop: 10,
    fontSize: 24,
    fontWeight: 400,
  },
  settingText: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
  },
  settingsContainer: {
    gap: 30,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#8A2BE2",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    paddingVertical: 15,
  },
  settingButton: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 15,
  },
});
