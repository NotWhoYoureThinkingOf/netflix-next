import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  grabMovies,
  releaseMovies,
  selectMovies,
} from "../lib/slices/moviesSlice";
import styles from "../styles/Nav.module.css";
import { selectUser } from "../lib/slices/userSlice";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const movieState = useSelector(selectMovies);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const transitionNavBar = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`${styles.nav} ${show && styles.nav__black}`}>
      <div className={styles.nav__contents}>
        <div className={styles.nav__left}>
          <img
            onClick={
              !user ? () => router.push("/loginScreen") : () => router.push("/")
            }
            className={styles.nav__logo}
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          <div className={styles.nav__buttons}>
            <div
              onClick={() => dispatch(grabMovies())}
              className={styles.nav__button}
            >
              Movies
            </div>
            <div
              onClick={() => dispatch(releaseMovies())}
              className={styles.nav__button}
            >
              TV
            </div>
          </div>
        </div>

        <Link href={user ? "/profileScreen" : "/loginScreen"}>
          <img
            className={styles.nav__avatar}
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
