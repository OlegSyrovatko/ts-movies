export interface Movie {
  id: number;
  title: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TrendingMoviesResponse {
  results: Movie[];
}

export interface SearchMoviesResponse {
  results: Movie[];
}

export interface MovieDetails {
  id: number;
    title: string;
    overview: string;
    genres: Genre[];
    poster_path: string | null;
    vote_average: number | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieReviews {
  id: number;
  results: Review[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
}

export interface LocationState {
 from: {
    search: string;
    pathname: string;
  };
}

