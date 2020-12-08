import { useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../context';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 15px;
`

const NavList = styled.ul`
  display: flex;
`

const NavListItem = styled.li`
  list-style-type: none;

  & ~ & {
    margin-left: 10px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: white;
    background: black;
  }
`

const StyledGreeting = styled.span`
  font-weight: bold;
`

export default function Navbar() {
  const history = useHistory();
  
  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    setUser(null);
    if (history[history.length - 1] !== '/') {
      history.push('/');
    }
  }

  const {user, setUser} = useContext(UserContext);

  return (
    <Nav>
      <h1>
        <StyledLink to="/">
          My blog
        </StyledLink>
      </h1>
      <NavList>
        <NavListItem>
          <StyledGreeting> {user ? `Hi~ ${user.data.nickname}` : ''}</StyledGreeting>
        </NavListItem>
        <NavListItem>
          <StyledLink to="/posts">
            文章列表
          </StyledLink>
        </NavListItem>
        
        { user && <NavListItem>
          <StyledLink to="/addpost">
            新增文章
          </StyledLink>
        </NavListItem>}
        { user && <NavListItem>
          <StyledLink to="/" onClick={handleLogOut}>
            登出
          </StyledLink>
        </NavListItem>}
        {!user && <NavListItem>
          <StyledLink to="/login">
            登入
          </StyledLink>
        </NavListItem>}
        {!user && <NavListItem>
          <StyledLink to="/register">
            註冊
          </StyledLink>
        </NavListItem>}
      </NavList>
    </Nav>
  )
}