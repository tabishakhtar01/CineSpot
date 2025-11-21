import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";

const MoviePlayer = ({ route }) => {
  const { url } = route.params;
  const [isMoto, setIsMoto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const desktopUserAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  useEffect(() => {
    if (
      Device.brand?.toLowerCase() === "motorola" ||
      Device.manufacturer?.toLowerCase() === "motorola"
    ) {
      setIsMoto(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && !error && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load player</Text>
          <Text style={styles.errorTextSmall}>
            Try switching the source or device.
          </Text>
        </View>
      )}

      <WebView
        source={{ uri: url }}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        onHttpError={() => {
          setError(true);
        }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        cacheEnabled={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        androidHardwareAccelerationDisabled={isMoto ? true : false}
        userAgent={desktopUserAgent}
        mixedContentMode="always"
        allowUniversalAccessFromFileURLs={true}
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
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "#0b0f14",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  errorTextSmall: {
    color: "#aaa",
    fontSize: 14,
  },
});
