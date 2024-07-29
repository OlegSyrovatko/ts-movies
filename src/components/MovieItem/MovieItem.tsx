import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors, authOperations } from "../../redux/auth";
import { RootState, AppDispatch } from "../../store";

import {
  MovieBackdrop,
  MovieInfo,
  VoteAverage,
  ReleaseDate,
  HeartIcon,
} from "./MovieItem.styled";

interface MovieItemProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: Date;
  vote_average: number;
}

const MovieItem: React.FC<MovieItemProps> = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const favoriteMovies = useSelector((state: RootState) =>
    authSelectors.getfavoriteMovies(state)
  );
  const isLoggedIn = useSelector((state: RootState) =>
    authSelectors.getIsLoggedIn(state)
  );

  const [isFavorite, setIsFavorite] = useState(
    favoriteMovies.includes(id.toString())
  );
  useEffect(() => {
    setIsFavorite(favoriteMovies.includes(id.toString()));
  }, [favoriteMovies, id]);

  const toggleFavorite = (movieId: string) => {
    if (isFavorite) {
      dispatch(authOperations.removeMovieToUser(movieId));
    } else {
      dispatch(authOperations.addMovieToUser(movieId));
    }
    setIsFavorite(!isFavorite);
  };
  return (
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
        <ReleaseDate>{new Date(release_date).toLocaleDateString()}</ReleaseDate>
        {isLoggedIn && (
          <HeartIcon
            active={isFavorite}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(id.toString());
            }}
          >
            {isFavorite ? "❤️" : "🤍"}
          </HeartIcon>
        )}
      </MovieBackdrop>
    </Link>
  );
};

export default MovieItem;
