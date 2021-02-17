import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { grabWatch, selectWatch } from "../lib/slices/watchSlice";
import styles from "../styles/Row.module.css";
import { openModal } from "../lib/slices/modalSlice";

const Row = ({ movies, title, onClick, isLargeRow = false }) => {
  const base_url = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const watch = useSelector(selectWatch);

  const getId = (movie) => {
    dispatch(
      grabWatch({
        id: movie.id,
        overview: movie.overview,
        title: movie.title,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
      })
    );
    dispatch(openModal());
    console.log(movie);
  };

  // https://www.youtube.com/watch?v=EyjuRCxpf6Y making dynaic links for each movie

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__posters}>
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Link
                // "href" is what next.js is actually doing
                // "as" is what the browser shows
                href={`/?moviePage=${movie.id}`}
                as={`/movies/${movie.id}`}
                key={movie.id}
              >
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
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Row;
