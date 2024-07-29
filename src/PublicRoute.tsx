// src/components/PublicRoute.tsx
import { useSelector } from "react-redux";
import { authSelectors } from "./redux/auth";
import { Navigate } from "react-router-dom";
import React from "react";
import { PublicRouteProps } from "./models";
import { RootState } from "./store";

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  redirectedTo = "/",
}) => {
  const isLoggedIn = useSelector((state: RootState) =>
    authSelectors.getIsLoggedIn(state)
  );

  return isLoggedIn ? <Navigate to={redirectedTo} /> : <Component />;
};

export default PublicRoute;
