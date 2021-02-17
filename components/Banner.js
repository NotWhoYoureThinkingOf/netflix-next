import React from "react";
import styles from "../styles/Banner.module.css";

const Banner = ({ backdrop_path, title, description }) => {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.banner__gradient}></div>
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>{title}</h1>
        <div className={styles.banner__buttons}>
          <p className={styles.banner__button}>Play</p>
          <p className={styles.banner__button}>My List</p>
        </div>
        <h1 className={styles.banner__description}>
          {truncate(`${description}`, 150)}
        </h1>
      </div>
      <div className={styles.banner__fadeBottom} />
    </header>
  );
};

export default Banner;
