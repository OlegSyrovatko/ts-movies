export interface Movie {
  id: number;
  title: string;
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