import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const response = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(response === "true");
    };
    checkUserStatus();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});
