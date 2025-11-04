import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);
  const [toggleFavorite, setToggleFavorite] = useState(false);

  const addToFavorite = async (movieDetails) => {
    try {
      setFavorite((prevState) => {
        const movieExist = prevState.some(
          (movie) => movie.id === movieDetails.id
        );

        if (movieExist) {
          return prevState;
        }

        const favMovie = [...prevState, movieDetails];
        AsyncStorage.setItem("favoriteMovie", JSON.stringify(favMovie));
        return favMovie;
      });
    } catch (err) {
      console.error("error", err);
    }
  };

  const removeFavorite = async (id) => {
    const deletedItem = favorite?.filter((fav) => fav?.id !== id);
    await AsyncStorage.setItem("favoriteMovie", JSON.stringify(deletedItem));
    setToggleFavorite(!toggleFavorite);
  };

  const fetchFavoriteMovies = async () => {
    const response = await AsyncStorage.getItem("favoriteMovie");
    const favMovie = response ? JSON.parse(response) : [];
    setFavorite(favMovie);
  };

  const clearFavoriteMovies = async () => {
    await AsyncStorage.removeItem("favoriteMovie");
  };

  useEffect(() => {
    // clearFavoriteMovies();
    fetchFavoriteMovies();
  }, [toggleFavorite]);

  return (
    <FavoriteContext.Provider
      value={{
        addToFavorite,
        removeFavorite,
        favorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
