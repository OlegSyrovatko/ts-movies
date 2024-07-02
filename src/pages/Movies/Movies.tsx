import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { SearchHeader, Form, Button, Input } from "./Movies.styled";
import { getSearchMovies } from "../../services/content-api";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import {
  Ul,
  Li,
  MovieBackdrop,
  MovieInfo,
  VoteAverage,
  ReleaseDate,
} from "../Home/Home.styled";

import { Movie, SearchMoviesResponse } from "../../models";

const Movies: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [getted, setGetted] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryS = searchParams.get("query") ?? "";

  useEffect(() => {
    if (queryS) {
      getSearchMovies(queryS).then((moveis: SearchMoviesResponse) => {
        setMovies(moveis.results);
      });
    }
  }, [queryS]);

  const location = useLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextParams: any = query !== "" ? { query } : {};
    setSearchParams(nextParams);
    Loading.circle("Loading...");
    getSearchMovies(query).then((moveis: SearchMoviesResponse) => {
      setMovies(moveis.results);

      setGetted(true);
    });
    setQuery("");
    Loading.remove();
  };

  return (
    <>
      <SearchHeader>
        <Form onSubmit={handleSubmit}>
          <Button type="submit"></Button>

          <Input
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            name="query"
            value={query}
            required
          />
        </Form>
      </SearchHeader>
      {getted && movies.length === 0 && (
        <p>We don't have any movies for this query</p>
      )}
      {movies.length > 0 && (
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
      )}
      {/* <ul>
        {movies.length > 1 &&
          movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
      </ul> */}
    </>
  );
};
export default Movies;
