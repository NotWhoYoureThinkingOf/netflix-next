import React, { useState } from "react";
import axios from "../axios";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import styles from "../styles/Row.module.css";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectMovies } from "../lib/slices/moviesSlice";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const base_url = "https://image.tmdb.org/t/p/original";
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [tvUrl, setTvUrl] = useState(null);

  const movieState = useSelector(selectMovies);

  const getId = (movie) => {
    if (movieState) {
      getMovieId(movie.id);
    } else {
      getTvId(movie.id);
    }
  };

  const getMovieId = (movieId) => {
    movieTrailer(null, { tmdbId: movieId })
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);

        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => alert(error, "No trailer available at this time"));
  };

  const getTvId = async (movieId) => {
    const API_KEY = "a956bb8834c71afd94ab3be946b32462";
    const trailer = await axios.get(
      `/tv/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    );

    if (trailer.data.videos?.results[0]?.key) {
      setTvUrl(trailer.data.videos?.results[0]?.key);
    }
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__posters}>
        {fetchUrl?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                onClick={() => getId(movie)}
                className={`${styles.row__poster} ${
                  isLargeRow && styles.row__posterLarge
                }`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                key={movie.id}
                alt={movie.name}
              />
            )
        )}
      </div>

      {trailerUrl && (
        <div
          className={styles.row__trailer}
          onClick={() => setTrailerUrl(null)}
        >
          <div
            className={styles.row__closeTrailer}
            onClick={() => setTrailerUrl(null)}
          >
            <Close style={{ fontSize: "5rem", cursor: "pointer" }} />
          </div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerUrl}`}
            controls
            width="1440px"
            height="900px"
            autoplay
          />
        </div>
      )}

      {tvUrl && (
        <div className={styles.row__trailer} onClick={() => setTvUrl(null)}>
          <div
            className={styles.row__closeTrailer}
            onClick={() => setTvUrl(null)}
          >
            <Close style={{ fontSize: "5rem", cursor: "pointer" }} />
          </div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${tvUrl}`}
            controls
            width="1440px"
            height="900px"
            autoplay
          />
        </div>
      )}
    </div>
  );
};

export default Row;
