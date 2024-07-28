import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchHeader, Form, Button, Input } from "./Movies.styled";
import { getSearchMovies } from "../../services/content-api";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Ul, Li } from "../Home/Home.styled";
import MovieItem from "../../components/MovieItem";

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
      )}
    </>
  );
};
export default Movies;
