import React, { lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import Home from "../pages/Home";
import { AppProps } from "../models";
// import { PrivateRoute } from '../PrivateRoute';
import { PublicRoute } from "../PublicRoute";
import { authSelectors } from "../redux/auth";
import { authOperations } from "../redux/auth";
import { RootState } from "../store";

const Movies = lazy(() => import("../pages/Movies"));
const MoviesDetails = lazy(() => import("../pages/MoviesDetails"));
const Cast = lazy(() => import("./Cast"));
const Reviews = lazy(() => import("./Reviews"));
const RegisterView = lazy(() => import("../pages/Register"));
const LoginView = lazy(() => import("../pages/Login"));

const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector((state: RootState) =>
    authSelectors.getIsFetchingCurrent(state)
  );

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser() as any);
  }, [dispatch]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <h2>Waiting for user...</h2>
      ) : (
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/login"
                element={<PublicRoute component={LoginView} redirectedTo="/" />}
              />
              <Route
                path="/register"
                element={
                  <PublicRoute component={RegisterView} redirectedTo="/" />
                }
              />
              {/* <Route
                path="/contacts"
                element={<PrivateRoute component={ContactsView} redirectedTo="/login" />}
              /> */}
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MoviesDetails />}>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;
