import styled from "@emotion/styled";

export const MovieBackdrop = styled.div`
  list-style: none;
  text-decoration: none;
  width: 100%;
  height: 450px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MovieInfo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;

  border-radius: 5px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ReleaseDate = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-size: 12px;
`;
interface VoteAverageProps {
  voteAverage: number;
}

const getBorderColor = (voteAverage: number) => {
  if (voteAverage >= 8) return "#4CAF50"; // green
  if (voteAverage >= 6) return "#FFC107"; // yellow
  return "#F44336"; // red
};

const getRingSize = (voteAverage: number) => {
  return 30 + voteAverage * 2;
};

export const VoteAverage = styled.div<VoteAverageProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: ${(props) => getRingSize(props.voteAverage)}px;
  height: ${(props) => getRingSize(props.voteAverage)}px;
  border-radius: 50%;
  border: 5px solid ${(props) => getBorderColor(props.voteAverage)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;
export const HeartIcon = styled.div<{ active: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.active ? "red" : "white")};
  transition: color 0.3s;

  &:hover {
    color: red;
  }
`;
