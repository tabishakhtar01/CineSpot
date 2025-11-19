import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const MoviePlayer = ({ route }) => {
  const { moviId, source } = route.params;
  console.log({ moviId });
  // const url = `https://player.embed-api.stream/?id=${moviId}&type=movie`;
  // const url = `https://autoembed.co/movie/tmdb/${moviId}`;
  const url =
    source === 1
      ? `https://player.embed-api.stream/?id=${moviId}&type=movie`
      : `https://autoembed.co/movie/tmdb/${moviId}`;
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
};

export default MoviePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },
});
