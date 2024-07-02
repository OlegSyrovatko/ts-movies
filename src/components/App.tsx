import React, { lazy } from "react";
// import React, { lazy, FC } from "react";
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import Home from '../pages/Home';

const Movies = lazy(() => import('../pages/Movies'));
const MoviesDetails = lazy(() => import('../pages/MoviesDetails'));
const Cast = lazy(() => import('./Cast'));
// const Reviews = lazy(() => import('./Reviews'));

const App: React.FC = () => {

  return (
    <Routes>
        <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesDetails />}>
          <Route path="cast" element={<Cast />} />
        </Route>
          {/* 
          
            
            <Route path="reviews" element={<Reviews />} />
          </Route> */}
        </Route>
      </Routes>
  );
};

export default App;
