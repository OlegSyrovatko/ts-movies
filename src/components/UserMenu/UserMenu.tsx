import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors, authOperations } from "../../redux/auth";
import {
  Container,
  Button,
  Avatar,
  Name,
  AvatarButton,
  AvSection,
  FileInputLabel,
  HiddenFileInput,
} from "./UserMenu.styled";
import defaultAvatar from "./default-avatar.jpg";
import { RootState, AppDispatch } from "../../store";

export default function UserMenu() {
  const name = useSelector((state: RootState) =>
    authSelectors.getUsername(state)
  );

  const avatar = useSelector(
    (state: RootState) => authSelectors.getUserAvatar(state) || defaultAvatar
  );

  const serverAvatar = useSelector((state: RootState) =>
    authSelectors.getUserAvatar(state)
  );

  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLogout = () => {
    dispatch(authOperations.logOut());
  };
  const handleAvDeleted = () => {
    dispatch(authOperations.AvDelete());
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleAvUploaded = () => {
    if (selectedFile) {
      dispatch(authOperations.AvUpload(selectedFile));
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Avatar src={avatar} alt="" width="32" isBlurred={isHovered} />
        <AvSection isVisible={isHovered}>
          <FileInputLabel htmlFor="avatarInput">Choose</FileInputLabel>
          <HiddenFileInput
            id="avatarInput"
            type="file"
            onChange={handleFileChange}
          />
          <AvatarButton type="button" onClick={handleAvUploaded}>
            Upload
          </AvatarButton>
          {serverAvatar && (
            <AvatarButton type="button" onClick={handleAvDeleted}>
              Delete
            </AvatarButton>
          )}
        </AvSection>
      </div>
      <Name>Welcome, {name}</Name>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
