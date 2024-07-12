import { useSelector } from "react-redux";
import { authSelectors } from "./redux/auth";
import { Navigate } from "react-router-dom";
import React from "react";
import { PrivateRouteProps } from "./models";
import { RootState } from "./store";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectedTo = "/",
}) => {
  const isLoggedIn = useSelector((state: RootState) =>
    authSelectors.getIsLoggedIn(state)
  );
  const isFetchingCurrent = useSelector((state: RootState) =>
    authSelectors.getIsFetchingCurrent(state)
  );
  const shouldRedirect = !isLoggedIn && !isFetchingCurrent;

  return shouldRedirect ? <Navigate to={redirectedTo} /> : <Component />;
};

