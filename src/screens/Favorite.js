import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FavoriteContext } from "../context/FavoriteContext";
import MovieListStyle from "../components/MovieListStyle";

const Favorite = ({ navigation }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const { favorite, removeFavorite, addToFavorite } =
    useContext(FavoriteContext);
  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
      showsVerticalScrollIndicator={false}
    >
      {favorite.length > 0 ? (
        <MovieListStyle
          page="favorite"
          data={favorite}
          image={IMAGE_BASE_URL}
          navigation={navigation}
          removeFavorite={removeFavorite}
          addToFavorite={addToFavorite}
        />
      ) : (
        <NoFavoriteScreen navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const NoFavoriteScreen = ({ navigation }) => {
  return (
    <View style={styles.noFavScreen}>
      <Text style={styles.favoriteText}>Favorites</Text>
      <AntDesign name="heart" size={150} color="#8A2BE2" />
      <Text style={styles.favoriteText}>No favorites yet</Text>
      <Text style={styles.addingText}>Start adding movies you love</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Browse Movies</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#0b0f14",
  },
  noFavScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  favoriteText: {
    color: "white",
    fontWeight: 700,
    fontSize: 38,
    marginBottom: 10,
  },
  addingText: {
    color: "gray",
    fontSize: 18,
    fontWeight: 500,
    marginTop: -30,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: 600,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: "#8A2BE2",
    borderRadius: 10,
    marginTop: 30,
  },
});
