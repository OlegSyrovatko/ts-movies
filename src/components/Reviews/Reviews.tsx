import React, {  useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/content-api';
import { useParams } from 'react-router-dom';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


import {
   MovieReviews
} from "../../models";

const Cast: React.FC = () => {
  const [reviews, setReviews] = useState<MovieReviews | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    Loading.circle('Loading...');
    getMovieReviews(id!).then(reviews => {
      setReviews(reviews);
    });
    Loading.remove();
  }, [id]);
    return (
       <div>
      {reviews && reviews.results.length > 0 ? (
        <ul>
          {reviews.results.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>Character: {review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};
export default Cast;