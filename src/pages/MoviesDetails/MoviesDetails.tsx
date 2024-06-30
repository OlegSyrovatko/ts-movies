import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../services/content-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import {
  Details,
  TextDetails,
  Genres,
  Add,
  BackLink,
} from './MoviesDetails.styled';

import {
   Genre, MovieDetails
} from "../../models";

// interface LocationState {
//   from: {
//     search: string;
//     pathname: string;
//   };
// }

const MoviesDetails: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [poster_path, setPoster_path] = useState<string | null>(null);
  const [popularity, setPopularity] = useState<number | null>(null);
  const [backLinkHref, setBackLinkHref] = useState<string>('/movies');
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    
  useEffect(() => {
    if (location.state && location.state.from) {
      if (location.state.from.search.indexOf('query') >= 0) {
        setBackLinkHref('/movies' + location.state.from.search);
      }
      if (location.state.from.pathname === '/') {
        setBackLinkHref('/');
      }
    }
  }, [location.state]);

  useEffect(() => {
      async function fetchData() {
        if (!id) return;
      Loading.circle('Loading...');
        const movieDetails: MovieDetails =
        await getMovieDetails(id);
      setTitle(movieDetails.title);
      setOverview(movieDetails.overview);
      setGenres(movieDetails.genres);
      setPoster_path(movieDetails.poster_path);
      setPopularity(movieDetails.vote_average);
      Loading.remove();
    }

    fetchData();
  }, [id]);
  return (
    <>
      <BackLink>
        <Link to={backLinkHref}>Back to movies</Link>
      </BackLink>
      <Details>
        <>
          {' '}
          {poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
            />
          )}
        </>
        <TextDetails>
          <>
            <h1>{title}</h1>
          </>

          {popularity && <>User Score: {Math.round(popularity * 10)}%</>}
          {overview && (
            <>
              <h2>Overview</h2> <>{overview}</>
            </>
          )}

          {genres && (
            <>
              <>
                <h3>Genres</h3>
              </>
              <Genres>
                {genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </Genres>
            </>
          )}
        </TextDetails>
      </Details>
      <Details>
        <TextDetails>
          <h3>Additional information</h3>
          <Add>
            <Link to={`/movies/${id}/cast`}>Cast</Link>
            <Link to={`/movies/${id}/reviews`}>Reviews </Link>
          </Add>
        </TextDetails>
      </Details>
      <Outlet />
    </>
  );
};
export default MoviesDetails;