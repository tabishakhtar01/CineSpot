import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayer = ({ videoId }) => {
  // console.log(videoId.results);

  return (
    <SafeAreaView style={StyleSheet.container}>
      <YoutubePlayer
        height={200}
        videoId={videoId}
        play={true}
        initialPlayerParams={{
          autoplay: true,
          controls: 1,
          modestbranding: true,
        }}
      />
    </SafeAreaView>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },
});
