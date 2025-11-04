import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FavoriteContext } from "../context/FavoriteContext";
import { LinearGradient } from "expo-linear-gradient";

const ListComponent = ({
  categoryHeading,
  categoryMovie,
  imageUrl,
  navigation,
  isHorizontal = true,
  columnCount = 0,
}) => {
  const { favorite, addToFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const [toggleFavorite, setToggleIsFavorite] = useState(false);
  return (
    <View style={styles.collection}>
      <View style={styles.trending}>
        <Text style={styles.trendingText}>{categoryHeading}</Text>
        <FlatList
          data={categoryMovie}
          numColumns={columnCount}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          horizontal={isHorizontal}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 8 }} />
          )}
          columnWrapperStyle={
            !isHorizontal && columnCount > 1 ? styles.column : null
          }
          renderItem={({ item }) => {
            const isFavorite = favorite?.some((fav) => fav.id === item.id);
            return (
              <View>
                <TouchableOpacity
                  style={styles.list}
                  onPress={() =>
                    navigation.navigate("MovieDetails", { movieId: item.id })
                  }
                >
                  <Image
                    source={{ uri: `${imageUrl}${item?.poster_path}` }}
                    style={{
                      width: 130,
                      height: 200,
                      borderRadius: 8,
                      marginBottom: 30,
                    }}
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(11,15,20,0.9)", "#0b0f14"]}
                    style={styles.gradient}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    isFavorite ? removeFavorite(item?.id) : addToFavorite(item);
                    // setToggleIsFavorite(isFavorite);
                  }}
                  style={styles.favoriteButton}
                >
                  <AntDesign
                    name="heart"
                    size={24}
                    color={isFavorite ? "#8A2BE2" : "white"}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  trendingText: {
    color: "white",
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 10,
  },
  column: {
    justifyContent: "space-evenly",
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    // backgroundColor: "white",
  },
  list: {
    position: "relative",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
  },
});
