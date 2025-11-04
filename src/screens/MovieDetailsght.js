import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getMoviesData, getMovieVideos } from "../api/tmdb";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import YoutubeIframe from "react-native-youtube-iframe";
import VideoPlayer from "../components/VideoPlayer";

const MovieDetails = ({ route }) => {
  const [movieDetails, setMovieDetails] = useState();
  const [castDetails, setCastDetails] = useState();
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [videoId, setVideoId] = useState();
  const { movieId } = route.params;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const getMovieDetails = async () => {
    try {
      const response = await getMoviesData(`/movie/${movieId}`);
      const castResponse = await getMoviesData(`/movie/${movieId}/credits`);
      const videoPlayerId = await getMovieVideos(movieId);
      setVideoId(videoPlayerId.results[0].key);
      console.log(videoPlayerId.results[0].key);
      const castData = castResponse ? castResponse.cast : [];
      const movieData = response ? response : [];
      setMovieDetails(movieData);
      setCastDetails(castData);
    } catch (err) {
      console.error("error message", err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        <Text style={styles.title}>{movieDetails?.title}</Text>
        <View style={styles.imageContainer}>
          <View style={{ width: "45%" }}>
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}${movieDetails?.poster_path}`,
              }}
              style={{ width: 130, height: 180, borderRadius: 8 }}
            />
          </View>
          <View style={styles.ratings}>
            <View
              style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}
            >
              <AntDesign name="star" size={24} color="gray" />
              <Text style={[styles.ratingText]}>
                {Math.round(movieDetails?.vote_average * 10) / 10}
              </Text>
            </View>
            <Text style={styles.release}>{movieDetails?.release_date}</Text>
            <View style={styles.genresContainer}>
              <Text style={styles.genres}>
                {movieDetails?.genres?.map((genre) => genre.name).join(", ")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewHead}>Overview</Text>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.overviewText}
          >
            {movieDetails?.overview}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.favorite}>
            <FontAwesome name="heart" size={24} color="white" />
            <Text style={styles.favText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setWatchTrailer(!watchTrailer)}
            style={styles.favorite}
          >
            <MaterialCommunityIcons name="movie-open" size={24} color="white" />
            <Text style={styles.favText}>
              {watchTrailer ? "Close Trailer" : "Watch Trailer"}
            </Text>
          </TouchableOpacity>
          {watchTrailer && (
            <View style={{ marginTop: 20, borderRadius: 10 }}>
              <VideoPlayer videoId={videoId} />
            </View>
          )}
        </View>
        <View style={styles.castList}>
          <Text style={styles.overviewHead}>Cast</Text>
          <View>
            <FlatList
              data={castDetails}
              keyExtractor={(item) => item.id}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    paddingHorizontal: 25,
  },
  title: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 45,
  },
  ratingText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  ratings: {
    gap: 20,
    justifyContent: "center",
    // alignItems: "center",
    width: "45%",
  },
  release: {
    color: "lightgray",
    fontSize: 20,
  },
  genres: {
    color: "lightgray",
    fontSize: 20,
    marginTop: -10,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  overviewHead: {
    color: "white",
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 15,
    marginTop: 40,
  },

  overviewText: {
    color: "lightgray",
    fontSize: 20,
    letterSpacing: 0.8,
    lineHeight: 28,
  },

  //   overviewContainer: {
  //     marginTop: 45,
  //   },
  favorite: {
    backgroundColor: "#14181c",
    width: "100%",
    marginTop: 15,
    borderRadius: 8,
    flexDirection: "row",
    paddingVertical: 16,
    justifyContent: "center",
    gap: 10,
  },
  favText: {
    color: "white",
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.8,
  },
  castContainer: {
    alignItems: "center",
  },
  castView: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  castName: {
    color: "lightgray",
    textAlign: "center",
    marginTop: 10,
    flexWrap: "wrap",
    fontSize: 12,
  },
});
