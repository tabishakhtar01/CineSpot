import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useContext, useRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FavoriteContext } from "../context/FavoriteContext";
import { LinearGradient } from "expo-linear-gradient";

const MovieCard = ({
  item,
  imageUrl,
  navigation,
  isFavorite,
  addToFavorite,
  removeFavorite,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const shadow = useRef(new Animated.Value(2)).current;

  const handleMouseEnter = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1.1, useNativeDriver: true }),
      Animated.timing(shadow, {
        toValue: 8,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleMouseLeave = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(shadow, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Animated.View
        style={{
          transform: [{ scale }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: shadow },
          shadowOpacity: 0.3,
          shadowRadius: shadow,
          borderRadius: 8,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <TouchableOpacity
          style={{ position: "relative" }}
          onPress={() =>
            navigation.navigate("MovieDetails", { movieId: item.id })
          }
        >
          <Image
            source={{ uri: `${imageUrl}${item?.poster_path}` }}
            style={{ width: 130, height: 200, borderRadius: 8 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(11,15,20,0.9)", "#0b0f14"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "35%",
            }}
          />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        onPress={() =>
          isFavorite ? removeFavorite(item.id) : addToFavorite(item)
        }
        style={{ position: "absolute", top: 0, right: 0, padding: 10 }}
      >
        <AntDesign
          name="heart"
          size={24}
          color={isFavorite ? "#8A2BE2" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

const ListComponent = ({
  categoryHeading,
  categoryMovie,
  imageUrl,
  navigation,
  isHorizontal = true,
  columnCount = 0,
}) => {
  const { favorite, addToFavorite, removeFavorite } =
    useContext(FavoriteContext);

  return (
    <View style={styles.collection}>
      <View style={styles.trending}>
        <Text style={styles.trendingText}>{categoryHeading}</Text>
        <FlatList
          data={categoryMovie}
          numColumns={columnCount}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          horizontal={isHorizontal}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 8 }} />
          )}
          columnWrapperStyle={
            !isHorizontal && columnCount > 1 ? styles.column : null
          }
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              imageUrl={imageUrl}
              navigation={navigation}
              isFavorite={favorite?.some((fav) => fav.id === item.id)}
              addToFavorite={addToFavorite}
              removeFavorite={removeFavorite}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  trendingText: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
  },
  column: {
    justifyContent: "space-evenly",
  },
  collection: {
    marginVertical: 10,
  },
});
