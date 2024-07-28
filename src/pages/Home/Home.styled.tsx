import styled from "@emotion/styled";

export const Ul = styled.ul`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;
`;

export const Li = styled.li`
  position: relative;
  text-align: center;
  width: 300px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
