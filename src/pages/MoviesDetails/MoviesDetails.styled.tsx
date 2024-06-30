import styled from '@emotion/styled';

export const BackLink = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  color: black;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;

  :hover {
    color: orangered;
  }
`;

export const Details = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
  gap: 20px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid black;
`;

export const TextDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Add = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Genres = styled.div`
  display: flex;
  gap: 5px;
`;