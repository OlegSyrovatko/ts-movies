import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { Container, Button, Avatar, Name } from './UserMenu.styled';
import defaultAvatar from './default-avatar.jpg';
import { RootState, AppDispatch } from '../../store'; 

export default function UserMenu() {
  const name = useSelector((state: RootState) => authSelectors.getUsername(state));
  const avatar = defaultAvatar;
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(authOperations.logOut());
  };

  return (
    <Container>
      <Avatar src={avatar} alt="" width="32" />
      <Name>Welcome, {name}</Name>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
