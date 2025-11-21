import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getMoviesData,
  getMovieVideos,
  getRecommendedMoviesData,
} from "../api/tmdb";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import ListComponent from "../components/ListComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoriteContext } from "../context/FavoriteContext";
import Toaster from "../components/ToasterComponent";
import { LinearGradient } from "expo-linear-gradient";

const MovieDetails = ({ route, navigation }) => {
  const { addToFavorite, favorite, removeFavorite } =
    useContext(FavoriteContext);
  const [movieDetails, setMovieDetails] = useState();
  const [castDetails, setCastDetails] = useState();
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [recommendedDetails, setRecommendedDetails] = useState();
  const [videoId, setVideoId] = useState();
  const { movieId } = route.params;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const scrollRef = React.useRef();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const source1 = `https://autoembed.co/movie/tmdb/${movieId}`;
  const source2 = `https://player.embed-api.stream/?id=${movieId}&type=movie`;

  const getMovieDetails = async () => {
    try {
      const [response, castResponse, recommendedResponse, videoPlayerId] =
        await Promise.all([
          getMoviesData(`/movie/${movieId}`),
          getMoviesData(`/movie/${movieId}/credits`),
          getRecommendedMoviesData(movieId),
          getMovieVideos(movieId),
        ]);
      const castData = castResponse ? castResponse.cast : [];
      const movieData = response ? response : [];
      const recommendedData = recommendedResponse
        ? recommendedResponse.results
        : [];
      setMovieDetails(movieData);
      setCastDetails(castData);
      setRecommendedDetails(recommendedData);
      setVideoId(videoPlayerId?.results[0]?.key);
    } catch (err) {
      console.error("error message", err);
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    getMovieDetails();
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [route]);

  useEffect(() => {
    setIsFavorite(favorite.some((fav) => fav.id === movieDetails?.id));
  }, [movieDetails, favorite]);

  if (!movieDetails) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator color="white" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView ref={scrollRef}>
        <View style={styles.heroContainer}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </Pressable>

          <Image
            source={{
              uri: `${IMAGE_BASE_URL}${movieDetails?.backdrop_path}`,
            }}
            style={styles.heroImage}
          />

          <LinearGradient
            colors={["transparent", "rgba(11,15,20,0.9)", "#0b0f14"]}
            style={styles.gradient}
          />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movieDetails?.title}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={20} color="#FFD700" />
                <Text style={[styles.ratingText]}>
                  {Math.round(movieDetails?.vote_average * 10) / 10}
                </Text>
              </View>
              <View style={styles.genresContainer}>
                {movieDetails?.genres?.map((genre) => {
                  return (
                    <View style={styles.genreBody} key={genre.id}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.releaseDateContainer}>
                <Text style={styles.releaseDate}>
                  {movieDetails?.release_date.split("-")[0]}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.secondaryContainer}>
          <View>
            <Text style={styles.overviewHead}>Overview</Text>
            <Text
              numberOfLines={isReadMore ? 0 : 4}
              style={styles.overviewText}
            >
              {movieDetails?.overview}
            </Text>
            <Pressable onPress={() => setIsReadMore(!isReadMore)}>
              <Text style={styles.readMoreText}>
                {isReadMore ? "Hide Details" : "Read More"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("MoviePlayer", { videoId: videoId })
              }
            >
              <Text style={styles.buttonText}>Watch Trailer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (isFavorite) {
                  removeFavorite(movieDetails?.id);
                  handleShowToast();
                  setToastMessage("Removed from Favorite");
                } else {
                  addToFavorite(movieDetails);
                  handleShowToast();
                  setToastMessage("Added to Favorite");
                }
              }}
              style={[
                styles.button,
                { backgroundColor: isFavorite ? "#8A2BE2" : "#1F1F1F" },
              ]}
            >
              <Text style={styles.buttonText}>
                {isFavorite ? "Added to Favorite" : "Add to Favorite"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, { marginTop: 13, width: "100%" }]}
            onPress={() => {
              if (Platform.OS === "web") {
                const mobile = /Mobi|Android/i.test(navigator.userAgent);
                if (mobile) {
                  window.location.href = source1;
                } else {
                  window.open(source1, "_blank");
                }
              } else {
                navigation.navigate("MoviePlayer", {
                  url: source1,
                });
              }
            }}
          >
            <Text style={styles.buttonText}>Watch Now - Source 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 13, width: "100%" }]}
            onPress={() => {
              if (Platform.OS === "web") {
                const mobile = /Mobi|Android/i.test(navigator.userAgent);
                if (mobile) {
                  window.location.href = source2;
                } else {
                  window.open(source2, "_blank");
                }
              } else {
                navigation.navigate("MoviePlayer", {
                  url: source2,
                });
              }
            }}
          >
            <Text style={styles.buttonText}>Watch Now - Source 2</Text>
          </TouchableOpacity>

          <View style={styles.castList}>
            <Text style={styles.overviewHead}>Cast</Text>
            <View>
              <FlatList
                data={castDetails}
                keyExtractor={(item) => item?.id}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                renderItem={({ item }) => (
                  <View style={styles.castContainer}>
                    <Image
                      source={{
                        uri: `${IMAGE_BASE_URL}${item?.profile_path}`,
                      }}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                    <Text style={styles.castName}>{item.name}</Text>
                  </View>
                )}
                horizontal={true}
              />
            </View>
          </View>

          {recommendedDetails.length > 0 && (
            <View style={styles.recommendedSection}>
              <ListComponent
                categoryHeading="Recommended for You"
                categoryMovie={recommendedDetails}
                imageUrl={IMAGE_BASE_URL}
                navigation={navigation}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {showToast && <Toaster message={toastMessage} />}
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },
  heroContainer: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  heroImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    zIndex: 2,
  },
  backButton: {
    position: "absolute",
    zIndex: 3,
    left: 15,
    top: 15,
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 4,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 34,
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  secondaryContainer: {
    paddingHorizontal: 25,
  },
  ratingText: {
    color: "white",
    fontWeight: 800,
    fontSize: 18,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 10,
  },
  genreText: {
    color: "white",
    fontWeight: "bold",
  },
  genresContainer: {
    flexDirection: "row",
  },
  genreBody: {
    // backgroundColor: "#1F1F1F",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
  },
  releaseDate: {
    color: "white",
    fontWeight: "bold",
  },
  releaseDateContainer: {
    // backgroundColor: "#1F1F1F",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  overviewHead: {
    color: "white",
    marginTop: 20,
    fontSize: 24,
    fontWeight: 600,
  },
  overviewText: {
    color: "white",
    marginTop: 15,
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  readMoreText: {
    color: "white",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 700,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    backgroundColor: "#8A2BE2",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  castContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  castName: {
    color: "lightgray",
    textAlign: "center",
    marginTop: 10,
    flexWrap: "wrap",
    fontSize: 12,
  },
  recommendedSection: {
    marginTop: 10,
  },
});
