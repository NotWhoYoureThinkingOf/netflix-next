import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: true,
  },
  reducers: {
    grabMovies: (state) => {
      state.movies = true;
    },
    releaseMovies: (state) => {
      state.movies = false;
    },
  },
});

export const selectMovies = (state) => state.movies.movies;

export const { grabMovies, releaseMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
