import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid black;

  > nav {
    display: flex;
  }
`;

export const Link = styled(NavLink)`
  margin: 3px;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  transition: color 0.3s ease, background-color 0.3s ease;

  &.active {
    color: white;
    background-color: orangered;
  }
  &:hover {
    color: white;
    background-color: #ff591d;
  }
  @media (max-width: 767px) {
    padding: 6px 8px;
  }
`;