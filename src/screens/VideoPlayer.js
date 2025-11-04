import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoPlayer = ({ route, navigation }) => {
  const { videoId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        style={{ position: "absolute", zIndex: 100, left: 15, top: 70 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={28} color="white" />
      </Pressable>
      <YoutubePlayer
        height={300}
        width="100%"
        videoId={videoId}
        play={true}
        initialPlayerParams={{
          autoplay: true,
          controls: 1,
          modestbranding: true,
        }}
        onReady={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b0f14",
  },
  loader: {
    position: "absolute",
  },
});
