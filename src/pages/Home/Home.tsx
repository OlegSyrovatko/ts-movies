import { useEffect, useState } from "react";
import { trendingMovies } from "../../services/content-api";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Movie } from "../../models";
import MovieItem from "../../components/MovieItem";
import { Ul, Li } from "./Home.styled";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
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
              <MovieItem
                id={id}
                title={title}
                poster_path={poster_path}
                release_date={release_date}
                vote_average={vote_average}
              />
            </Li>
          )
        )}
      </Ul>
    </>
  );
};
export default Home;
