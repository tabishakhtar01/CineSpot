const API_KEY = "72a5e61b7d3bfeab36ee2a1468e09060";
const BASE_URL = "https://api.themoviedb.org/3";
const VIDEO_BASE_URL = "https://api.themoviedb.org/3";

export const getMoviesData = async (endpoint, extraParams = "") => {
  const res = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US${extraParams}`
  );
  return await res.json();
};

export const getRecommendedMoviesData = async (movieId) => {
  const res =
    await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US
`);
  return await res.json();
};

export const getMovieVideos = async (movieId) => {
  const res = await fetch(
    `${VIDEO_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  return await res.json();
};

export const getMoviesGenre = async () => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  return res.json();
};

export const getMoviesByGenre = async (genreId) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US
`
  );
  return res.json();
};
