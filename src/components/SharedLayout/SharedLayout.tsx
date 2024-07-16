import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Header, Link } from "./SharedLayout.styled";
import { authSelectors } from "../../redux/auth";
import UserMenu from "../UserMenu";
const SharedLayout = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Container>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
        <nav>
          {isLoggedIn && <UserMenu />}
          {!isLoggedIn && <Link to="/register">Sign-Up</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
        </nav>
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default SharedLayout;
