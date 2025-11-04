import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import MainNavigation from "./src/navigation/MainNavigation";
import AuthProvider, { AuthContext } from "./src/context/AuthContext";
import { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import FavoriteProvider from "./src/context/FavoriteContext";

const RootNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </FavoriteProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
