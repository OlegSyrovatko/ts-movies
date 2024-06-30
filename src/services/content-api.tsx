import {
  Movie,
  TrendingMoviesResponse,
  SearchMoviesResponse,
  MovieDetails,
  MovieCredits,
  MovieReviews,
} from "../models";


const API_KEY = '?api_key=1bee1caa8eeb54a46f7cee2e958da6e1';

export const trendingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day${API_KEY}`
  );
  const data: TrendingMoviesResponse = await response.json();
  return data.results;
};

export const getSearchMovies = async (q: string): Promise<SearchMoviesResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie${API_KEY}&query=${q}`
  );
  const data: SearchMoviesResponse = await response.json();
  return data;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}${API_KEY}`
  );
  const data: MovieDetails = await response.json();
  return data;
};

export const getMovieCredits = async (id: string): Promise<MovieCredits> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits${API_KEY}`
  );
  const data: MovieCredits = await response.json();
  return data;
};

export const getMovieReviews = async (id: string): Promise<MovieReviews> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews${API_KEY}`
  );
  const data: MovieReviews = await response.json();
  return data;
};
