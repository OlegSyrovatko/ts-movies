import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { getMovieDetails } from "../../services/content-api";
import { Movie } from "../../models";
import MovieItem from "../../components/MovieItem";
import { Ul, Li } from "./Favorites.styled";
import { RootState } from "../../store";

const Favorites: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const favoriteMovieIds = useSelector((state: RootState) =>
    authSelectors.getfavoriteMovies(state)
  );

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const moviePromises = favoriteMovieIds.map((id: string) =>
        getMovieDetails(id)
      );
      const movieDetails = await Promise.all(moviePromises);
      setMovies(movieDetails);
    };

    fetchFavoriteMovies();
  }, [favoriteMovieIds]);

  return (
    <>
      <h1>Favorite Movies</h1>
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

export default Favorites;
