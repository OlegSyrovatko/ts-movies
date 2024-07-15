import styled from "@emotion/styled";

interface AvatarProps {
  isBlurred: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img<AvatarProps>`
  margin-right: 4px;
  margin-left: 4px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  transition: filter 0.3s ease-in-out;
  ${({ isBlurred }) =>
    isBlurred &&
    `
    filter: blur(4px);
  `}
`;

export const Name = styled.span`
  font-weight: 700;
  font-size: 14px;
  margin-right: 12px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const Button = styled.button`
  font-size: 16px;
  line-height: 26px;
  background-color: #fff;
  color: #000;
  padding: 5px 15px 5px 15px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }
  @media (max-width: 767px) {
    padding: 5px 7px 5px 7px;
  }
`;

interface AvSectionProps {
  isVisible: boolean;
}

export const AvSection = styled.div<AvSectionProps>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  top: 5px;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
export const AvatarButton = styled(Button)`
  font-size: 12px;
  line-height: 18px;
  padding: 1px 5px;
  height: 20px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  font-size: 12px;
  line-height: 18px;
  padding: 1px 5px;
  height: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;
