import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getMoviesData, getMovieVideos } from "../api/tmdb";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import ListComponent from "../components/ListComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { VideoView, useVideoPlayer } from "expo-video";
import SplashScreen from "../components/SplashScreen";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const TRENDING_ENDPOINT = "/trending/movie/day";
  const POPULAR_ENDPOINT = "/movie/popular";
  const UPCOMING_ENDPOINT = "/movie/upcoming";
  const TOPRATED_ENDPOINT = "/movie/top_rated";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const [trendingMovies, setTrendingMovies] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [videoPlayerId, setVideoPlayerId] = useState();
  const [showSplash, setShowSplash] = useState(true);

  const videoSource = require("../../assets/HeroVideo.mp4");
  const player = useVideoPlayer(videoSource, (player) => {
    player.play();
    player.loop = true;
    player.muted = true;
    player.resizeMode = "cover";
  });

  const getMovies = async () => {
    try {
      const [
        trendingResponse,
        topratedResponse,
        popularResponse,
        upcomingResponse,
      ] = await Promise.all([
        getMoviesData(TRENDING_ENDPOINT),
        getMoviesData(TOPRATED_ENDPOINT),
        getMoviesData(POPULAR_ENDPOINT),
        getMoviesData(UPCOMING_ENDPOINT),
      ]);

      const trendingData = trendingResponse ? trendingResponse.results : [];
      const videoPlayerResponse = await getMovieVideos(trendingData[0].id);
      const videoPlayerId = videoPlayerResponse?.results?.[0]?.key;
      setVideoPlayerId(videoPlayerId);

      setTrendingMovies(trendingData);
      setTopRatedMovies(topratedResponse.results);
      setPopularMovies(popularResponse.results);
      setUpcomingMovies(upcomingResponse.results);
    } catch (err) {
      console.error("error message", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (
    showSplash &&
    (!trendingMovies || !upcomingMovies || !topRatedMovies || !popularMovies)
  ) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CineSpot</Text>
          <View style={styles.searchSection}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Feather name="search" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesome name="user" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroContainer} pointerEvents="none">
          <VideoView
            style={styles.video}
            player={player}
            fullscreen={false}
            allowsPictureInPicture={false}
            useNativeControls={false}
            pointerEvents="none"
          />

          <LinearGradient
            colors={["transparent", "rgba(11,15,20,0.9)", "#0b0f14"]}
            style={styles.gradient}
          />

          <View style={styles.overlay}>
            <Text style={styles.title}>The Woods</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={18} color="#FFD700" />
                <Text style={styles.ratingText}>7.9</Text>
              </View>
              <View style={styles.genresContainer}>
                {["Thriller", "Action"].map((genre, i) => (
                  <View style={styles.genreBody} key={i}>
                    <Text style={styles.genreText}>{genre}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.releaseDateContainer}>
                <Text style={styles.releaseDate}>2022</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
          <ListComponent
            categoryHeading="Trending Now"
            categoryMovie={trendingMovies}
            imageUrl={IMAGE_BASE_URL}
            navigation={navigation}
          />

          <ListComponent
            categoryHeading="Top Rated"
            categoryMovie={topRatedMovies}
            imageUrl={IMAGE_BASE_URL}
            navigation={navigation}
          />

          <ListComponent
            categoryHeading="Popular"
            categoryMovie={popularMovies}
            imageUrl={IMAGE_BASE_URL}
            navigation={navigation}
          />

          <ListComponent
            categoryHeading="Upcoming"
            categoryMovie={upcomingMovies}
            imageUrl={IMAGE_BASE_URL}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 15,
    paddingBottom: 8,
    backgroundColor: "rgba(11,15,20,0.85)",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  searchSection: {
    flexDirection: "row",
    gap: 22,
  },

  heroContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 5,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 8,
  },
  genreBody: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
  },
  genreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  releaseDateContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  releaseDate: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
