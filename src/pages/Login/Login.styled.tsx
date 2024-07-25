import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)`
  margin-left: 30px;
  padding-top: 26px;

  text-decoration: none;
  color: #3504e6;
  font-weight: 500;

  transition: color 0.3s ease, background-color 0.3s ease;

  &.active {
    color: #3504e6;
  }
  &:hover {
    color: rgb(0, 0, 0);
  }
`;
