import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { trendingMovies } from "../../services/content-api";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Movie } from "../../models";
import {
  Ul,
  Li,
  MovieBackdrop,
  MovieInfo,
  VoteAverage,
  ReleaseDate,
} from "./Home.styled";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
  useEffect(() => {
    Loading.circle("Loading...");
    trendingMovies().then((list) => {
      setMovies(list);
      Loading.remove();
    });
  }, []);
  return (
    <>
      <h1>Trending today</h1>
      <Ul>
        {movies.map(
          ({ id, title, poster_path, release_date, vote_average }) => (
            <Li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                <MovieBackdrop
                  style={{
                    backgroundImage: `url(${
                      "https://image.tmdb.org/t/p/w780" + poster_path
                    })`,
                  }}
                >
                  <VoteAverage voteAverage={vote_average}>
                    {vote_average.toFixed(1)}
                  </VoteAverage>
                  <MovieInfo>{title}</MovieInfo>
                  <ReleaseDate>
                    {new Date(release_date).toLocaleDateString()}
                  </ReleaseDate>
                </MovieBackdrop>
              </Link>
            </Li>
          )
        )}
      </Ul>
    </>
  );
};
export default Home;
