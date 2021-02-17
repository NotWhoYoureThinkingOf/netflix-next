import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Modal.module.css";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Rows from "../components/Rows";
import Modal from "react-modal";
import { selectMovies } from "../lib/slices/moviesSlice";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { selectModal, closeModal } from "../lib/slices/modalSlice";

Modal.setAppElement("#__next");

const IndexPage = ({
  movies,
  topMovies,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentariesMovies,
  trendingShows,
  netflixShows,
  topShows,
  actionShows,
  comedyShows,
  horrorShows,
  romanceShows,
  documentariesShows,
  genreList,
}) => {
  const [movie, setMovie] = useState(null);
  const [top, setTop] = useState(null);
  const [action, setAction] = useState(null);
  const [comedy, setComedy] = useState(null);
  const [horror, setHorror] = useState(null);
  const [romance, setRomance] = useState(null);
  const [documentaries, setDocumentaries] = useState(null);
  const [trendingTV, setTrendingTV] = useState(null);
  const [netflixTV, setNetflixTV] = useState(null);
  const [topTV, setTopTV] = useState(null);
  const [actionTV, setActionTV] = useState(null);
  const [comedyTV, setComedyTV] = useState(null);
  const [horrorTV, setHorrorTV] = useState(null);
  const [romanceTV, setRomanceTV] = useState(null);
  const [documentariesTV, setDocumentariesTV] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const movieState = useSelector(selectMovies);
  const modalOpen = useSelector(selectModal);

  useEffect(() => {
    const randomMovie = Math.floor(Math.random() * movies.results.length - 1);
    // console.log(randomMovie);
    setMovie(movies.results[randomMovie]);
  }, [movies]);

  useEffect(() => {
    setTop(topMovies.results);
    setAction(actionMovies.results);
    setComedy(comedyMovies.results);
    setHorror(horrorMovies.results);
    setRomance(romanceMovies.results);
    setDocumentaries(documentariesMovies.results);
    setTrendingTV(trendingShows.results);
    setNetflixTV(netflixShows.results);
    setTopTV(topShows.results);
    setActionTV(actionShows.results);
    setComedyTV(comedyShows.results);
    setHorrorTV(horrorShows.results);
    setRomanceTV(romanceShows.results);
    setDocumentariesTV(documentariesShows.results);
  }, [
    topMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentariesMovies,
    trendingShows,
    netflixShows,
    topShows,
    actionShows,
    comedyShows,
    horrorShows,
    romanceShows,
    documentariesShows,
  ]);

  const afterOpenModal = () => {
    const movieId = router.query.moviePage;
    movieTrailer(null, { tmdbId: movieId })
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);

        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => alert(error, "No trailer available at this time"));
  };

  const afterOpenModalTV = async () => {
    const tvId = router.query.moviePage;
    const trailer = await fetch(``);
  };

  const exitModal = () => {
    router.push("/");
    dispatch(closeModal());
  };

  return (
    <div style={{ background: "#111", minHeight: "100vh" }}>
      <Banner
        title={movie?.title || movie?.name || movie?.original_name}
        description={movie?.overview}
        backdrop_path={movie?.backdrop_path}
      />
      {movieState ? (
        <section>
          <Row title="Top Rated" movies={top} isLargeRow />
          <Row title="Action Movies" movies={action} />
          <Row title="Comedy Movies" movies={comedy} />
          <Row title="Horror Movies" movies={horror} />
          <Row title="Romance Movies" movies={romance} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      ) : (
        <section>
          <Row title="Netflix Originals" movies={netflixTV} isLargeRow />
          <Row title="Trending Shows" movies={trendingTV} />
          <Row title="Top Rated Shows" movies={topTV} />
          <Row title="Action Shows" movies={actionTV} />
          <Row title="Comedy Shows" movies={comedyTV} />
          <Row title="Mystery Shows" movies={horrorTV} />
          <Row title="Romance Shows" movies={romanceTV} />
          <Row title="Documentaries" movies={documentariesTV} />
        </section>
      )}
      <Modal
        isOpen={modalOpen ? router.query.moviePage : false}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => exitModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 999,
          },
          content: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0)",
            border: "none",
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            color: "white",
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
          onClick={() => exitModal()}
        >
          Close Modal
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <ReactPlayer
            controls
            style={{ background: "black" }}
            url={`https://www.youtube.com/watch?v=${trailerUrl}`}
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </div>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const API_KEY = "a956bb8834c71afd94ab3be946b32462";
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
  );

  const topRes = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  );

  const actionRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&include_video=true`
  );

  const comedyres = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&include_video=true`
  );

  const horrorRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&include_video=true`
  );

  const romanceRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749&include_video=true`
  );

  const documentariesRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99&include_video=true`
  );

  const movies = await res.json();
  const topMovies = await topRes.json();
  const actionMovies = await actionRes.json();
  const comedyMovies = await comedyres.json();
  const horrorMovies = await horrorRes.json();
  const romanceMovies = await romanceRes.json();
  const documentariesMovies = await documentariesRes.json();

  // TV Shows

  const trendingTVres = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`
  );

  const netflixTVres = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`
  );

  const topTVres = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
  );

  const actionTVres = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759`
  );

  const comedyTVres = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35`
  );

  const horrorTVres = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=9648`
  );

  const romanceTVres = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10749`
  );

  const documentariesTVres = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=99`
  );

  const genreRes = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=a956bb8834c71afd94ab3be946b32462"
  );

  const trendingShows = await trendingTVres.json();
  const netflixShows = await netflixTVres.json();
  const topShows = await topTVres.json();
  const actionShows = await actionTVres.json();
  const comedyShows = await comedyTVres.json();
  const horrorShows = await horrorTVres.json();
  const romanceShows = await romanceTVres.json();
  const documentariesShows = await documentariesTVres.json();
  const genreList = await genreRes.json();

  return {
    props: {
      movies,
      topMovies,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentariesMovies,
      trendingShows,
      netflixShows,
      topShows,
      actionShows,
      comedyShows,
      horrorShows,
      romanceShows,
      documentariesShows,
      genreList,
    },
  };
};
