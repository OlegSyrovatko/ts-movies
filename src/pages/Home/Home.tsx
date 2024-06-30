import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trendingMovies } from '../../services/content-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Movie } from "../../models"



const Home: React.FC = () => {
const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
    useEffect(() => {
    Loading.circle('Loading...');
    trendingMovies().then(list => {
      setMovies(list);
      Loading.remove();
    });
  }, []);
  return (
    <>
      <h1>Trending today</h1>
      <ol>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
};
export default Home;