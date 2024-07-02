import React, { useEffect, useState } from 'react';
import { getMovieCredits } from '../../services/content-api';
import { Ul, Li, Aboute, P } from './Cast.styled';
import { useParams } from 'react-router-dom';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

    import {
  MovieCredit
} from "../../models";


const Cast: React.FC = () => {
  const [heroes, setHeroes] = useState<MovieCredit[]>([]);
    const { id } = useParams<{ id: string }>();
    

  useEffect(() => {
      const fetchHeroes = async () => {
        if (!id) return;
      Loading.circle('Loading...');
      try {
        const response = await getMovieCredits(id);
        setHeroes(response.cast);
      } catch (error) {
        console.error(error);
      }
      Loading.remove();
    };
    fetchHeroes();
  }, [id]);
  return (
    <Ul>
      {heroes.map(({ id, name, character, profile_path }) => (
        <Li key={id}>
          <>
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
                width={50}
              />
            )}
            <Aboute>
              {name && <P>{name}</P>}
              {character && <P>Character: {character}</P>}
            </Aboute>
          </>
        </Li>
      ))}
    </Ul>
  );
};
export default Cast;