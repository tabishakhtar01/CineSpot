import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { getMoviesData, getMoviesGenre, getMoviesByGenre } from "../api/tmdb";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import ListComponent from "../components/ListComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import MovieListStyle from "../components/MovieListStyle";
import { FavoriteContext } from "../context/FavoriteContext";

const Search = ({ navigation }) => {
  // const insets = useSafeAreaInsets();
  const TRENDING_ENDPOINT = "/trending/movie/day";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const { favorite, removeFavorite, addToFavorite } =
    useContext(FavoriteContext);

  const [movies, setMovies] = useState();
  const [trendingMovies, setTrendingMovies] = useState();
  const [genreList, setGenreList] = useState();
  const [selectedGenre, setSelectedGenre] = useState({
    id: "",
    name: "",
  });
  const [genre, setGenre] = useState();
  const [showAllGenre, setShowAllGenre] = useState(false);
  const [searchText, setSeacrhText] = useState("");
  const [searchedMovie, setSearchedMovie] = useState();

  const getMovies = async () => {
    try {
      const [trendingResponse, genreResponse] = await Promise.all([
        getMoviesData(TRENDING_ENDPOINT),
        getMoviesGenre(),
      ]);
      const trendingData = trendingResponse ? trendingResponse.results : [];
      const genreData = genreResponse ? genreResponse.genres : [];
      setTrendingMovies(trendingData);
      setGenreList(genreData);
    } catch (e) {
      console.error("error message", e);
    }
  };

  const getSelectedGenreDetails = async (name, id) => {
    setSelectedGenre({
      id,
      name,
    });
    const genreResponse = await getMoviesByGenre(id);
    const genreData = genreResponse ? genreResponse.results : [];
    setGenre(genreData);
  };

  const getSearchMovie = async () => {
    const response = await getMoviesData(
      "/search/movie",
      `&query=${searchText}`
    );
    const moviesData = response ? response.results : [];
    setSearchedMovie(moviesData);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) {
        getSearchMovie();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  if (!trendingMovies && !genreList) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <TextInput
          placeholderTextColor="gray"
          style={styles.search}
          placeholder="Search movies"
          value={searchText}
          onChangeText={setSeacrhText}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <Feather
          style={styles.searchIcon}
          name="search"
          size={22}
          color="gray"
        />
      </View>

      {searchText?.length === 0 ? (
        <ScrollView>
          {/*  */}
          <View style={{ marginTop: 20 }}>
            <ListComponent
              categoryHeading="Trending Now"
              categoryMovie={trendingMovies}
              imageUrl={IMAGE_BASE_URL}
              navigation={navigation}
            />
          </View>

          <View>
            <Text style={styles.genreTitle}>Browse by genre</Text>
            <View style={styles.genreContainer}>
              {genreList
                ?.slice(0, showAllGenre ? genreList?.length : 9)
                ?.map((genre) => (
                  <TouchableOpacity
                    onPress={() =>
                      getSelectedGenreDetails(genre?.name, genre?.id)
                    }
                    style={styles.genreButton}
                    key={genre.id}
                  >
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <Pressable onPress={() => setShowAllGenre(!showAllGenre)}>
              <Text style={styles.showAllText}>
                {showAllGenre ? "Hide" : "Show All Genre"}
              </Text>
            </Pressable>
          </View>

          {genre && (
            <View style={{ marginTop: 30 }}>
              <ListComponent
                categoryHeading={`${selectedGenre?.name} Movies`}
                categoryMovie={genre}
                imageUrl={IMAGE_BASE_URL}
                navigation={navigation}
              />
            </View>
          )}
        </ScrollView>
      ) : searchedMovie?.length > 0 ? (
        <MovieListStyle
          page="search"
          data={searchedMovie}
          image={IMAGE_BASE_URL}
          navigation={navigation}
          removeFavorite={removeFavorite}
          addToFavorite={addToFavorite}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.trendingText}>Search</Text>
          <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
            No result found!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    paddingHorizontal: 25,
  },
  search: {
    backgroundColor: "black",
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 16,
    marginTop: 20,
    color: "gray",
  },
  searchIcon: {
    position: "absolute",
    right: 20,
    bottom: 18,
  },
  genreTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 10,
  },
  genreText: {
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: 700,
  },
  genreButton: {
    // backgroundColor: "black",
    backgroundColor: "rgba(255,255,255,0.15)",

    borderRadius: 8,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  showAllText: {
    color: "white",
    fontWeight: 600,
    marginTop: 20,
  },
  searchTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 20,
    marginTop: 30,
  },
  movieTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 20,
    lineHeight: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
    alignItems: "center",
  },
  releaseDate: {
    color: "white",
    fontWeight: "bold",
  },
  releaseDateContainer: {
    backgroundColor: "#1F1F1F",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  trendingText: {
    color: "white",
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 10,
    marginTop: 25,
  },
});
