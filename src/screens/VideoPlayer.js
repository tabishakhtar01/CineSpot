import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoPlayer = ({ route, navigation }) => {
  const { videoId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const isWeb = Platform.OS === "web";

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{ position: "absolute", zIndex: 100, left: 15, top: 70 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={28} color="white" />
      </Pressable>

      {isWeb ? (
        <iframe
          width="100%"
          height="100%"
          style={{ borderWidth: 0 }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <>
          <YoutubePlayer
            height={300}
            width="100%"
            videoId={videoId}
            play
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
        </>
      )}
    </SafeAreaView>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0b0f14",
  },
  loader: {
    position: "absolute",
  },
});
