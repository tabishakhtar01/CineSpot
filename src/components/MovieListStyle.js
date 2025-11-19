import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FavoriteContext } from "../context/FavoriteContext";

const MovieListStyle = ({
  page,
  data,
  image,
  navigation,
  removeFavorite,
  addToFavorite,
}) => {
  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {page === "search" ? "Search" : "Favorite"}
      </Text>

      <FlatList
        style={{ marginBottom: 10, borderRadius: 10 }}
        data={data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => {
          const isFavorite = data?.some((fav) => fav.id === item.id);
          return (
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.favButton}
                onPress={() =>
                  navigation.navigate("MovieDetails", { movieId: item.id })
                }
              >
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={{
                      uri: `${image}${item?.poster_path}`,
                    }}
                    style={{
                      width: 110,
                      height: "100%",
                      borderRadius: 8,
                    }}
                  />
                </View>
                <View style={styles.summary}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.titleText}
                  >
                    {item?.title}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={16} color="#FFD700" />
                    <Text style={[styles.ratingText]}>
                      {Math.round(item?.vote_average * 10) / 10}
                    </Text>
                  </View>
                  <View style={styles.genresContainer}>
                    {item?.genres?.map((genre) => {
                      return (
                        <View style={styles.genreBody} key={genre.id}>
                          <Text style={styles.genreText}>{genre.name}</Text>
                        </View>
                      );
                    })}
                  </View>
                  {item?.release_date && (
                    <View style={styles.releaseDateContainer}>
                      <Text style={styles.releaseDate}>
                        {item?.release_date.split("-")[0]}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              {page === "favorite" && (
                <TouchableOpacity
                  onPress={() => {
                    isFavorite ? removeFavorite(item?.id) : addToFavorite(item);
                  }}
                  style={styles.favoriteButton}
                >
                  <AntDesign
                    name="heart"
                    size={24}
                    color={isFavorite ? "#8A2BE2" : "white"}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default MovieListStyle;

const styles = StyleSheet.create({
  favButton: {
    backgroundColor: "#0D0D0D",
    borderRadius: 8,
    flexDirection: "row",
    padding: 10,
  },
  titleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
    // flexShrink: 1,
  },
  summary: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 30,
    gap: 10,
  },
  ratingText: {
    color: "white",
    fontWeight: 800,
    fontSize: 16,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 7,
    alignItems: "center",
  },
  genreText: {
    color: "white",
    fontWeight: "bold",
  },
  genresContainer: {
    marginRight: 5,
    flexDirection: "row",
    gap: 15,
  },
  genreBody: {
    // backgroundColor: "black",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    // marginRight: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
  releaseDate: {
    color: "white",
    fontWeight: "bold",
  },
  releaseDateContainer: {
    // backgroundColor: "black",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});
