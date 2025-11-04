import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import MovieDetails from "../screens/MovieDetails";
import VideoPlayer from "../screens/VideoPlayer";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Favorite from "../screens/Favorite";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeNav" component={HomeScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
};

const SearchNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
};

const FavoriteNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="FavoriteScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FavoriteScreen" component={Favorite} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

const ProfileNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          backgroundColor: "#0D0D0D",
          // backgroundColor: "white",
          height: Platform.OS === "android" ? 63 : 70,
          borderTopWidth: 0,
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={22} color={color} />
          ),

          tabBarIconStyle: {
            marginTop: 5,
            marginBottom: 0,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNav}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={22} color={color} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
            marginBottom: 0,
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteNav}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" size={22} color={color} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
            marginBottom: 0,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
            marginBottom: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
