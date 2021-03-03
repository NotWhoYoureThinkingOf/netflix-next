import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { selectMovies } from "../lib/slices/moviesSlice";
import Nav from "../components/Nav";

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
}) => {
  const [movie, setMovie] = useState(null);
  const movieState = useSelector(selectMovies);

  useEffect(() => {
    const randomMovie = Math.floor(Math.random() * movies.length - 1);
    setMovie(movies[randomMovie]);
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ background: "#111", minHeight: "100vh" }}>
        <Banner
          title={movie?.title || movie?.name || movie?.original_name}
          description={movie?.overview}
          backdrop_path={movie?.backdrop_path}
        />
        {movieState ? (
          <section>
            <Row title="Top Rated" fetchUrl={topMovies} isLargeRow />
            <Row title="Action Movies" fetchUrl={actionMovies} />
            <Row title="Comedy Movies" fetchUrl={comedyMovies} />
            <Row title="Horror Movies" fetchUrl={horrorMovies} />
            <Row title="Romance Movies" fetchUrl={romanceMovies} />
            <Row title="Documentaries" fetchUrl={documentariesMovies} />
          </section>
        ) : (
          <section>
            <Row title="Netflix Originals" fetchUrl={netflixShows} isLargeRow />
            <Row title="Trending Shows" fetchUrl={trendingShows} />
            <Row title="Top Rated Shows" fetchUrl={topShows} />
            <Row title="Action Shows" fetchUrl={actionShows} />
            <Row title="Comedy Shows" fetchUrl={comedyShows} />
            <Row title="Mystery Shows" fetchUrl={horrorShows} />
            <Row title="Romance Shows" fetchUrl={romanceShows} />
            <Row title="Documentaries" fetchUrl={documentariesShows} />
          </section>
        )}
      </div>
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

  const trendingShows = await trendingTVres.json();
  const netflixShows = await netflixTVres.json();
  const topShows = await topTVres.json();
  const actionShows = await actionTVres.json();
  const comedyShows = await comedyTVres.json();
  const horrorShows = await horrorTVres.json();
  const romanceShows = await romanceTVres.json();
  const documentariesShows = await documentariesTVres.json();
  return {
    props: {
      movies: movies.results,
      topMovies: topMovies.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentariesMovies: documentariesMovies.results,
      trendingShows: trendingShows.results,
      netflixShows: netflixShows.results,
      topShows: topShows.results,
      actionShows: actionShows.results,
      comedyShows: comedyShows.results,
      horrorShows: horrorShows.results,
      romanceShows: romanceShows.results,
      documentariesShows: documentariesShows.results,
    },
  };
};
